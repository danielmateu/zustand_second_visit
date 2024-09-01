import { create } from "zustand";


interface PertosonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
}

export const userPersonStore = create<PertosonState & Actions>()((set) => ({
    firstName: '',
    lastName: '',

    setFirstName: (value: string) => set({ firstName: value }),
    setLastName: (lastName) => set({ lastName }),
}))