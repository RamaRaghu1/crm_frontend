import { data } from "autoprefixer";
import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url:"/task/create-task",
        method:"POST",
        body:data,
        credentials:"include",

      }),
    }),
  }),
});
export const {useCreateTaskMutation}=taskApi;