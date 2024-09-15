import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createPersonSlice, PersonSlice } from "./person.slice";
import { createGuestSlice, GuestSLice } from "./guest.slice";
import { createDateSlice, DateSLice } from "./date.slice";
import { ConfirmSlice, createConfirmSlice } from "./confirm.slice";

type ShareState = PersonSlice & GuestSLice & DateSLice & ConfirmSlice;

export const useWeddingBoundStore = create<ShareState>()(
    devtools(
        (...a) => ({ // <-- This is the slice get set storeApi
            ...createPersonSlice(...a),
            ...createGuestSlice(...a),
            ...createDateSlice(...a),
            ...createConfirmSlice(...a),
        })
    )
)