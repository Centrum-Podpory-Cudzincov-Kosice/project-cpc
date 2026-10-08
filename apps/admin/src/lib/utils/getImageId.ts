export function getImageId(imageUrl: string): string {
    const filename = imageUrl.split("/").pop();

    if (!filename) {
        throw new Error(`Invalid image URL: ${imageUrl}`);
    }

    return filename.split(".")[0];
}