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
        }),
        getProjectByDevId:builder.query({
            query: (id) => ({
                url: `/project/get-projects/${id}`,
                method: "GET",
                credentials:"include",
              }),
            
        }),

        assignDeveloper:builder.mutation({
            query: ({id, data}) => ({
                url: `/project/add-dev/${id}`,
                method: "POST",
                body:data,
                credentials:"include",
              }),
             
           
        }),
        deleteProject:builder.mutation({
            query: (id) => ({
                url: `/project/delete-project/${id}`,
                method: "POST",
                credentials:"include",
              }),
        }),
        updateProject:builder.mutation({
            query: ({id, data}) => ({
                url: `/project/update-project/${id}`,
                method: "POST",
                body:data,
                credentials:"include",
              }),
        })
    })
})

export const {useGetAllProjectsQuery,useCreateProjectMutation, useGetProjectByIdQuery,useRemoveDeveloperMutation, useAssignDeveloperMutation,useDeleteProjectMutation, useGetProjectByDevIdQuery ,useUpdateProjectMutation}=projectApi;