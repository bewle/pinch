import { create } from "zustand";

interface CropData {
    croppedAreaPixels: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    setCroppedAreaPixels: (pixels: {
        x: number;
        y: number;
        width: number;
        height: number;
    }) => void;
}

export const useCropDataStore = create<CropData>((set) => ({
    croppedAreaPixels: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    },
    setCroppedAreaPixels: (pixels) => set({ croppedAreaPixels: pixels }),
}));
