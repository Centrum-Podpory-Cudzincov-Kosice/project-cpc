import {NextRequest, NextResponse} from "next/server";
import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {randomUUID} from "crypto";
import {supabaseAdmin} from "@/lib/supabase/admin";

const BUCKET = process.env.AWS_BUCKET_NAME!;
const REGION = process.env.AWS_REGION!;

const s3 = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(req: NextRequest,
                           context: { params: Promise<{ id: string }> }
) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({error: "No file found"}, {status: 400});
        }

        const { id: articleId } = await context.params;
        const buffer = Buffer.from(await file.arrayBuffer());
        const name = file.name.split(".").pop();
        const key = `articles/${articleId}/${randomUUID()}.${name}`;

        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: buffer,
            ContentType: file.type,
        });

        await s3.send(command);

        const fileUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

        const { data: article } = await supabaseAdmin
            .from("articles")
            .select("images")
            .eq("id", articleId)
            .single();

        const updatedImages = [...(article?.images || []), fileUrl];

        await supabaseAdmin
            .from("articles")
            .update({ images: updatedImages })
            .eq("id", articleId);

        return NextResponse.json({url: fileUrl});
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json(
            {error: "Upload failed"}, {status: 500}
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const {url} = await req.json();

        if (!url) {
            return NextResponse.json(
                {error: "No URL provided"}, {status: 400}
            );
        }

        const baseUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/`;
        const key = url.replace(baseUrl, "");

        const command = new DeleteObjectCommand({
            Bucket: BUCKET,
            Key: key,
        });

        await s3.send(command);

        return NextResponse.json({success: true});

    } catch (error) {
        console.error("Delete failed:", error);
        return NextResponse.json(
            {error: "Delete failed"}, {status: 500}
        );
    }
}

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id: articleId } = await context.params;
        const { images } = await req.json();

        if (!Array.isArray(images)) {
            return NextResponse.json(
                { error: "Invalid images array" },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from("articles")
            .update({ images })
            .eq("id", articleId)
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Update failed:", error);

        return NextResponse.json(
            { error: "Update failed" },
            { status: 500 }
        );
    }
}