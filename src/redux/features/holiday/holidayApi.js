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
        query: ({id,data}) => ({
            url: `/holiday/edit-holiday/${id}`,
            method: "PUT",
            body: data,
            credentials: "include",
          }),
    }),
    deleteHoliday: builder.mutation({
        query: (id) => ({
            url: `/holiday/delete-holiday/${id}`,
            method: "DELETE",
          
            credentials: "include",
          }),
    }),
    getAllHoliday: builder.query({
      query: () => ({
          url: "/holiday/get-all-holiday",
          method: "GET",
          
          credentials: "include",
        }),
  }),
  getHolidayById: builder.query({
    query: (id) => ({
        url: `/holiday/get-holiday/${id}`,
        method: "GET",
        credentials: "include",
      }),
}),
  }),
});

export const {useAddHolidayMutation, useDeleteHolidayMutation, useEditHolidayMutation, useGetHolidayByIdQuery, useGetAllHolidayQuery} = holidayApi;
