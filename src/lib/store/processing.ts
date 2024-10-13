import { create } from "zustand";

export const useProcessingStore = create<{
    processing: boolean;
    setProcessing: (processing: boolean) => void;
}>((set) => ({ processing: false, setProcessing: (processing) => set({ processing }) }));
