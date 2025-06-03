import {createSlice} from '@reduxjs/toolkit'

const SideBarSlice = createSlice({
    name:"sidebar",
    initialState:{
        isSideBarOpen : true,
    },
    reducers:{
        toggleSideBar : (state,action)=>{
            state.isSideBarOpen = (!state.isSideBarOpen)
        }   
    }
});

export const {toggleSideBar} = SideBarSlice.actions;
export default SideBarSlice.reducer;