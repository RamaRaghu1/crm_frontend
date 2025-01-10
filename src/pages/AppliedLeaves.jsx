import React, { useState, useEffect } from "react";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { useParams } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import { FcApproval, FcCancel } from "react-icons/fc";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { useGetLeavesByIdQuery } from "../redux/features/leave/leaveApi";
const AppliedLeaves = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();

  const [user, setUser] = useState({});

  const { id } = useParams();
  const { data: userData, isSuccess, isLoading, error } = useLoadUserQuery();

  const { data: leaveData, isSuccess: leaveDataSuccess, refetch } =
    useGetLeavesByIdQuery(id);

    useEffect(()=>{
      refetch();
    },[])
  console.log("vgh", id);
  useEffect(() => {
    if (isSuccess && userData.success === true) {
      setUser(userData?.data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (leaveDataSuccess && leaveData.success === true) {
      setData(leaveData.data);
    }
  }, [leaveDataSuccess, leaveData]);

  console.log("leave", data);

  const columns = [
    { field: "no", headerName: "Sr no", flex: 0.5, minWidth: 50 },
    { field: "startDate", headerName: "Start Date", flex: 1, minWidth: 100 },
    { field: "endDate", headerName: "End Date", flex: 1, minWidth: 100 },
    { field: "leaveDays", headerName: "No of Days", flex: 1, minWidth: 50 },
    { field: "leaveType", headerName: "Leave Type", flex: 1, minWidth: 100 },
    { field: "leaveReason", headerName: "Reason", flex: 1.5, minWidth: 100 },
    { field: "leaveDuration", headerName: "Duration", flex: 1, minWidth: 80 },
    {
      field: "leave_status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <span
          className={`${
            params.value === "pending"
              ? "text-yellow-500"
              : params.value === "approved"
              ? "text-green-500"
              : "text-red-500"
          } font-bold`}
        >
          {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
        </span>
      ),
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   flex: 1,
    //   minWidth: 50,
    //   renderCell: (params) => (
    //     <button
    //       className="text-blue-600"
    //       onClick={() => console.log(`Edit leave with ID: ${params.row.id}`)}
    //     >
    //       <FaEdit size={20} />
    //     </button>
    //   ),
    // },
    // { field: "approvedBy", headerName: "Approved By", flex: 1, minWidth: 100 },
    // { field: "approvedAt", headerName: "Approved At", flex: 1, minWidth: 100 },

  ];
  const rows = [];
  {
    data &&
      data.forEach((user) => {
        user.leaveSets.forEach((leave, index) => {
          rows.push({
            id: leave._id,
            no: index + 1,
            startDate: new Date(leave.startDate).toLocaleDateString(),
            endDate: new Date(leave.endDate).toLocaleDateString(),
            leaveDays: leave.leaveDays,
            leaveType: leave.leaveType,
            leaveReason: leave.leaveReason,
            leaveDuration: leave.leaveDuration,
            leave_status: leave.leave_status,
            approvedBy:leave.approvedBy,
            approvedAt:leave.approvedAt,
          
          });
        });
      });
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar data={user} />
      <main className="lg:ml-64 min-h-screen p-8">
        <div className="app">
          <main className="main-content">
            <div className="w-[75vw] mx-auto">
              <div className="flex justify-between mx-4 my-12">
                <h1 className="font-bold text-3xl  text-blue-600">
                  Applied Leaves
                </h1>

                <button
                      className="flex items-center justify-center px-4 py-2 text-md font-bold text-white bg-blue-600 border border-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200"
                      onClick={() => navigate(`/leave/${id}`)}
                    >
                      <IoMdAdd className="mr-2 text-lg" />
                      Add Leave Request
                    </button>
            
              </div>

              <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick/>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
};

export default AppliedLeaves;
