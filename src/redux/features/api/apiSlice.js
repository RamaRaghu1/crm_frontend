import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "./auth/authSlice";
export const apiSlice = createApi({
  reducerPath:"api",
  baseQuery: fetchBaseQuery({

    baseUrl: import.meta.env.VITE_PUBLIC_SERVER_URI ,
credentials:"include",

  }),
  endpoints: (builder) => ({
    // refreshToken: builder.mutation({
    //   query: () => ({
    //     url: "/users/refresh-token",
    //     method: "POST",
    //     credentials: "include",
    //   }),
    // }),
    loadUser: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
        credentials: "include",
      }),
    
    }),
    
  }),
});

export const {  useLoadUserQuery } = apiSlice;




// ______________________________
