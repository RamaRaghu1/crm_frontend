import { data } from "autoprefixer";
import {apiSlice} from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    usersList: builder.query({
      query: () => ({
        url: "/users/all-users",
        method: "GET",
        credentials:"include",
      }),
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
        credentials:"include",
      }),
    }),
    getUserById: builder.query({
      query:(id)=>({
        url:`/users/user/${id}`,
        method:"GET",
        credentials:"include",
      })
    }),
    updateProfile: builder.mutation({
      query:({id, formData})=>({
        url:`/users/update-profile/${id}`,
        method:"PUT",
        body:formData,
        credentials:"include",
      })
    }),
  }),
});

export const { useUsersListQuery, useAddUserMutation,useGetUserByIdQuery ,useUpdateProfileMutation} = userApi;
