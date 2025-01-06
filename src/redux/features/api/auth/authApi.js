import { apiSlice } from "../apiSlice.js";
import { userLoggedIn, userLoggedOut } from "./authSlice.js";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const user = result.data.data?.user; // Adjust based on actual structure
          const accessToken = result.data.data?.accessToken;
          console.log("Dispatching userLoggedIn...");
          console.log("Full response:", result);
          console.log(`user ${JSON.stringify(result.data.data.user)}`);
          console.log(`token ${JSON.stringify(result.data.data.accessToken)}`);
          dispatch(
            userLoggedIn({
              accessToken,
              user
            })
          );
        } catch (error) {
          console.error("Error in onQueryStarted:", error.message);
        }
      },
    }),
    logOut: builder.query({
      query: () => ({
        url: "/users/logout",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLogInMutation, useLogOutQuery } = authApi;
