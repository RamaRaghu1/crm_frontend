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
      query: (id) => ({
        url: `/leave/leave-summary/${id}`,
        method: "GET",
        credentials:"include",
      }),
    }),
    summary: builder.mutation({
      query: (data) => ({
        url: `/leave/summary`,
        method: "POST",
        body:data,
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
    getApprovedLeaveRequest:builder.query({
      query: () => ({
        url: "/leave/approved-leave",
        method: "GET",
        credentials:"include",
      }),
    }),
    getRejectedLeaveRequest:builder.query({
      query: () => ({
        url: "/leave/rejected-leave",
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
    approveOrRejectLeave:builder.mutation({
      query: (data) => ({
        url:`/leave/approveOrRejectLeave`,
        method:"POST",
        body:data,
        credentials:"include",

      }),
    }),
    deleteLeave:builder.mutation({
      query: (data) => ({
        url:`/leave/delete-leave`,
        method:"POST",
        body:data,
        credentials:"include",

      }),
    })
   
  }),
});

export const {useApplyLeaveMutation,useGetPendindLeaveRequestQuery,useGetLeaveSummaryQuery,useGetLeavesByIdQuery, useApproveOrRejectLeaveMutation, useSummaryMutation, useGetApprovedLeaveRequestQuery, useGetRejectedLeaveRequestQuery, useDeleteLeaveMutation}=leaveApi;