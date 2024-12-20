import { apiSlice } from "../apiSlice.js";
import { userLoggedIn,userLoggedOut } from "./authSlice.js";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
        credentials:"include",
      
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(`result.data ${JSON.stringify(result.data)}`);
          console.log(`result.data.token ${JSON.stringify(result.data.data.accessToken)}`);
          dispatch(
            userLoggedIn({
              accessToken: result.data.data.accessToken,
              data: result.data,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    userLoggedOut: builder.query({
        query: () => ({

          url: "/users/logout",
          method: "POST",
       
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          
        
          try {
           
            dispatch(
              userLoggedOut()
            );
          } catch (error) {
            console.log(error);
          }
        },
      }),
  }),
});

export const { useLogInMutation,useUserLoggedOutMutation} = authApi;