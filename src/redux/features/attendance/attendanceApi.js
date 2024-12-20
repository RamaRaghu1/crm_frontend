import {apiSlice} from "../api/apiSlice";

export const attendanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAttendance: builder.mutation({
      query: (data) => ({
        url: "/attendance/update-attendance",
        method: "POST",
        body: data,
        credentials:"include",
      }),
    }),
    getAttendanceData: builder.mutation({
      query: (date) => ({
        url: "/attendance/attendance-data",
        method: "POST",
        body: {date}, 
        credentials:"include",
      }),
    }),
  }),
});

export const { useUpdateAttendanceMutation,useGetAttendanceDataMutation} = attendanceApi;
