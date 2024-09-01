import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface Bear {
    id: number;
    name: string;
}
interface BearState {
    blackBears: number
    polarBears: number
    pandaBears: number

    bears: Bear[];

    // computed: {
    //     totalBears: number
    // }
    totalBears: () => number;

    increaseBlackBears: (by: number) => void
    increasePolarBears: (by: number) => void
    increasePandaBears: (by: number) => void

    doNothing: () => void
    addBear: () => void
    clearBears: () => void
}

const useBearStore = create<BearState>()(
    persist(
        (set, get, store) => ({
            blackBears: 10,
            polarBears: 15,
            pandaBears: 4,

            bears: [
                {
                    id: 1,
                    name: "Oso Blue"
                }
            ],

            // computed: {
            //     get totalBears() {
            //         return get().blackBears + get().polarBears + get().pandaBears
            //     }
            // },
            totalBears: () => {
                console.log(store);
                return get().blackBears + get().polarBears + get().pandaBears + get().bears.length
            },

            increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
            // Sumar polarbears
            increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
            increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),

            doNothing: () => set((state => ({ bears: [...state.bears] }))),
            addBear: () => set((state => ({
                bears: [...state.bears, { id: state.bears.length + 1, name: `Oso ${state.bears.length + 1}` }]
            }))),
            clearBears: () => set((({ bears: [] })))
        }),
        {
            name: 'bear-storage',
            // getStorage: () => sessionStorage
        }
    ),
)

export default useBearStore