import {configureStore} from "@reduxjs/toolkit"
import { AuthApi } from "./Features/auth.feature"
import { UserApi } from "./Features/user.feature"

export const store = configureStore({
    reducer: {
        [AuthApi.reducerPath]: AuthApi.reducer,
        [UserApi.reducerPath]: UserApi.reducer
    },
    middleware: getDefaultMiddleware=>
        getDefaultMiddleware().concat([AuthApi.middleware, UserApi.middleware])
})