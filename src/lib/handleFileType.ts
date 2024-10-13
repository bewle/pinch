import heic2any from "heic2any";

export const convertHeicToPng = async (file: File) => {
    const blob = await heic2any({ blob: file });
    return blob;
};
