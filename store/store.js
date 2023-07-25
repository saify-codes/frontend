import { configureStore } from "@reduxjs/toolkit"
import counterReducer from './slices/counterSlice'
import authReducer from "./slices/auth/authSlice"

export const store = configureStore({
    reducer:{
        counter:counterReducer,
        auth:authReducer
    }
})