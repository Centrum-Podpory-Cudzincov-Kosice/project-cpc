import { Area } from "react-easy-crop";

export async function getCroppedImg(imageSrc: string, crop: Area): Promise<File> {
    const image = await createImage(imageSrc);

    const canvas = document.createElement("canvas");
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Canvas context not available");
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        canvas.width,
        canvas.height,
    );

    const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error("Failed to create preview image"));
                    return;
                }

                resolve(blob);
            },
            "image/webp",
            0.9,
        );
    });

    return new File(
        [blob],
        "preview.webp",
        {
            type: "image/webp",
            lastModified: Date.now(),
        },
    );
}

async function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.crossOrigin = "anonymous";

        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Failed to load image: ${url}`));

        const separator = url.includes("?") ? "&" : "?";
        image.src = `${url}${separator}crop`;
    });
}