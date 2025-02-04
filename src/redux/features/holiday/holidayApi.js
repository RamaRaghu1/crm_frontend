import { apiSlice } from "../api/apiSlice";

export const holidayApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addHoliday: builder.mutation({
      query: (data) => ({
        url: "/holiday/add-holiday",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    editHoliday: builder.mutation({
        query: (id) => ({
            url: "/holiday/edit-holiday",
            method: "PUT",
            body: id,
            credentials: "include",
          }),
    }),
    deleteHoliday: builder.mutation({
        query: (id) => ({
            url: "/holiday/delete-holiday",
            method: "DELETE",
            body: id,
            credentials: "include",
          }),
    }),
  }),
});

export const {useAddHolidayMutation, useDeleteHolidayMutation, useEditHolidayMutation} = holidayApi;
