import { createSlice } from "@reduxjs/toolkit";

const AddTransactionSlice = createSlice({
    name:"addTransactionBar",
    initialState:{
        isTransactionBarOpen:true,
    },
    reducers:{
        openTransactionBar: (state,action)=>{
            state.isTransactionBarOpen = true;
        },
        closeTransactionBar: (state,action)=>{
            state.isTransactionBarOpen = false;
        }
    }
});

export const {openTransactionBar,closeTransactionBar} = AddTransactionSlice.actions
export default AddTransactionSlice.reducer