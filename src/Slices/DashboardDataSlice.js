import { createSlice } from "@reduxjs/toolkit";


const DashboardDataSlice = createSlice({
    name:"dashboardData",
    initialState:{
        dashboardData:null
    },
    reducers:{
        setDashboardData: (state, action) => {
            state.dashboardData = action.payload;
        },
        clearDashboardData: (state) => {
            state.dashboardData = null;
        },
    }
});

export const { setDashboardData, clearDashboardData } = DashboardDataSlice.actions;
export default DashboardDataSlice.reducer;