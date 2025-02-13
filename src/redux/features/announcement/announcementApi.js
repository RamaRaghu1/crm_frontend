import { apiSlice } from "../api/apiSlice";


const announcementApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        addAnnouncement:builder.mutation({
            query:(data)=>({
                url: "/announcement/add-announcement",
                method: "POST",
                body: data,
                credentials:"include",
            })
        }),
        deleteAnnouncement:builder.mutation({
            query:(id)=>({
                url: `/announcement/delete-announcement/${id}`,
                method: "DELETE",
                credentials:"include",
            })
        }),
        updateAnnouncement:builder.mutation({
            query:({id, data})=>({
                url: `/announcement/edit-announcement/${id}`,
                method: "PUT",
                body: data,
                credentials:"include",
            })
        }),
        getAllAnnouncement:builder.query({
            query:()=>({
                url: "/announcement/get-all-announcement",
                method: "GET",
                credentials:"include",
            })
        }),
        getAnnouncementById:builder.query({
            query:(id)=>({
                url: `/announcement/get-announcement/${id}`,
                method: "GET",
             
                credentials:"include",
            })
        }),

    })
})


export const {useAddAnnouncementMutation, useDeleteAnnouncementMutation, useUpdateAnnouncementMutation, useGetAllAnnouncementQuery, useGetAnnouncementByIdQuery}=announcementApi;