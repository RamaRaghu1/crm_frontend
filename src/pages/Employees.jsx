import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useUsersListQuery } from "../redux/features/user/userApi.js";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import user from "../assets/user.png";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { StepBack } from "lucide-react";

const Employees = () => {
  const { data: userData, isSuccess, isLoading, error } = useUsersListQuery();

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (isSuccess && userData.success === true) {
      setData(userData.data);
    }
  }, [isSuccess]);
  console.log(data);

  const columns = [
    { field: "employeeId", headerName: "Emp Id", flex: 0.5, minWidth: 80 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
          onClick={() => {
            console.log(params);
          }}
        >
          <img
            src={params.row.image || user}
            alt={params.row.name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span>{params.row.name}</span>
        </div>
      ),
    },

    { field: "position", headerName: "Position", flex: 1, minWidth: 150 },
    { field: "team", headerName: "Team", flex: 1, minWidth: 150 },
    {
      field: "manage",
      headerName: "Manage",
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              const employeeId = params.row.id;

              navigate(`/profile/${employeeId}`);
            }}
          >
            <FaEdit className={"text-black "} size={20} />
          </button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              setOpen(!open);
              setEventId(params.row.eventId);
            }}
          >
            <AiOutlineDelete className={"text-black"} size={20} />
          </button>
        );
      },
    },
  ];

  const rows = [];
  {
    data &&
      data.forEach((item, index) => {
        rows.push({
          id: item._id,
          employeeId: item.employeeId,
          image: item.image.url,
          name: item.name,
          position: item.position,
          team: item.team,
        });
      });
  }
  return (
    <div className="w-[80vw] mx-auto">
   <div className="flex justify-between items-center mx-4 my-12">
  <h1 className="font-bold text-3xl text-blue-600">Employees</h1>

  <div className="flex space-x-4">
    {/* Add Employee Button */}
    <button
      className="flex items-center justify-center px-4 py-2 text-md font-bold text-white bg-blue-600 border border-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200"
      onClick={() => navigate("/add-employee")}
    >
      <IoMdAdd className="mr-2 text-lg" />
      Add Employee
    </button>

    {/* Go Back Button */}
    <button
      className="flex items-center justify-center px-4 py-2 text-md font-bold text-blue-600 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition-all duration-200"
      onClick={() => navigate(-1)}
    >
      <StepBack className="mr-2 text-lg" />
      Go Back
    </button>
  </div>
</div>


      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default Employees;
