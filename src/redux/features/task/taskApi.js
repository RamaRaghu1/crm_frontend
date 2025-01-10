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
    getTaskByID: builder.query({
      query: (taskId) => ({
        url:`/task/task-details?taskId=${taskId}`,
        method:"GET",
        credentials:"include",

      }),
    }),
    changeTaskStatus: builder.mutation({
      query: ({id,taskId, status}) => ({
        url:`/task/change-status/${id}`,
        method:"POST",
        body:{taskId, status},
        credentials:"include",
      }),
    }),
    getTaskByUserId: builder.query({
      query: (taskId) => ({
        url:`/task/all-tasks/${taskId}`,
        method:"GET",
        credentials:"include",

      }),
    }),
   
  }),
});
export const {useCreateTaskMutation, useGetTaskByIDQuery, useChangeTaskStatusMutation, useGetTaskByUserIdQuery}=taskApi;