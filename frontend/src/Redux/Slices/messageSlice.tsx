import { createSlice } from "@reduxjs/toolkit";


const initialState : {
    messages : {text : string, username : string}[]
} = {
    messages : [],
} 

export const messageSlice = createSlice({
    name : "message", 
    initialState,
    reducers : {
        setMessage : (state, actions) => {
            state.messages.push({text : actions.payload.text, username : actions.payload.username})
        }
    }
})  


export const { setMessage } = messageSlice.actions
export default messageSlice.reducer