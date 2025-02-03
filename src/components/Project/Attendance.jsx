import React, { useEffect, useState } from "react";
import { Calendar, Check, X, UserRound, Eye } from "lucide-react";
import { useUsersListQuery } from "../../redux/features/user/userApi";
import {
  useGetAttendanceDataMutation,
  useUpdateAttendanceMutation,
} from "../../redux/features/attendance/attendanceApi";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { StepBack } from "lucide-react";
function Attendance() {
  const { data: user } = useLoadUserQuery();
  const [editMode, setEditMode] = useState(true);
  const [employee, setEmployee] = useState([]);
  const now = new Date().toISOString().split("T")[0];
const navigate=useNavigate();
  const [showInput, setShowInput] = useState(false);
const {data:userData}=useLoadUserQuery();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [reasons, setReasons] = useState({});
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

  useEffect(() => {
    if (attendanceData?.success) {
      setAttendanceforDate(attendanceData?.data);
    }
  }, [attendanceData]);

  console.log("atten", attendanceDataForDate);
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
  }, [selectedDate, getAttendanceData, now]);



  useEffect(() => {
    if (isSuccess && data.success === true) {
      setEmployee(data.data);
    }
  });

  const handleReasonChange = (empId, value) => {
    setReasons((prev) => ({ ...prev, [empId]: value }));
  };

  // const markAttendance = async (empId, status, permission) => {
  //  let reason = reasons[empId] || "";
  //   await updateAttendance({
  //     id: empId,
  //     status,
  //     date: selectedDate,
  //     permission,
  //     reason
  //   });
  // };


  const markAttendance = async (empId, status, permission) => {
    let reason = reasons[empId] || "";
    const response = await updateAttendance({
      id: empId,
      status,
      date: selectedDate,
      permission,
      reason
    });
  
    if (response?.data?.success) {
      setAttendanceforDate((prev) =>
        prev.map((entry) =>
          entry._id === empId ? { ...entry, status } : entry
        )
      );
    }
  };
  
  const handleSave=()=>{
    location.reload();
  }

  const employeeData = userData?.data?.isSuperUser
  ? employee?.filter((el) => el.branch == userData?.data?.branch)
  : employee;

  const getAttendanceStatus = (empId) => {
    const record = attendanceDataForDate.find((entry) => entry._id === empId);
    return record ? record.status : "Not Marked";
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

            {/* <button onClick={() => setEditMode(true)}>Edit</button> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Selector */}
        <div className="flex justify-between">
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
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Attendance
          </button>
          <button onClick={()=>navigate("/attendance-details")} className="bg-orange-500 text-white px-4 py-2 rounded">
            Get Attendance Details
          </button>
        </div>
<div>
<button
            className="flex items-center justify-center px-4 py-2 text-md font-bold text-blue-600 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition-all duration-200"
            onClick={() => navigate(-1)}
          >
            <StepBack className="mr-2 text-lg" />
            Go Back
          </button>
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
                  Branch
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
              {employeeData.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {emp.employeeId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {emp.branch}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {emp.name}
                  </td>
                  {/* {editMode && editMode ? (
                    <> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => markAttendance(emp._id, "Present", false)}
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
                        onClick={() => markAttendance(emp._id, "Absent", false)}
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
                        onClick={() => markAttendance(emp._id, "Half Day", false)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          getAttendanceStatus(emp._id) === "Half Day"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800 hover:bg-yellow-50"
                        }`}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Half Day
                      </button>

                        {/* <button
                        onClick={() => markAttendance(emp._id, "Others",true)}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Others
                      </button>
                        <input
                          type="text"
                          placeholder="Enter reason"
                          value={reasons[emp._id] || ""}
                          onChange={(e) =>
                            handleReasonChange(emp._id, e.target.value)
                          }
                          className="border px-2 py-1 mt-2 w-full"
                        />  */}
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
