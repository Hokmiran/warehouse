import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slicer/authSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});