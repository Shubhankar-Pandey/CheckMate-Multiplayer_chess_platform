import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";


export const store = configureStore({
    reducer : {
        user : userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;