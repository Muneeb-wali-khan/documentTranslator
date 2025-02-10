import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { baseUrl, endpoints } from "../urls";



export const AuthApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
        
        login: builder.mutation({
            query: (user) => ({
                url: endpoints.auth_points.login,
                method: "POST",
                body: user
            })
        }),
        register: builder.mutation({
            query: (user) => ({
                url: endpoints.auth_points.register,
                method: "POST",
                body: user
            })
        })

    })
})

export const {useLoginMutation}  = AuthApi