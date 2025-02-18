import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { baseUrl, endpoints } from "../urls";

export const UserApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["User", "UsersA"],
  endpoints: (builder) => ({
    // user
    userDetails: builder.query({
      query: () => ({
        url: endpoints.user_points.get,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: endpoints.user_points.update,
        method: "PUT",
        body: { username: data },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: endpoints.user_points.updatepassword,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // admin
    getAllUsers: builder.query({
      query: () => ({
        url: endpoints.user_points.admin_points.get,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["UsersA"],
    }),
    updateUserRole: builder.mutation({
      query: ({id, data}) => ({
        url: `${endpoints.user_points.admin_points.update}${id}`,
        method: "PUT",
        body: {role: data},
        credentials: "include",
      }),
      invalidatesTags: ["UsersA"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${endpoints.user_points.admin_points.delete}${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["UsersA"],
    }),
  }),
});

export const {
  useUserDetailsQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,

  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = UserApi;
