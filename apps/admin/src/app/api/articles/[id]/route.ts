import {createClient} from "@/lib/supabase/server";
import {createAdminClient} from "@/lib/supabase/server-admin";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getImageId} from "@/lib/utils/getImageId";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const BUCKET = process.env.AWS_BUCKET_NAME!;
const REGION = process.env.AWS_REGION!;

export async function GET(req: Request,
                          {params}: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();

    const {id} = await params;

    const {data, error} = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return Response.json({error}, {status: 500});
    }

    return Response.json(data);
}

export async function POST(req: Request, {params}: {
    params: Promise<{ id: string }>;
}) {
    const supabase = await createAdminClient();
    const {id} = await params;

    const formData = await req.formData();

    const imageIds = JSON.parse(formData.get("imageIds") as string) as string[];

    const {data: article} = await supabase
        .from("articles")
        .select("images")
        .eq("id", id)
        .single();

    const existingImages = article?.images ?? [];

    const existingById = new Map<string, string>();
    existingImages.forEach((url: string) => {
        existingById.set(getImageId(url), url);
    });

    const images: string[] = [];

    for (const imageId of imageIds) {
        const file = formData.get(imageId);

        if (file instanceof File) {
            const buffer = Buffer.from(
                await file.arrayBuffer()
            );

            const extension = file.name.split(".").pop() ?? "jpg";

            const key = `articles/${id}/${imageId}.${extension}`;

            await s3.send(
                new PutObjectCommand({
                    Bucket: BUCKET,
                    Key: key,
                    Body: buffer,
                    ContentType: file.type,
                })
            );

            images.push(
                `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`
            );
        } else {
            const existing = existingById.get(imageId);

            if (!existing) {
                return Response.json(
                    {error: `Missing existing image ${imageId}`},
                    {status: 400}
                );
            }

            images.push(existing);
        }
    }

    const {data, error} = await supabase
        .from("articles")
        .update({
            title_sk: formData.get("title_sk"),
            title_en: formData.get("title_en"),
            title_uk: formData.get("title_uk"),

            description_sk: formData.get("description_sk"),
            description_en: formData.get("description_en"),
            description_uk: formData.get("description_uk"),

            date: formData.get("date"),
            type: formData.get("type"),
            published:
                formData.get("published") === "true",

            images,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return Response.json(
            {error: error.message},
            {status: 500}
        );
    }

    return Response.json(data);
}