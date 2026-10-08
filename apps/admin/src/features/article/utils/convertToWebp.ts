export default async function convertToWebp(file: File): Promise<File> {
    if (file.type === "image/webp") {
        return file;
    }

    const bitmap = await createImageBitmap(file);

    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    const context = canvas.getContext("2d");

    if (!context) {
        bitmap.close();
        throw new Error("Could not create canvas context");
    }

    context.drawImage(bitmap, 0, 0);
    bitmap.close();

    const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(new Error("Could not convert image to WebP"));
                }
            },
            "image/webp",
            0.85
        );
    });

    return new File(
        [blob],
        file.name.replace(/\.[^/.]+$/, ".webp"),
        {
            type: "image/webp",
            lastModified: Date.now(),
        }
    );
}