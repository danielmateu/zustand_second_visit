import { StateCreator } from "zustand";


export interface ConfirmSlice {
    confirm: boolean;
    setConfirm: (confirm: boolean) => void;
}

export const createConfirmSlice: StateCreator<ConfirmSlice> = (set, get) => ({
    confirm: false,
    setConfirm: (confirm: boolean) => set({ confirm }),
});