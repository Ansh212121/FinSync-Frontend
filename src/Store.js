import { configureStore } from "@reduxjs/toolkit";
import SideBarSlice from './Slices/SideBarSlice'
import AddTransactionSlice from './Slices/AddTransactionSlice'
import AuthSlice  from './Slices/AuthSlice'
// import SideBarReducer from './SideBarSlice'; 
import DashboardDataSlice from './Slices/DashboardDataSlice'


const store = configureStore({
    reducer:{
        sidebar:SideBarSlice,
        addTransactionBar:AddTransactionSlice,
        auth:AuthSlice ,
        dashboardData:DashboardDataSlice,
    },
})

export default store;