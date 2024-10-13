import { create } from "zustand";

export const useIsSettingsPanelOpen = create<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}>((set) => ({ isOpen: true, setIsOpen: (isOpen) => set({ isOpen }) }));
