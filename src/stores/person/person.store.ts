import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";


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


const sessionStorage: StateStorage = {
    getItem: function (name: string): string | null | Promise<string | null> {
        // throw new Error("Function not implemented.");
        return sessionStorage.getItem(name);
    },
    setItem: function (name: string, value: string): unknown | Promise<unknown> {
        // throw new Error("Function not implemented.");
        return sessionStorage.setItem(name, value);
    },
    removeItem: function (name: string): unknown | Promise<unknown> {
        // throw new Error("Function not implemented.");
        return sessionStorage.removeItem(name);
    }
}

export const userPersonStore = create<PertosonState & Actions>()(
    persist(
        storeAPI
        , {
            name: 'person-storage',
            storage: createJSONStorage(() => sessionStorage)

        })
)