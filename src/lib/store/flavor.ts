import { create } from "zustand"

type FlavorStore = {
    flavor: string,
    setFlavor: (flavor: string) => void
    width: number,
    height: number,
    setAspect: (width: number, height: number) => void

}

export const useFlavorStore = create<FlavorStore>()(set => ({
    flavor: "apple",
    setFlavor: (flavor: string) => set({ flavor }),
    width: 375,
    height: 812,
    setAspect: (width: number, height: number) => set({ width, height })
}))