import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { baseUrl, endpoints } from "../urls";



export const AuthApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        
        login: builder.mutation({
            query: (user) => ({
                url: endpoints.auth_points.login,
                method: "POST",
                body: user,
                credentials: 'include',
            }),
            invalidatesTags: ["Auth"]
        }),
        register: builder.mutation({
            query: (user) => ({
                url: endpoints.auth_points.register,
                method: "POST",
                body: user,
                credentials: 'include',
            }),
            invalidatesTags: ["Auth"]
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: endpoints.auth_points.logout,
                method: "POST",
                credentials: 'include',
            }),
            invalidatesTags: ["Auth"]
        })

    })
})

export const {useLoginMutation, useLogoutUserMutation}  = AuthApi