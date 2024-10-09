import { create } from "zustand"

type FlavorStore = {
    flavor: string,
    setFlavor: (flavor: string) => void
}

export const useFlavorStore = create<FlavorStore>()(set => ({
    flavor: "custom",
    setFlavor: (flavor: string) => set({ flavor })
}))