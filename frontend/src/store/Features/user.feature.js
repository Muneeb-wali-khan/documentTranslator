import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { baseUrl, endpoints } from "../urls";



export const UserApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
        
        userDetails: builder.query({
            query: () => ({
                url: endpoints.user_points.get,
                method: "GET",
                credentials: 'include',
            })
        }), 

    })
})

export const { useUserDetailsQuery }  = UserApi