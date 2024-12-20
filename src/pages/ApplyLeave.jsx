import React, { useEffect, useState } from "react";
import { Calendar, FileText, AlertCircle, UserRound } from "lucide-react";
import LeaveBalance from "../components/Leave/LeaveBalance";
import LeaveForm from "../components/Leave/LeaveForm";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import Sidebar from "../components/Sidebar/Sidebar";

const ApplyLeave = () => {
  const [data, setData] = useState({});
  const { data: userData, isSuccess } = useLoadUserQuery({});

  useEffect(() => {
    if (isSuccess && userData.success === true) {
      setData(userData.data);
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar data={data} />
      <main className="lg:ml-64 min-h-screen p-8">
        <div className="app">
      

          <main className="main-content">
            <section className="section mx-20">
              <h2 className="font-bold text-blue-600 my-2 text-xl">Leave Balance</h2>
              <LeaveBalance />
            </section>

            <section className="form-container mx-20">
              <h2 className="font-bold text-blue-600 my-4 text-xl">Apply for Leave</h2>
              <LeaveForm />
            </section>
          </main>
        </div>
      </main>
    </div>
  );
};

export default ApplyLeave;
