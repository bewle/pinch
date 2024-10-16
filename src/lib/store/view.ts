import { create } from "zustand";

interface ViewState {
    view: "fullscreen" | "split" | "settings";
    setView: (view: "fullscreen" | "split" | "settings") => void;
}

export const useViewStore = create<ViewState>((set) => ({
    view: "settings",
    setView: (view) => set({ view }),
}));
