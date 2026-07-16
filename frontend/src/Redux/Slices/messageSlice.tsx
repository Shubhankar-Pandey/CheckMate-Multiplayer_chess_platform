import { createSlice } from "@reduxjs/toolkit";


const initialState : {
    me : string[];
    opponent : string[];
} = {
    me : [],
    opponent : [],
} 

export const messageSlice = createSlice({
    name : "message", 
    initialState,
    reducers : {
        setMessage : (state, actions) => {
            if(actions.payload.user === actions.payload.username){
                state.me.push(actions.payload.text);
            }
            else{
                state.opponent.push(actions.payload.text);
            }
        }
    }
})  


export const { setMessage } = messageSlice.actions
export default messageSlice.reducer