import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetPendindLeaveRequestQuery,
  useApproveOrRejectLeaveMutation,
} from "../../redux/features/leave/leaveApi";
import { StepBack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import { Sidebar } from "../Sidebar/Sidebar";
const PendingLeaves = () => {
    const { data: userData} = useLoadUserQuery();

    const [status, setStatus] = useState(null);
    
  const [data, setData] = useState();
  const {
    data: leaveData,
    isSuccess: leaveSuccess,
    error,
    refetch,
  } = useGetPendindLeaveRequestQuery();

  const [
    approveOrRejectLeave,
    { data: approveData, isSuccess: approveSuccess, error: approveError },
  ] = useApproveOrRejectLeaveMutation();
  useEffect(() => {
    if (leaveSuccess && leaveData) {
      setData(leaveData?.data);
    }
  });
  const navigate = useNavigate();
  console.log("jghfhgfy", data);

  useEffect(() => {
    if (approveSuccess && approveData.success) {
      refetch();
      toast.success(approveData.message);

   
    } else if (approveError) {
      const errorMessage = approveError;
      toast.error(errorMessage?.data?.message);
  
    }
  }, [approveSuccess, approveError]);
  const handleApprove = async (leaveId) => {
    await approveOrRejectLeave({ leaveId, isApproved: true });
    // setData((prevData) => {
    //   const updatedData = prevData.map((employee) => ({
    //     ...employee,
    //     leaveSets: employee.leaveSets.map((leaveSet) =>
    //       leaveSet._id === leaveId
    //         ? { ...leaveSet, status: "Approved" }
    //         : leaveSet
    //     ),
    //   }));
    //   return updatedData;
    // });
    setStatus("Approved")
  };

  const handleReject = async (leaveId) => {
    await approveOrRejectLeave({ leaveId, isApproved: false });
    setStatus("Rejected")
    // setData((prevData) => {
    //   const updatedData = prevData.map((employee) => ({
    //     ...employee,
    //     leaveSets: employee.leaveSets.map((leaveSet) =>
    //       leaveSet._id === leaveId
    //         ? { ...leaveSet, status: "Rejected" }
    //         : leaveSet
    //     ),
    //   }));
    //   return updatedData;
    // });
  };

  const columns = [
    { field: "no", headerName: "Sr No", flex: 0.5, minWidth: 80 },
    {
      field: "employeeName",
      headerName: "Employee Name",
      flex: 1,
      minWidth: 150,
    },
    { field: "employeeId", headerName: "Employee ID", flex: 1, minWidth: 50 },
    { field: "startDate", headerName: "Start Date", flex: 1, minWidth: 150 },
    { field: "endDate", headerName: "End Date", flex: 1, minWidth: 150 },
    { field: "leaveDays", headerName: "No of Days", flex: 1, minWidth: 50 },
    { field: "leaveType", headerName: "Leave Type", flex: 1, minWidth: 100 },
    {
      field: "leaveDuration",
      headerName: "Leave Duration",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 200,
   
      renderCell: (params) => {
        const { status } = params.row;
        return (
        <div className="flex space-x-2 py-3">
            {status !== "Approved" && status !== "Rejected" && (
              <>
                <button
                  className="px-4 py-1 text-sm font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
                  onClick={() => handleApprove( params.row.id)}
                >
                  Approve
                </button>
                <button
                  className="px-4 py-1 text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
                  onClick={() => handleReject( params.row.id)}
                >
                  Reject
                </button>
              </>
            )}
            {status && status !== "Pending" && (
              <span className="font-bold">{status}</span>
            )}




          </div>
        )
      },
    },
  ];

  const rows = [];

  const leavesRequests = userData?.data?.isSuperUser ? (data?.filter((el)=>el.branch ==userData?.data?.branch  )):data;
  

  {
    leavesRequests &&
      leavesRequests.forEach((employee, employeeIndex) => {
        employee.leaveSets.forEach((leaveSet, leaveIndex) => {
          rows.push({
            id: leaveSet._id,
            no: leaveIndex + 1,
            employeeName: employee.employeeName,
            employeeId: employee.employeeId,
            startDate: new Date(leaveSet.startDate).toDateString(),
            endDate: new Date(leaveSet.endDate).toDateString(),
            leaveDays: leaveSet.leaveDays,
            leaveType: leaveSet.leaveType,
            leaveDuration: leaveSet.leaveDuration,
          });
        });
      });
  }

  return (
    // lg:ml-64
 
    <div className="min-h-screen w-screen flex ">
  {/* Sidebar occupies 1/5th of the screen */}
  <div className="w-1/5">
    <Sidebar data={userData?.data} />
  </div>

  {/* Main Content */}
  <main className=" min-h-screen  bg-gray-100 p-8">
   
    
        <div className="w-[95%] mx-auto">
          <div className="flex justify-between mx-4 my-12">
            <h1 className="font-bold text-3xl text-blue-600">Leave Requests</h1>
            <button
              className="flex items-center justify-center px-4 py-2 text-md font-bold text-blue-600 bg-blue-100 border border-blue-400 rounded-md shadow-sm hover:bg-blue-200 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200"
              onClick={() => navigate(-1)}
            >
              <span className="mr-2">
                <StepBack />
              </span>
              Go Back
            </button>
          </div>

          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
          />
        </div>
   
  </main>
</div>

  );
};

export default PendingLeaves;
