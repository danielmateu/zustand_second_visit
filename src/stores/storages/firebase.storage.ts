

import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseURL = 'https://zustand-storage-123d7-default-rtdb.europe-west1.firebasedatabase.app/'

const storageAPI: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {

        try {
            const data = await fetch(`${firebaseURL}/${name}.json`).then(res => res.json());

            // console.log(data);
            return JSON.stringify(data);
        } catch (error) {
            // console.error(error);
            throw error
        }

        return null;
    },
    setItem: async function (name: string, value: string): Promise<void> {
        const data = await fetch(`${firebaseURL}/${name}.json`, {
            method: 'PUT',
            body: value
        }).then(res => res.json());

        console.log(data);
        return
        // sessionStorage.setItem(name, value);
    },
    removeItem: function (name: string): void | Promise<void> {
        // throw new Error("Function not implemented.");
        // return sessionStorage.removeItem(name);
        console.log(name);
    }
}

export const firebaseStorage = createJSONStorage(() => storageAPI)