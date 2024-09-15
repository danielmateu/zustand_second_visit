import { StateCreator } from "zustand";


export interface GuestSLice {
    guestCount: number;

    setGuestCount: (guestCount: number) => void;
}

export const createGuestSlice: StateCreator<GuestSLice> = (set) => ({
    guestCount: 0,

    setGuestCount: (guestCount: number) => set({ guestCount }),
})