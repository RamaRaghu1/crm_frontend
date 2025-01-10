import React, { useEffect, useState } from "react";
import { Calendar, Check, X, UserRound } from "lucide-react";
import { useUsersListQuery } from "../../redux/features/user/userApi";
import {
  useGetAttendanceDataMutation,
  useUpdateAttendanceMutation,
} from "../../redux/features/attendance/attendanceApi";

function Attendance() {
  const [editMode, setEditMode] = useState(true);
  const [employee, setEmployee] = useState([]);
  const now = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendance, setAttendance] = useState({});
  const { data, isLoading, isError, isSuccess } = useUsersListQuery();
  const [attendanceDataForDate, setAttendanceforDate] = useState([]);
  const [
    updateAttendance,
    {
      isLoading: updateLoading,
      isError: updateError,
      isSuccess: updateSuccess,

    },
  ] = useUpdateAttendanceMutation();
  const [
    getAttendanceData,
    {
      data: attendanceData,
      isLoading: attendanceDataLoading,
      isError: attendanceDataError,
     
  
    },
  ] = useGetAttendanceDataMutation();



  useEffect(()=>{
if(attendanceData?.success){
  setAttendanceforDate(attendanceData?.data)

}
  },[attendanceData])

  console.log("atten", attendanceDataForDate);

  console.log("Sending selectedDate:", selectedDate);
console.log("editmode",editMode)
  useEffect(() => {
   
    if (new Date(selectedDate) < new Date(now)) {
      setEditMode(false);
     
    } else {
      setEditMode(true); 
    }
    
    if (selectedDate) {
      console.log("Fetching attendance for:", selectedDate);
      getAttendanceData({ date: selectedDate });
    }
  }, [selectedDate, getAttendanceData,now]);

  useEffect(() => {
    if (isSuccess && data.success === true) {
      setEmployee(data.data);
    }
  });

  const markAttendance = async (empId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [selectedDate]: {
        ...(prev[selectedDate] || {}),
        [empId]: status,
      },
    }));
    await updateAttendance({ id: empId, status, date: selectedDate });
  };

  const getAttendanceStatus = (empId) => {
    return attendance[selectedDate]?.[empId] || "Not Marked";
  };

  const getPresentCount = () => {
    return Object.values(attendance[selectedDate] || {}).filter(
      (status) => status === "Present"
    ).length;
  };

  const getAbsentCount = () => {
    return Object.values(attendance[selectedDate] || {}).filter(
      (status) => status === "Absent"
    ).length;
  };
  const getHalfDayCount = () => {
    return Object.values(attendance[selectedDate] || {}).filter(
      (status) => status === "Half Day"
    ).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserRound className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Employee Attendance
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-700">
                  Present: {getPresentCount()}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-red-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-red-700">
                  Absent: {getAbsentCount()}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-red-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-yellow-700">
                  Half Day: {getHalfDayCount()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Selector */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emp Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employee.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {emp.employeeId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {emp.name}
                  </td>
                  {editMode && editMode ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => markAttendance(emp._id, "Present")}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              getAttendanceStatus(emp._id) === "Present"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800 hover:bg-green-50"
                            }`}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Present
                          </button>
                          <button
                            onClick={() => markAttendance(emp._id, "Absent")}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              getAttendanceStatus(emp._id) === "Absent"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800 hover:bg-red-50"
                            }`}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Absent
                          </button>
                          <button
                            onClick={() => markAttendance(emp._id, "Half Day")}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              getAttendanceStatus(emp._id) === "Half Day"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800 hover:bg-yellow-50"
                            }`}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Half Day
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <td className="px-6 py-4 whitespace-nowrap">


                      <span>{attendanceDataForDate?.find((dt)=>dt._id=== emp._id)?.status  || "Not Provided"}  </span>
                    </td>
                   )} 
                </tr>
              ))}
            </tbody>
          </table>


          {/* <button onClick={()=>setEditMode(!editMode)}>Save</button>
          <button onClick={()=>setEditMode(!editMode)}>Add Attendance</button> */}
        </div>
      </div>
    </div>
  );
}

export default Attendance;
