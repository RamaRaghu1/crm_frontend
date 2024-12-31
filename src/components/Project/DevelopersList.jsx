import React, { useState, useEffect } from "react";
import { UserPlus, X } from "lucide-react";
import userImg from "../../assets/user.png";
import { useParams } from "react-router-dom";
import { Modal, Box } from "@mui/material";
import toast from "react-hot-toast";
import { useRemoveDeveloperMutation } from "../../redux/features/project/projectApi";
import { ref } from "yup";
import NewModal from "../../utils/NewModal";

const DevelopersList = ({ developers, onAddDeveloper, refetch }) => {
  const { id } = useParams();
  const [
    removeDeveloper,
    {
      isSuccess: removeSuccess,
      data: removeSuccessData,
      error: removeDevError,
    },
  ] = useRemoveDeveloperMutation();


  const [open, setOpen] = useState(false);
  const [devId, setDevId] = useState(null);


  const handleRemoveDeveloper = async ({ id, devId }) => {
    await removeDeveloper({ id, data: { devId } });
  };
  useEffect(() => {
    if (removeSuccess && removeSuccessData?.success) {
      toast.success(removeSuccessData.message);
      // refetch();
      window.location.reload()
      setDevId(null);
      setOpen(false);
    }

    if (removeDevError) {
      const errorMessage =
        removeDevError?.data?.message || "Failed to remove developer.";
      toast.error(errorMessage);
    }
  }, [removeSuccess, removeSuccessData, removeDevError, refetch]);

  return (
    <div className="mb-8 md:mx-20 m-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Project Team</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {developers?.map((developer) => (
          <div
            key={developer._id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-2">
              <img
                src={userImg}
                alt={developer.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900">{developer.name}</h3>
                <p className="text-sm text-gray-500">{developer.position}</p>
              </div>
            </div>
            <button
              // onClick={() =>
              // handleRemoveDeveloper({ id: id, devId: developer?._id })}
              onClick={() => {
                setOpen(true);
                setDevId(developer._id);
              }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        ))}
      </div>

      {open && (
        <NewModal
          open={open}
          setOpen={setOpen}
          children={
            <>
              <h1
                className={`md:text-[25px]  text-[20px] text-black  font-semibold font-poppins text-center py-2`}
              >
                Are you sure you want to remove this developer from this
                project?
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
                  onClick={() => handleRemoveDeveloper({ id, devId })}
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

export default DevelopersList;
