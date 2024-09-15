import { StateCreator } from "zustand";

export interface DateSLice {
    eventDate: Date; // number, string, primitive

    eventYYYYMMDD: () => string;
    eventHHMM: () => string;

    // setEventDate: (date: Date) => void;
    setEventDate: (partialDate: string) => void
    setEventTime: (partialTime: string) => void;
    setEventYYYYMMDD: () => void;
    setEventHHMM: () => void;
}

export const createDateSlice: StateCreator<DateSLice> = (set, get) => ({
    eventDate: new Date(),

    eventYYYYMMDD: () => {
        return get().eventDate.toISOString().split("T")[0];
    },

    eventHHMM: () => {
        const hours = get().eventDate.getHours().toString().padStart(2, "0");
        const minutes = get().eventDate.getMinutes().toString().padStart(2, "0");

        return `${hours}:${minutes}`;
    },

    setEventDate: (partialDate: string) => set((state) => {
        const date = new Date(partialDate);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1);
        const day = date.getDate();

        const newDate = new Date(state.eventDate);
        newDate.setFullYear(year, month, day);

        console.log({ newDate });

        return { eventDate: newDate };

    }),
    setEventTime: (partialTime: string) => set((state) => {
        const date = new Date(state.eventDate);
        const [hours, minutes] = partialTime.split(":");
        date.setHours(Number(hours), Number(minutes));

        console.log({ hours, minutes });

        return { eventDate: date };
    }),
    setEventYYYYMMDD: () => {
        return get().eventDate.toISOString().split("T")[0];
    },
    setEventHHMM: () => {
        const hours = get().eventDate.getHours().toString().padStart(2, "0");
        const minutes = get().eventDate.getMinutes().toString().padStart(2, "0");

        // console.log({ hours, minutes });
        return `${hours}:${minutes}`;
    },
});