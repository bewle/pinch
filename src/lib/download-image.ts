import getCroppedImg from "./handle-crop";

export const downloadImage = async (imageUrl: string, croppedAreaPixels: { x: number; y: number; width: number; height: number; }) => {
    const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels, 0);
    const link = document.createElement("a");
    link.href = croppedImage!;
    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
