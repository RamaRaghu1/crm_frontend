import {apiSlice} from "../api/apiSlice";

export const leaveApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyLeave: builder.mutation({
      query: (data) => ({
        url: "/leave/apply-leave/",
        method: "POST",
        body: data,
        credentials:"include",
      }),
    }),
    getLeaveSummary: builder.query({
      query: () => ({
        url: "/leave/leave-summary",
        method: "GET",
        credentials:"include",
      }),
    }),
    getPendindLeaveRequest:builder.query({
      query: () => ({
        url: "/leave/applied-leave",
        method: "GET",
        credentials:"include",
      }),
    }),
    getLeavesById:builder.query({
      query: (id) => ({
        url: `/leave/leaves/${id}`,
        method: "GET",
        credentials:"include",
      }),
    }),
   
  }),
});

export const {useApplyLeaveMutation,useGetPendindLeaveRequestQuery,useGetLeaveSummaryQuery,useGetLeavesByIdQuery}=leaveApi;