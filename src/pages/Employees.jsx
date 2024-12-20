import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useUsersListQuery } from '../redux/features/user/userApi.js';
import {AiOutlineDelete} from "react-icons/ai";
import {FaEdit} from "react-icons/fa";
import user from "../assets/user.png";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Employees = () => {
    const {data:userData, isSuccess,isLoading,error}=useUsersListQuery();

const navigate=useNavigate();
    const [data,setData]=useState([]);
   useEffect(()=>{
    if(isSuccess  && userData.success===true){
        setData(userData.data);
    }
   },[isSuccess])
   console.log(data)
    

    const columns=[
        { field: "employeeId", headerName: "Emp Id", flex: 0.5, minWidth: 80 },
        { field: "name", headerName: "Name", flex: 1, minWidth: 150 ,
            renderCell: (params) => (
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={()=>{
                    console.log(params)
                }}>
                   
                    <img
                        src={params.row.image || user }  
                        alt={params.row.name}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover',
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
        }
    ]

const rows=[];
{
    data &&
    data.forEach((item, index) => {
      rows.push({
        id:item._id,
        employeeId: item.employeeId,
        image:item.image.url,
        name: item.name,
        position: item.position,
        team: item.team
      });
    });
}
  return (
    <div className="w-[80vw] mx-auto">
        <div className="flex justify-between mx-4 my-12">
        <h1 className="font-bold text-3xl  text-blue-600">Employees</h1>
        <button
          className=" px-3 py-2 font-bold text-md text-blue-600 border   border-blue-400 flex rounded-md"
          onClick={() => navigate("/add-employee")}
        >
          <span className="pt-2 px-1">
            <IoMdAdd />
          </span>
          Add Employee
        </button>
      </div>
      
      <DataGrid rows={rows} columns={columns}/>
    </div>
  )
}

export default Employees
