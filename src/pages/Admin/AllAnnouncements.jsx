import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { IoMdAdd } from "react-icons/io";
import { StepBack } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDeleteAnnouncementMutation, useGetAllAnnouncementQuery } from "../../redux/features/announcement/announcementApi";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import NewModal from "../../utils/NewModal";
const AllAnnouncements = () => {
    const [open, setOpen]=useState(false);
  const navigate = useNavigate();
  const { data } = useGetAllAnnouncementQuery();
  const { data: userData } = useLoadUserQuery();
  const [deleteAnnouncement, {isSuccess, error, data:deleteData}]=useDeleteAnnouncementMutation();
  const columns = [
    { field: "no", headerName: "Sr. no", flex: 0.5, minWidth: 50 },
    { field: "title", headerName: "Title", flex: 0.75, minWidth: 100 },
    { field: "priority", headerName: "Priority", flex: 0.5, minWidth: 50 },
    { field: "content", headerName: "Content", flex: 0.5, minWidth: 50 },
    { field: "date", headerName: "Date", flex: 0.5, minWidth: 50 },
    { field: "author", headerName: "Author", flex: 0.5, minWidth: 50 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.5,
      minWidth: 50,
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              const announcementId = params.row.id;

              navigate(`/edit-announcement/${announcementId}`);
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
      flex: 0.5,
      minWidth: 50,
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              const announcementId = params.row.id;

              navigate(`/edit-announcement/${announcementId}`);
            }}
          >
            <MdDelete className={"text-black "} size={20} />
          </button>
        );
      },
    },
  ];


  const handleDelete=()=>{

  }

  let rows = [];

  {
    data?.data.forEach((item, index) => {
      rows.push({
        id: item._id,
        no: index + 1,
        title: item.title,
        priority: item.priority,
        content: item.content,
        date: item.date,
        author: item.author,
      });
    });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar data={userData?.data} />
      <main className="lg:ml-64 min-h-screen p-8">
        <div className="app">
          <main className="main-content">
            <div className="w-[75vw] mx-auto">
              <div className="flex justify-between items-center mx-4 my-5">
                <h1 className="font-bold text-3xl text-blue-600">
                  Announcements
                </h1>

                <div className="flex space-x-4">
                  <button
                    className="flex items-center justify-center px-4 py-2 text-md font-bold text-white bg-blue-600 border border-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200"
                    onClick={() => navigate("/announcement")}
                  >
                    <IoMdAdd className="mr-2 text-lg" />
                    Add New Announcement
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

              <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
              />
            </div>
          </main>
        </div>
      </main>


      {open && (
        <NewModal
          open={open}
          setOpen={setOpen}
          children={
            <>
              <h1
                className={`md:text-[25px]  text-[20px] text-black  font-semibold font-poppins text-center py-2`}
              >
                Are you sure you want to delete this Leave Request?
              </h1>
              <div className="flex w-full items-center justify-evenly mb-6 mt-4">
                <div
                  className={`flex flex-row justify-center items-center  py-3 px-6 rounded-full cursor-pointer  min-h-[45px] text-[16px] font-poppins font-bold !w-[120px] h-[30px] bg-green-500`}
                  onClick={() => setOpen(!open)}
                >
                  Cancel
                </div>
                <div
                  className={`flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer  min-h-[45px]  text-[16px] font-poppins font-bold !w-[120px] h-[30px] bg-red-500`}
                  onClick={handleDelete}
                >
                  Delete
                </div>
              </div>
            </>
          }
        />
      )}
    </div>
  );
};

export default AllAnnouncements;
