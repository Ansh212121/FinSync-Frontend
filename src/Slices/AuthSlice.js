
import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        user: null,
        name: "demoUser",
        categories: [],
        email: "demoemail@gmail.com"
    },
    reducers: {
        loginUser: (state) => {
            state.isLoggedIn = true;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.name = "demoUser";
            state.email = "demoemail@gmail.com";
            state.categories = [];
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        setName: (state, action) => {
            console.log("setName action dispatched:", action.payload);
            state.name = action.payload; // Fix
        },
        setEmail: (state, action) => {
            console.log("setEmail action dispatched:", action.payload);
            state.email = action.payload; // Fix
        },
        setCategories: (state, action) => {
            console.log("setCategories action dispatched:", action.payload);
            state.categories = action.payload; // Fix
        }
    }
});

export const { loginUser, logoutUser, setUser, setName, setEmail, setCategories } = AuthSlice.actions;
export default AuthSlice.reducer;
