import React, { useState } from "react";
import { Pencil, PlusIcon, UserPlus } from "lucide-react";

import AssignTask from "../task/AssignTask";
import CustomModel from "../../utils/CustomModal";

const ProjectHeader = ({ project, onEdit, refetch }) => {
  const { title, description, startDate, endDate } = project;
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [addDeveloperOpen, setAddDeveloperOpen] = useState(false);

  return (
    <div className="flex justify-between items-start mb-8">
      <div className="w-2/4">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2  text-gray-600">{description}</p>
        <div className="mt-2 flex gap-4 text-sm text-gray-500">
          <span>Start: {new Date(startDate).toLocaleDateString()}</span>
          <span>End: {new Date(endDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex">
        <button
          onClick={()=>setAddDeveloperOpen(true)}
          className="flex items-center w-fit gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200  transition-colors"
        >
          <UserPlus size={16} />
          <span>Add Developer</span>
        </button>
        <button
          onClick={() => setCreateTaskOpen(true)}
          className="flex items-center gap-2 w-fit px-4 py-2 bg-gray-100 hover:bg-gray-200  transition-colors"
        >
          <PlusIcon size={16} />
          <span>Add Task</span>
        </button>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 w-fit px-4 py-2 bg-gray-100 hover:bg-gray-200  transition-colors"
        >
          <Pencil size={16} />
          <span>Edit Project</span>
        </button>
      </div>

      {createTaskOpen && (
        <CustomModel
          open={createTaskOpen}
          setOpen={setCreateTaskOpen}
          children={
            <AssignTask setCreateTaskOpen={setCreateTaskOpen} refetch={refetch} project={project} />
          }
        />
      )}


      {addDeveloperOpen &&(
          <Modal
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 outline-none w-[450px]  bg-white rounded-[8px] shadow p-4">
            <h1
              className={`md:text-[25px]  text-[20px] text-black  font-semibold font-poppins text-center py-2`}
            >
              Are you sure you want to remove this developer from this project?
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
                Add
              </div>
            </div>
          </Box>
        </Modal>
      )


      }
    </div>
  );
};

export default ProjectHeader;
