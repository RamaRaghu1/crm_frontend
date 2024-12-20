import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



// export const { useRefreshTokenQuery, useLoadUserQuery }= apiSlice;
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn,userLoggedOut } from "./auth/authSlice"; 

// Enhanced fetchBaseQuery to handle token refresh
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_PUBLIC_SERVER_URI,
  credentials: "include", 
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState().auth?.accessToken;
 
  //   if (token) {
  //     headers.set("Authorization", `Bearer ${token}`);
  //     localStorage.getItem("accessToken",accessToken)
  //   }
  //   return headers;
  // },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.warn("Access token expired. Attempting refresh...");

    // Request a new access token using the refresh token
    const refreshResult = await baseQuery(
      {
        url: "/users/refresh-token",
        method: "POST",
        credentials: "include",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const newAccessToken = refreshResult.data.accessToken;
      console.log("New Access Token:", newAccessToken);

      if (newAccessToken) {
        // Update the access token in localStorage
        try {
          localStorage.setItem("accessToken", newAccessToken);
          console.log("Access token successfully updated in localStorage");
        } catch (error) {
          console.error("Failed to update localStorage:", error);
        }

        // Dispatch action to update Redux state
        api.dispatch(
          userLoggedIn({
            accessToken: newAccessToken,
            user: refreshResult.data.user, // Assuming API returns user data
          })
        );

        // Retry the original request with the new access token
        args.headers = args.headers || new Headers();
        args.headers.set("Authorization", `Bearer ${newAccessToken}`);

        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error("New access token is undefined.");
      }
    } 
    // else {
    //   console.error("Failed to refresh token. Logging out user.");
    //   api.dispatch(userLoggedOut());
    //   localStorage.removeItem("accessToken");
    // }
  }

  return result;
};



export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: () => ({
        url: "/users/refresh-token",
        method: "POST",
        credentials: "include",
      }),
    }),
    loadUser: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
        credentials: "include",
      }),
    }),
    
  }),
});

export const { useRefreshTokenMutation, useLoadUserQuery } = apiSlice;
