import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useGetPendindLeaveRequestQuery } from '../../redux/features/leave/leaveApi';

const PendingLeaves = () => {
    const [data, setData]=useState();
const {data:leaveData, isSuccess:leaveSuccess, error}=useGetPendindLeaveRequestQuery();

useEffect(()=>{
    if(leaveSuccess && leaveData){
        setData(leaveData?.data)

    }
})


console.log("jghfhgfy", data)
  
const columns = [
  { field: 'no', headerName: 'Sr No', flex: 0.5, minWidth: 80 },
  { field: 'employeeName', headerName: 'Employee Name', flex: 1, minWidth: 150 },
  { field: 'employeeId', headerName: 'Employee ID', flex: 1, minWidth: 100 },
  { field: 'startDate', headerName: 'Start Date', flex: 1, minWidth: 150 },
  { field: 'endDate', headerName: 'End Date', flex: 1, minWidth: 150 },
  { field: 'leaveDays', headerName: 'No of Days', flex: 1, minWidth: 100 },
  { field: 'leaveType', headerName: 'Leave Type', flex: 1, minWidth: 150 },
  { field: 'leaveDuration', headerName: 'Leave Duration', flex: 1, minWidth: 150 },
];

const rows=[];
{
    data &&
    data.forEach((employee, employeeIndex) => {
      employee.leaveSets.forEach((leaveSet, leaveIndex) => {
        rows.push({
          id: leaveSet._id,
          no: employeeIndex + 1,
          employeeName: employee.employeeName || "N/A",
          employeeId: employee.employeeId || "N/A",
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
      <main className="
     
      min-h-screen p-8">
        <div className="app">
      

          <main className="main-content">
          
    <div className="w-[80vw] mx-auto">
        <div className="flex justify-between mx-4 my-12">
        <h1 className="font-bold text-3xl  text-blue-600">Leave Requests</h1>
        {/* <button
          className=" px-3 py-2 font-bold text-md text-blue-600 border   border-blue-400 flex rounded-md"
          onClick={() => navigate("/leave")}
        >
          <span className="pt-2 px-1">
            <IoMdAdd />
          </span>
          Add Leave Request
        </button> */}
      </div>
      
      <DataGrid rows={rows} columns={columns}/>
    </div>
          </main>
        </div>
      </main>
    </div>

  )
}

export default PendingLeaves
