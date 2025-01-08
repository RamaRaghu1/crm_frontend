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
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //    try {
      //            const result = await queryFulfilled;
      //            const user = result.data.data?.user; 
      //            const accessToken = result.data.data?.accessToken;
      //            dispatch(
      //              userLoggedIn({
      //                accessToken,
      //                user
      //              })
      //            );
      //          } catch (error) {
      //            console.error("Error in onQueryStarted:", error.message);
      //          }
      // },
    }),
    
  }),
});

export const {  useLoadUserQuery } = apiSlice;




// ______________________________
