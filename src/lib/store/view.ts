import { create } from "zustand";

interface ViewState {
    view: "fullscreen" | "split";
    setView: (view: "fullscreen" | "split") => void;
}

export const useViewStore = create<ViewState>((set) => ({
    view: "split",
    setView: (view) => set({ view }),
}));
