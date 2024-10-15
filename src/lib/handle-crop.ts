const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(new Error(error.message)));
        image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });

function getRadianAngle(degreeValue: number): number {
    return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
function rotateSize(width: number, height: number, rotation: number): { width: number; height: number } {
    const rotRad = getRadianAngle(rotation);

    return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number },
    rotation = 0,
    flip = { horizontal: false, vertical: false }
): Promise<string | null> {
    console.log("Starting getCroppedImg function");
    console.log("imageSrc:", imageSrc);
    console.log("pixelCrop:", pixelCrop);
    console.log("rotation:", rotation);
    console.log("flip:", flip);

    const image = await createImage(imageSrc);
    console.log("Image created");

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        console.error("Failed to get canvas context");
        return null;
    }

    const rotRad = getRadianAngle(rotation);
    console.log("Rotation in radians:", rotRad);

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);
    console.log("Bounding box width:", bBoxWidth);
    console.log("Bounding box height:", bBoxHeight);

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;
    console.log("Canvas width set to:", bBoxWidth);
    console.log("Canvas height set to:", bBoxHeight);

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    console.log("Canvas context translated to center");
    ctx.rotate(rotRad);
    console.log("Canvas context rotated");
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    console.log("Canvas context scaled with flip:", flip);
    ctx.translate(-image.width / 2, -image.height / 2);
    console.log("Canvas context translated back");

    // draw rotated image
    ctx.drawImage(image, 0, 0);
    console.log("Image drawn on canvas");

    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");

    if (!croppedCtx) {
        console.error("Failed to get cropped canvas context");
        return null;
    }

    // Set the size of the cropped canvas
    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;
    console.log("Cropped canvas width set to:", pixelCrop.width);
    console.log("Cropped canvas height set to:", pixelCrop.height);

    // Draw the cropped image onto the new canvas
    croppedCtx.drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );
    console.log("Cropped image drawn on cropped canvas");

    // As Base64 string
    // return croppedCanvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
        croppedCanvas.toBlob((file) => {
            if (file) {
                console.log("Blob created successfully");
                resolve(URL.createObjectURL(file));
            } else {
                console.error("Blob creation failed");
                reject(new Error("Blob creation failed"));
            }
        }, "image/jpeg");
    });
}
