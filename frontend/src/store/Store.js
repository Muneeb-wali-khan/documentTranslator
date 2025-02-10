import {configureStore} from "@reduxjs/toolkit"
import { AuthApi } from "./Features/auth.feature"

export const store = configureStore({
    reducer: {
        [AuthApi.reducerPath]: AuthApi.reducer
    },
    middleware: getDefaultMiddleware=>
        getDefaultMiddleware().concat([AuthApi.middleware])
})