import { create } from "zustand"

type ImageUrlStore = {
    imageUrl: string,
    setImageUrl: (imageUrl: string) => void
}

export const useImageUrlStore = create<ImageUrlStore>()(set => ({
    imageUrl: "",
    setImageUrl: (imageUrl: string) => set({ imageUrl })
}))