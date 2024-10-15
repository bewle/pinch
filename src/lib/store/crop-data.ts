import { create } from "zustand";

interface CropData {
    croppedAreaPixels: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    previewArea: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    crop: {
        x: number;
        y: number;
    };
    zoom: number;
    setCroppedAreaPixels: (pixels: {
        x: number;
        y: number;
        width: number;
        height: number;
    }) => void;
    setPreviewArea: (pixels: {
        x: number;
        y: number;
        width: number;
        height: number;
    }) => void;
    setCrop: (crop: { x: number; y: number }) => void;
    setZoom: (zoom: number) => void;
}

export const useCropDataStore = create<CropData>((set) => ({
    croppedAreaPixels: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    },
    previewArea: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    },
    crop: {
        x: 0,
        y: 0,
    },
    zoom: 1,
    setCroppedAreaPixels: (pixels) => set({ croppedAreaPixels: pixels }),
    setPreviewArea: (pixels) => set({ previewArea: pixels }),
    setCrop: (crop) => set({ crop }),
    setZoom: (zoom) => set({ zoom }),
}));
