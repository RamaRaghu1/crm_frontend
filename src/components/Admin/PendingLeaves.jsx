import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetPendindLeaveRequestQuery,
  useApproveOrRejectLeaveMutation,
  useGetRejectedLeaveRequestQuery,
  useGetApprovedLeaveRequestQuery,
  useDeleteLeaveMutation,
} from "../../redux/features/leave/leaveApi";
import { StepBack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import { Sidebar } from "../Sidebar/Sidebar";
import NewModal from "../../utils/NewModal";


const PendingLeaves = () => {
  const { data: userData } = useLoadUserQuery();
  const [filter, setFilter] = useState("pending");
  const [data, setData] = useState();
const [open , setOpen]=useState(false);
const [leaveId, setLeaveId]=useState();

  const {
    data: leaveData,
    isSuccess: leaveSuccess,
    error,
    refetch,
  } = useGetPendindLeaveRequestQuery({},
    { refetchOnMountOrArgChange: true });
  const { data: approvedLeaveData } = useGetApprovedLeaveRequestQuery();
  const { data: rejectedLeaveData } = useGetRejectedLeaveRequestQuery();
  const [
    approveOrRejectLeave,
    { data: approveData, isSuccess: approveSuccess, error: approveError },
  ] = useApproveOrRejectLeaveMutation();
  useEffect(() => {
    if (leaveSuccess && leaveData) {
      setData(leaveData?.data);
    }
  });

  const [
    deleteLeave,
    { data: deleteData, isSuccess: deleteSuccess, error: deleteError },
  ] = useDeleteLeaveMutation();
  const navigate = useNavigate();


  useEffect(() => {
    if (approveSuccess && approveData.success) {
      // refetch();
      toast.success(approveData.message);
    } else if (approveError) {
      const errorMessage = approveError;
      toast.error(errorMessage?.data?.message);
    }
  }, [approveSuccess, approveError]);


  useEffect(() => {
    if (deleteSuccess && deleteData.success) {
  
      toast.success(deleteData.message);
      setOpen(false);
      location.reload()
    } else if (deleteError) {
      const errorMessage = deleteError;
      toast.error(errorMessage?.data?.message);
    }
  }, [deleteSuccess, deleteError]);

  const handleApprove = async (leaveId) => {
 
    await approveOrRejectLeave({ leaveId, isApproved: true });

    setFilter("approved");
  };

  const handleReject = async (leaveId) => {

    await approveOrRejectLeave({ leaveId, isApproved: false });
    setFilter("rejected");
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await deleteLeave(leaveId);
   
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
    { field: "startDate", headerName: "Start Date", flex: 1, minWidth: 100 },
    { field: "endDate", headerName: "End Date", flex: 1, minWidth: 100 },
    { field: "leaveDays", headerName: "No of Days", flex: 1, minWidth: 50 },
    { field: "leaveType", headerName: "Leave Type", flex: 1, minWidth: 100 },
    // { field: "leaveStatus", headerName: "Leave Status", flex: 1, minWidth: 100 },
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
        const { leaveStatus } = params.row;

       
        return (
          <div className="flex space-x-2 py-3">
            {leaveStatus !== "approved" && leaveStatus !== "rejected" && (
              <>
                <button
                  className="px-4 py-1 text-sm font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
                  onClick={() => handleApprove(params.row.id)}
                >
                  Approve
                </button>
                <button
                  className="px-4 py-1 text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
                  onClick={() => handleReject(params.row.id)}
                >
                  Reject
                </button>
              </>
            )}
            {leaveStatus && leaveStatus !== "pending" && (
              <span
                className={`${
                  leaveStatus === "pending"
                    ? "text-yellow-500"
                    : leaveStatus === "approved"
                    ? "text-green-500"
                    : "text-red-500"
                } font-bold`}
              >
                {leaveStatus.charAt(0).toUpperCase() + leaveStatus.slice(1)}
              </span>
            )}
          </div>
        );
      },
    },
   
  ];

if(filter=="approved"){
  columns.push( {
    field: "delete",
    headerName: "Delete",
    flex: 1,
    minWidth: 100,

    renderCell: (params) => {
      const { employeeId, id } = params.row;

     
      return (
        <button 
        // onClick={(e) => handleDelete(e,{ employeeId, leaveSetId: id })}
        onClick={()=>{setOpen(!open); setLeaveId(id)}}>
          <AiOutlineDelete className={"text-black"} size={20} />
        </button>
      );
    },
  },)
}
  
  let filteredData = [];
  if (filter === "pending") {
    filteredData = data;
  } else if (filter === "approved") {
    filteredData = approvedLeaveData?.data || [];
  } else if (filter === "rejected") {
    filteredData = rejectedLeaveData?.data || [];
  }


  const leavesRequests = userData?.data?.isSuperUser
    ? filteredData?.filter((el) => el.branch == userData?.data?.branch)
    : filteredData;




  const rows = [];
  {
    leavesRequests &&
      leavesRequests.forEach((employee, employeeIndex) => {
        
          rows.push({
            id: employee._id,
            no: employeeIndex + 1,
            employeeName: employee.user_details.name,
            employeeId: employee.user_details.employeeId,
            startDate: new Date(employee.startDate).toLocaleDateString(),
            endDate: new Date(employee.endDate).toLocaleDateString(),
            leaveDays: employee.leaveDays,
            leaveType: employee.leaveType,
            leaveDuration: employee.leaveDuration,
            leaveStatus: employee.leave_status,
          });
        });
    
  }

  return (
   

    <div className="min-h-screen bg-gray-100 flex ">
      {/* Sidebar occupies 1/5th of the screen */}
     
        <Sidebar data={userData?.data} className="w-64" />
      

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen w-[80%]  p-8">
        <div className="w-[95%] mx-auto">
          <div className="flex justify-between mx-4 my-5">
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

          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-md font-bold ${
                filter === "pending"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              onClick={() => setFilter("pending")}
            >
              Pending Leaves
            </button>
            <button
              className={`px-4 py-2 rounded-md font-bold ${
                filter === "approved"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              onClick={() => setFilter("approved")}
            >
              Approved Leaves
            </button>
            <button
              className={`px-4 py-2 rounded-md font-bold ${
                filter === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              onClick={() => setFilter("rejected")}
            >
              Rejected Leaves
            </button>
          </div>

          <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick  autoHeight/>
        </div>
      </main>




      {open && (
        <NewModal
          open={open}
          setOpen={setOpen}
          children={
            <>
              <h1
                className={`md:text-[25px]  text-[20px] text-black  font-semibold font-poppins text-center py-2`}
              >
                Are you sure you want to delete this Leave Request?
              </h1>
              <div className="flex w-full items-center justify-evenly mb-6 mt-4">
                <div
                  className={`flex flex-row justify-center items-center  py-3 px-6 rounded-full cursor-pointer  min-h-[45px] text-[16px] font-poppins font-bold !w-[120px] h-[30px] bg-green-500`}
                  onClick={() => setOpen(!open)}
                >
                  Cancel
                </div>
                <div
                  className={`flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer  min-h-[45px]  text-[16px] font-poppins font-bold !w-[120px] h-[30px] bg-red-500`}
                  onClick={handleDelete}
                >
                  Delete
                </div>
              </div>
            </>
          }
        />
      )}
    </div>
  );
};

export default PendingLeaves;
