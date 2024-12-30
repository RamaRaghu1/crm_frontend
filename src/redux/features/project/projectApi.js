import { apiSlice } from "../api/apiSlice";


export const projectApi=apiSlice.injectEndpoints({
    tagTypes: ["Project"],
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
              providesTags: (result, error, id) => [{ type: "Project", id }],
        }),
        createProject:builder.mutation({
            query: (data) => ({
                url: "/project/create-project",
                method: "POST",
                body:data,
                credentials:"include",
              }),
        }),
        removeDeveloper:builder.mutation({
            query: ({id, data}) => ({
                url: `/project/remove-dev/${id}`,
                method: "POST",
                body:data,
                credentials:"include",
              }),
              invalidatesTags: (result, error, { id }) => [{ type: "Project", id }],
        })
    })
})

export const {useGetAllProjectsQuery,useCreateProjectMutation, useGetProjectByIdQuery, useRemoveDeveloperMutation}=projectApi;