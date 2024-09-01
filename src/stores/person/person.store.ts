import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase.storage";



interface PersonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
}

const storeAPI: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> =
    (set) => ({
        firstName: '',
        lastName: '',

        setFirstName: (value: string) => set(({ firstName: value }),
            false, 'setFirstName'
        ),
        setLastName: (lastName) => set(({ lastName }),
            false, 'setLastName'
        ),
    })

export const userPersonStore = create<PersonState & Actions>()(
    devtools(
        persist(
            storeAPI
            , {
                name: 'person-storage',
                storage: firebaseStorage

            })
    )
)