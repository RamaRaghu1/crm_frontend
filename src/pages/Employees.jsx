import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useUpdateRoleMutation, useUsersListQuery } from "../redux/features/user/userApi.js";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import userImg from "../assets/user.png";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { StepBack } from "lucide-react";
import { styles } from "../styles/style.js";
import NewModal from "../utils/NewModal.jsx";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "../redux/features/api/apiSlice.js";

const Employees = ({ isTeam }) => {
  const { data: userData, isSuccess, isLoading, error, refetch } = useUsersListQuery( undefined,
    { refetchOnMountOrArgChange: true });
  const [upadteRole, {data:updateData, isSuccess:updateSuccess,error:updateError }]=useUpdateRoleMutation();

  const {data:user}=useLoadUserQuery();
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (isSuccess && userData.success === true) {
      setData(userData.data);
    }
  }, [isSuccess]);
  console.log(data);


  useEffect(() => {
    if (updateSuccess && updateData) {
      toast.success(updateData.message);
   
      refetch();
    
      setActive(false)
    }

    if (updateError) {
      const errorMessage = updateError;
      toast.error(errorMessage.data.message);
    }
  }, [updateSuccess, updateData, updateError]);


const users = user?.data?.isSuperUser ? (data.filter((el)=>el.branch ==user?.data?.branch  )):data;
// console.log("admin", users);

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;

    // Set the state for isAdmin and isSuperUser based on the selected role
    if (selectedRole === "admin") {
      setIsAdmin(true);
      setIsSuperUser(false);
    } else if (selectedRole === "superUser") {
      setIsAdmin(false);
      setIsSuperUser(true);
    } else {
      setIsAdmin(false);
      setIsSuperUser(false); // Default for "user"
    }
  };

  const handleSubmit =async () => {
 
    if (!email) {
      alert("Please enter an email address");
      return;
    }

   
    const userData = {
      email,
      isAdmin,
      isSuperUser,
    };

    console.log("Submitting user data: ", userData);
    await upadteRole(userData)
    
  };

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
            src={params?.row?.image || userImg}
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
    { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
    { field: "position", headerName: "Position", flex: 1, minWidth: 150 },
    { field: "team", headerName: "Team", flex: 1, minWidth: 100 },
    { field: "branch", headerName: "Branch", flex: 1, minWidth: 100 },
    {
      field: "manage",
      headerName: "Manage",
      flex: 0.5,
      minWidth: 50,
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              const employeeId = params.row.id;

              navigate(`/edit-profile/${employeeId}`);
            }}
          >
            <FaEdit className={"text-black "} size={20} />
          </button>
        );
      },
    },
   
  ];

  const rows = [];

  if (isTeam) {
    const newData = data && data.filter((item) => item.isSuperUser);
    // console.log("newData", newData)
    newData.forEach((item, index) => {
      rows.push({
        id: item._id,
        employeeId: item.employeeId,
        image: item.image.url,
        name: item.name,
        email:item.email,
        position: item.position,
        team: item.team,
 
        branch: item.branch,
      });
    });
  } else {
    users &&
      users.forEach((item, index) => {
        rows.push({
          id: item._id,
          employeeId: item.employeeId,
          image: item.image.url,
          name: item.name,
          email:item.email,
          position: item.position,
          team: item.team,
          branch: item.branch,
        });
      });
  }

  return (
    <div className="w-[80vw] mx-auto">
      <div className="flex justify-between items-center mx-4 my-5">
        <h1 className="font-bold text-3xl text-blue-600">
          {isTeam ? "Admins" : "Employees"}
        </h1>

        <div className="flex space-x-4">
          {/* Add Employee Button */}

          {isTeam ? (
            <button
              className="flex items-center justify-center px-4 py-2 text-md font-bold text-white bg-blue-600 border border-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200"
              onClick={() => setActive(!active)}
            >
              <IoMdAdd className="mr-2 text-lg" />
              Add New Member
            </button>
          ) : (
            <button
              className="flex items-center justify-center px-4 py-2 text-md font-bold text-white bg-blue-600 border border-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200"
              onClick={() => navigate("/add-employee")}
            >
              <IoMdAdd className="mr-2 text-lg" />
              Add Employee
            </button>
          )}

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

      <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />

      {active ? (
        <NewModal
          open={active}
          setOpen={setActive}
          children={
            <>
              <h1 className={`${styles.title}`}>Add New Member</h1>
              <div className="mt-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  className={`${styles.input}`}
                />

                <select
                  name="role"
                  id="role"
                  className={`${styles.input} !mt-6 bg-gray-100  text-gray-900 `}
                  onChange={handleRoleChange}
                >
                  <option value="user" className="text-black ">
                    User
                  </option>
                  <option value="superUser" className="text-black">
                    Super User
                  </option>
                  <option value="admin" className="text-black">
                    Admin
                  </option>
                </select>
                <br />
                <div
                  className={`${styles.button} my-6 !h-[30px]]`}
                  onClick={handleSubmit}
                >
                  Submit
                </div>
              </div>
            </>
          }
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Employees;
