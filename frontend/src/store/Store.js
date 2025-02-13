import {configureStore} from "@reduxjs/toolkit"
import { AuthApi } from "./Features/auth.feature"
import { UserApi } from "./Features/user.feature"
import { DocumentApi } from "./Features/documents.feature"

export const store = configureStore({
    reducer: {
        [AuthApi.reducerPath]: AuthApi.reducer,
        [UserApi.reducerPath]: UserApi.reducer,
        [DocumentApi.reducerPath]: DocumentApi.reducer,
    },
    middleware: getDefaultMiddleware=>
        getDefaultMiddleware().concat([AuthApi.middleware, UserApi.middleware, DocumentApi.middleware])
})