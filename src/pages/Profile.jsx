import React, { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../redux/features/user/userApi";
import Tooltip from '@mui/material/Tooltip';

import { useNavigate, useParams } from "react-router-dom";
import userImg from "../assets/user.png";
import { Building2,Building, Phone, Clock, User2 ,Pencil} from "lucide-react";
import 'react-calendar/dist/Calendar.css';
import {Sidebar} from "../components/Sidebar/Sidebar";
const Profile = () => {


  let { id } = useParams();
  const navigate=useNavigate();
  const [data, setData] = useState({});
  const { data: userData, isSuccess } = useGetUserByIdQuery(id);


  
  const [value, onChange] = useState(new Date())
  console.log(data);

  useEffect(() => {
    if (isSuccess && userData.success === true) {
      setData(userData.data);
    }
  }, [isSuccess]);

  const { employeeId, name, email, team, position,phone, _id, address} = data || "";

  return (

    <div className="flex h-screen">
   <Sidebar data={data}/>
    <div className="bg-slate-50  ml-[20vw] w-[80vw] top-0">

      {/* banner */}
      <div
        className="h-64 w-full bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        <img
          src={userImg}
          className="w-32 h-32 rounded-full absolute left-1/2 transform -translate-x-1/2 top-1/4 border-4 border-white"
        />

        <div className="flex text-xl justify-center gap-16 text-white font-semibold absolute bottom-3 w-full">
          <p>
            {employeeId} - {name}
          </p>
          <p>{position}</p>
          <p>{team}</p>
          <p>{email}</p>
        </div>
      </div>
      <div className="absolute top-4 right-4 flex gap-2 w-fll">

      <Tooltip title="Update profile" placement="top-start">
          
    
        <button onClick={()=>navigate(`/edit-profile/${_id}`)} className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/30 transition-colors">
          <Pencil className="w-5 h-5 text-black" />
        </button>
        </Tooltip>
       
      </div>

<div className="flex h-[50vh]">
  {/* about section */}
  <div className="bg-white rounded-lg shadow-md p-6 m-4 md:w-[40vw] w-full">
        <h2 className="text-lg font-semibold mb-6">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{team}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User2 className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Position</p>
                <p className="font-medium">{position}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {/* <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Extension</p>
              <p className="font-medium">{extension}</p>
            </div>
          </div> */}
            <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Mobile</p>
              <p className="font-medium">{phone}</p>
            </div>
          </div>
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Branch</p>
                <p className="font-medium">Chennai</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* calendar */}

      <div className="bg-white rounded-lg shadow-md p-6 m-4 md:w-[40vw] w-full">
        <h2 className="text-lg font-semibold mb-6">Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Street</p>
                <p className="font-medium">{address?.street || ""}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User2 className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-medium">{address?.city || ""}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {/* <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Extension</p>
              <p className="font-medium">{extension}</p>
            </div>
          </div> */}
            <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">State</p>
              <p className="font-medium">{address?.state || ""}</p>
            </div>
          </div>
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Pincode</p>
                <p className="font-medium">{address?.zipCode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

</div>
    </div>

    </div>
  );
};

export default Profile;
