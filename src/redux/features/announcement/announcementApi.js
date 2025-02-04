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
                url: "/announcement/delete-announcement",
                method: "DELETE",
                body: id,
                credentials:"include",
            })
        }),
        updateAnnouncement:builder.mutation({
            query:(id)=>({
                url: "/announcement/edit-announcement",
                method: "PUT",
                body: id,
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
        getAnnouncementById:builder.mutation({
            query:(id)=>({
                url: "/announcement/get-announcement",
                method: "POST",
                body:id,
                credentials:"include",
            })
        }),

    })
})


export const {useAddAnnouncementMutation, useDeleteAnnouncementMutation, useUpdateAnnouncementMutation, useGetAllAnnouncementQuery, useGetAnnouncementByIdMutation}=announcementApi;