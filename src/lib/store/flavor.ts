import { create } from "zustand"

type FlavorStore = {
    flavor: string,
    setFlavor: (flavor: string) => void
    aspectX: number,
    aspectY: number,
    setAspect: (aspectX: number, aspectY: number) => void

}

export const useFlavorStore = create<FlavorStore>()(set => ({
    flavor: "custom",
    setFlavor: (flavor: string) => set({ flavor }),
    aspectX: 16,
    aspectY: 9,
    setAspect: (aspectX: number, aspectY: number) => set({ aspectX, aspectY })
}))