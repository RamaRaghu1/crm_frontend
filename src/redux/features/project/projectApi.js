import { apiSlice } from "../api/apiSlice";


export const projectApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllProjects:builder.query({
            query: () => ({
                url: "/project/get-all-projects",
                method: "GET",
                credentials:"include",
              }),
        }),
        getProjectById:builder.query({
            query: (id) => ({
                url: `/project/get-project/${id}`,
                method: "GET",
                credentials:"include",
              }),
        }),
        createProject:builder.mutation({
            query: (data) => ({
                url: "/project/create-project",
                method: "POST",
                body:data,
                credentials:"include",
              }),
        })
    })
})

export const {useGetAllProjectsQuery,useCreateProjectMutation, useGetProjectByIdQuery}=projectApi;