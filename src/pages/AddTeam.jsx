import React from "react";
import Employees from "./Employees";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import { Sidebar } from "../components/Sidebar/Sidebar";

const AddTeam = () => {
  const { data } = useLoadUserQuery();
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex">
    <div className="w-1/5">
    <Sidebar data={data?.data} className="w-64" />
    </div>
        <main className="lg:ml-64 flex-grow min-h-screen p-8 w-[85%]">
          <Employees isTeam={true} />
        </main>
      </div>
    </>
  );
};

export default AddTeam;
