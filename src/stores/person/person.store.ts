import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";


interface PertosonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
}

const storeAPI: StateCreator<PertosonState & Actions> =
    (set) => ({
        firstName: '',
        lastName: '',

        setFirstName: (value: string) => set({ firstName: value }),
        setLastName: (lastName) => set({ lastName }),
    })


export const userPersonStore = create<PertosonState & Actions>()(
    persist(
        storeAPI
        , {
            name: 'person-storage',
            getStorage: () => sessionStorage
        })
)