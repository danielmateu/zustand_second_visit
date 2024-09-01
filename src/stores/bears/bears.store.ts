import { create } from 'zustand'

interface Bear {
    id: number;
    name: string;
}
interface BearState {
    blackBears: number
    polarBears: number
    pandaBears: number

    bears: Bear[];

    increaseBlackBears: (by: number) => void
    increasePolarBears: (by: number) => void
    increasePandaBears: (by: number) => void

    doNothing: () => void
    addBear: () => void
    clearBears: () => void

}

const useBearStore = create<BearState>()((set, get) => ({
    blackBears: 10,
    polarBears: 15,
    pandaBears: 4,

    bears: [
        {
            id: 1,
            name: "Oso Blue"
        }
    ],

    increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
    // Sumar polarbears
    increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
    increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),

    doNothing: () => set((state => ({ bears: [...state.bears] }))),
    addBear: () => set((state => ({
        bears: [...state.bears, { id: state.bears.length + 1, name: `Oso ${state.bears.length + 1}` }]
    }))),
    clearBears: () => set((({ bears: [] })))
}))

export default useBearStore