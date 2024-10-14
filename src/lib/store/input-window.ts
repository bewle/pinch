import { create } from "zustand";

interface InputWindowState {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const useInputWindowStore = create<InputWindowState>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
}));
