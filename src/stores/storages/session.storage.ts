import { createJSONStorage, StateStorage } from "zustand/middleware";

const storageAPI: StateStorage = {
    getItem: function (name: string): string | null | Promise<string | null> {
        const data = sessionStorage.getItem(name);

        return data
    },
    setItem: function (name: string, value: string): void {
        sessionStorage.setItem(name, value);
    },
    removeItem: function (name: string): void | Promise<void> {
        // throw new Error("Function not implemented.");
        // return sessionStorage.removeItem(name);
        console.log(name);
    }
}

export const customSessionStorage = createJSONStorage(() => storageAPI)