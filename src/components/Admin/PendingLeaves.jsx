import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetPendindLeaveRequestQuery } from "../../redux/features/leave/leaveApi";
import { StepBack } from "lucide-react";
import { useNavigate } from "react-router-dom";
const PendingLeaves = () => {
  const [data, setData] = useState();
  const {
    data: leaveData,
    isSuccess: leaveSuccess,
    error,
  } = useGetPendindLeaveRequestQuery();

  useEffect(() => {
    if (leaveSuccess && leaveData) {
      setData(leaveData?.data);
    }
  });
const navigate=useNavigate();
  console.log("jghfhgfy", data);

  const columns = [
    { field: "no", headerName: "Sr No", flex: 0.5, minWidth: 80 },
    {
      field: "employeeName",
      headerName: "Employee Name",
      flex: 1,
      minWidth: 150,
    },
    { field: "employeeId", headerName: "Employee ID", flex: 1, minWidth: 100 },
    { field: "startDate", headerName: "Start Date", flex: 1, minWidth: 150 },
    { field: "endDate", headerName: "End Date", flex: 1, minWidth: 150 },
    { field: "leaveDays", headerName: "No of Days", flex: 1, minWidth: 100 },
    { field: "leaveType", headerName: "Leave Type", flex: 1, minWidth: 150 },
    {
      field: "leaveDuration",
      headerName: "Leave Duration",
      flex: 1,
      minWidth: 150,
    },
  ];

  const rows = [];
  {
    data &&
      data.forEach((employee, employeeIndex) => {
        employee.leaveSets.forEach((leaveSet, leaveIndex) => {
          rows.push({
            id: leaveSet._id,
            no: employeeIndex + 1,
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
    <div className="min-h-screen bg-gray-100">
      {/* <Sidebar data={userData?.data} /> */}
      <main
        className="
     
      min-h-screen p-8"
      >
        <div className="app">
          <main className="main-content">
            <div className="w-[80vw] mx-auto">
              <div className="flex justify-between mx-4 my-12">
                <h1 className="font-bold text-3xl  text-blue-600">
                  Leave Requests
                </h1>
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

              <DataGrid rows={rows} columns={columns} />
            </div>
          </main>
        </div>
      </main>
    </div>
  );
};

export default PendingLeaves;
