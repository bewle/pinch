import { create } from "zustand";

interface CroppedImageStore {
    croppedImage: string;
    setCroppedImage: (croppedImage: string) => void;
}

export const useCroppedImageStore = create<CroppedImageStore>((set) => ({
    croppedImage: "",
    setCroppedImage: (croppedImage: string) => set({ croppedImage }),
}));

