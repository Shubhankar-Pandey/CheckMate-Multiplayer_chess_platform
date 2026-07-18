import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import messageSlice  from "./Slices/messageSlice";


export const store = configureStore({
    reducer : {
        user : userSlice,
        message : messageSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;