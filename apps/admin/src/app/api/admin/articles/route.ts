import {NextResponse} from "next/server";
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import {createAdminClient} from "@/lib/supabase/server-admin";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const BUCKET = process.env.AWS_BUCKET_NAME!;
const REGION = process.env.AWS_REGION!;

export async function GET(req: Request) {
    const supabase = await createAdminClient();

    const {searchParams} = new URL(req.url);
    const type = searchParams.get("type");

    const {data, error} = await supabase
        .from("articles")
        .select("id,title_sk,date,type,published")
        .eq("type", type)
        .order("date", {ascending: false});

    if (error) {
        return Response.json({error}, {status: 500});
    }

    return Response.json(data);
}

export async function POST(req: Request) {
    const supabase = await createAdminClient();

    const formData = await req.formData();

    const {data: article, error} = await supabase
        .from("articles")
        .insert({
            title_sk: formData.get("title_sk"),
            title_en: formData.get("title_en"),
            title_uk: formData.get("title_uk"),

            description_sk: formData.get("description_sk"),
            description_en: formData.get("description_en"),
            description_uk: formData.get("description_uk"),

            date: formData.get("date"),
            type: formData.get("type"),
            published: formData.get("published") === "true",

            images: [],
        })
        .select()
        .single();

    const files = formData.getAll("images") as File[];
    const imageIds = formData.getAll("imageIds") as string[];

    const imageUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageId = imageIds[i];

        const buffer = Buffer.from(await file.arrayBuffer());
        const extension = file.name.split(".").pop();

        const key = `articles/${article.id}/${imageId}.${extension}`;

        await s3.send(
            new PutObjectCommand({
                Bucket: BUCKET,
                Key: key,
                Body: buffer,
                ContentType: file.type,
            })
        );

        imageUrls.push(
            `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`
        );
    }

    const {data: updatedArticle} = await supabase
        .from("articles")
        .update({
            images: imageUrls,
        })
        .eq("id", article.id)
        .select()
        .single();

    if (error) {
        return NextResponse.json(
            {error},
            {status: 500}
        );
    }

    return NextResponse.json(updatedArticle);
}