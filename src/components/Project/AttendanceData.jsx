import React, { useEffect, useState } from "react";
import { exportToExcel } from "react-json-to-excel";
import { Calendar, Check, X, UserRound, Download } from "lucide-react";
import { useSummaryMutation } from "../../redux/features/leave/leaveApi";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import toast from "react-hot-toast";

const AttendanceData = () => {
  const [summary, { data, isSuccess, error, isLoading }] = useSummaryMutation();
  const { data: user } = useLoadUserQuery();
  const [userrrr, setUserrrr] = useState({});
  const [leaveSummary, setLeaveSummary] = useState([]);
  const months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  const years = Array.from(
    { length: 1 },
    (_, i) => new Date().getFullYear() - 0 + i
  );

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  let admin = { month: selectedMonth, year: selectedYear };
  let superUser = {
    branch: user?.data?.branch,
    month: selectedMonth,
    year: selectedYear,
  };

  useEffect(() => {
    if (user?.data) {
      setUserrrr(user?.data?.isAdmin ? admin : superUser);
    }
  }, [user?.data, selectedMonth, selectedYear]);

  useEffect(() => {
    if (isSuccess && data.success) {
      toast.success(data.message);
      setLeaveSummary(data?.data);
    }

    if (error) {
      const errorMessage = error;
      toast.error(errorMessage?.data?.message);
    }
  }, [isSuccess, error]);

  console.log(leaveSummary);
  const handleData = async () => {
    try {
      const result = await summary(userrrr);
      console.log("API call result:", result);
    } catch (err) {
      console.error("API call failed:", err);
    }
  };

  console.log(userrrr);

  const formattedData = leaveSummary.map((emp) => ({
    "Emp Id": emp.employeeId,
    Branch: emp.branch || "N/A",
    "Employee Name": emp.name,
    "Casual Leave":
      emp.leaveSummary.find((leave) => leave._id === "casual-leave")?.count ||
      0,
    "Sick Leave":
      emp.leaveSummary.find((leave) => leave._id === "sick-leave")?.count || 0,
    "Unpaid Leave":
      emp.leaveSummary.find((leave) => leave._id === "unpaid-leave")?.count ||
      0,
    "Total Days Present": emp.present,
    Salary: emp.salaryTotal ? `₹${emp.salaryTotal.toLocaleString()}` : "N/A",
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm flex justify-between">
        <div className="max-w-7xl  px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserRound className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Attendance details
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl  px-4 sm:px-6 lg:px-8 ">
          <div className="flex gap-4 p-4">
            <button
              onClick={() => exportToExcel(formattedData, "Attendance")}
              className="bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition duration-200"
            >
              <Download className="w-5 h-5" /> Export to Excel
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 p-4">
          <select
            className="border rounded-lg p-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>

          <select
            className="border rounded-lg p-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button
            onClick={handleData}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Get Data
          </button>
        </div>

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
                  Casual leave
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sick leave
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unpaid leave
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Days present
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveSummary?.map((emp) => {
                // Extract leave counts based on leave type
                const casualLeave =
                  emp.leaveSummary.find((leave) => leave._id === "casual-leave")
                    ?.count || 0;
                const sickLeave =
                  emp.leaveSummary.find((leave) => leave._id === "sick-leave")
                    ?.count || 0;
                const unpaidLeave =
                  emp.leaveSummary.find((leave) => leave._id === "unpaid-leave")
                    ?.count || 0;

                return (
                  <tr key={emp.employeeId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {emp.employeeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.branch || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {casualLeave}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sickLeave}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {unpaidLeave}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.present}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.salaryTotal
                        ? `₹${emp.salaryTotal.toLocaleString()}`
                        : "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceData;
