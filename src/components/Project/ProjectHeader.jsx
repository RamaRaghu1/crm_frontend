import React, { useState, useEffect } from "react";
import { Pencil, PlusIcon, UserPlus, DeleteIcon } from "lucide-react";
import toast from "react-hot-toast";
import AssignTask from "../task/AssignTask";
import CustomModel from "../../utils/CustomModal";
import Select from "react-select";
import NewModal from "../../utils/NewModal";
import { StepBack } from "lucide-react";
import {
  useAssignDeveloperMutation,
  useDeleteProjectMutation,
} from "../../redux/features/project/projectApi";
import { useParams } from "react-router-dom";
import userImg from "../../assets/user.png";
import { useNavigate } from "react-router-dom";
const ProjectHeader = ({
  developers,
  project,
  onEdit,
  refetch,
  setOpen,
  user,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { title, description, startDate, endDate, projectLeader } = project;
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [deleteProjectOpen, setDeleteProjectOpen] = useState(false);
  const [addDeveloperOpen, setAddDeveloperOpen] = useState(false);
  const [selectedDevelopers, setSelectedDevelopers] = useState(null);

  const [assignDeveloper, { isSuccess, error, data }] =
    useAssignDeveloperMutation();
  const [
    deleteProject,
    { isSuccess: deleteSuccess, error: deleteError, data: deleteData },
  ] = useDeleteProjectMutation();

  const devId = selectedDevelopers?.value;

  const handleAddDeveloper = async ({ id, devId }) => {
    await assignDeveloper({ id, data: { devId } });
  };

  const handleDeleteProject = async () => {
  const result=  await deleteProject( id );
    console.log("Delete result:", result);
  };

  useEffect(() => {
    console.log("deleteSuccess:", deleteSuccess);
  console.log("deleteData:", deleteData);
    if (deleteSuccess && deleteData?.success) {
      toast.success(deleteData.message || "Project deleted successfully.");
      setDeleteProjectOpen(false);
      navigate(-1);
    } else if (deleteError) {
      const errorMessage =
        deleteError?.data?.message || "Failed to remove developer.";
      toast.error(errorMessage);
    }
  }, [deleteSuccess, deleteData, deleteError]);
  

  useEffect(() => {
    if (isSuccess && data?.success) {
      toast.success(data.message);
      refetch();
      window.location.reload();
      setOpen(false);
    }

  
    if (error) {
      const errorMessage =
        error?.data?.message || "Failed to remove developer.";
      toast.error(errorMessage);
    }
  }, [isSuccess, data, error, refetch, ]);

  return (
    <div className=" flex gap-8 mb-8 md:mx-20 m-4">
  {/* Project Details Section */}
  <div className="w-full md:w-2/4 space-y-6">
    <h1 className="text-3xl font-bold text-indigo-600">{title}</h1>
    <p className="text-gray-600">{description}</p>
    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
      <span>
        <strong>Start:</strong> {new Date(startDate).toLocaleDateString()}
      </span>
      <span>
        <strong>End:</strong> {new Date(endDate).toLocaleDateString()}
      </span>
    </div>
  
  </div>

  {/* Action Buttons Section */}
  <div className="w-full md:w-2/4 space-y-6">
 
     <div className="p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900">Project Lead</h2>
          <div className="flex items-center gap-4 mt-4">
            <img
              src={userImg}
              alt={projectLeader?.name}
              className="w-12 h-12 rounded-full shadow-md"
            />
            <div>
              <h3 className="font-medium text-gray-900">
                {projectLeader?.name}
              </h3>
              <p className="text-sm text-gray-500">{projectLeader?.position}</p>
            </div>
          </div>
          </div>
    {user && (user?.isSuperUser || projectLeader?._id === user?._id) && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Developer Button */}
        <button
          onClick={() => setAddDeveloperOpen(true)}
          className="flex items-center gap-3 px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
        >
          <UserPlus size={20} />
          <span className="text-lg font-semibold">Add Developer</span>
        </button>

        {/* Add Task Button */}
        <button
          onClick={() => setCreateTaskOpen(true)}
          className="flex items-center gap-3 px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 transition-all"
        >
          <PlusIcon size={20} />
          <span className="text-lg font-semibold">Add Task</span>
        </button>

        {/* Edit Project Button */}
        <button
          onClick={onEdit}
          className="flex items-center gap-3 px-6 py-3 text-white bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all"
        >
          <Pencil size={20} />
          <span className="text-lg font-semibold">Edit Project</span>
        </button>

        {/* Delete Project Button */}
        <button
          onClick={() => setDeleteProjectOpen(true)}
          className="flex items-center gap-3 px-6 py-3 text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-300 transition-all"
        >
          <DeleteIcon size={20} />
          <span className="text-lg font-semibold">Delete Project</span>
        </button>
      </div>
    )}





    {/* Go Back Button */}
    {/* <button
      onClick={() => navigate(-1)}
      className="flex items-center justify-center w-full gap-3 px-6 py-3 text-blue-600 bg-gray-100 border border-gray-300 rounded-lg shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all"
    >
      <StepBack size={20} />
      <span className="text-lg font-semibold">Go Back</span>
    </button> */}
  </div>



      {createTaskOpen && (
        <CustomModel
          open={createTaskOpen}
          setOpen={setCreateTaskOpen}
          children={
            <AssignTask
              setCreateTaskOpen={setCreateTaskOpen}
              refetch={refetch}
              project={project}
            />
          }
        />
      )}

      {addDeveloperOpen && (
        <NewModal
          open={addDeveloperOpen}
          setOpen={setAddDeveloperOpen}
          children={
            <div>
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Add Developers
                </label>
                <Select
                  defaultValue={selectedDevelopers}
                  onChange={setSelectedDevelopers}
                  options={developers}
                  // isMulti
                />
              </div>

              <div className="flex w-full items-center justify-evenly mb-6 mt-4">
                <div
                  className={`flex flex-row justify-center items-center  py-3 px-6 rounded-full cursor-pointer  min-h-[45px] text-[16px] font-poppins font-bold !w-[120px] h-[30px] bg-green-500`}
                  onClick={() => setAddDeveloperOpen(!addDeveloperOpen)}
                >
                  Cancel
                </div>
                <div
                  className={`flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer  min-h-[45px]  text-[16px] font-poppins font-bold !w-[120px] h-[30px] bg-red-500`}
                  onClick={() => handleAddDeveloper({ id, devId })}
                >
                  Add
                </div>
              </div>
            </div>
          }
        />
      )}

      {deleteProjectOpen && (
        <NewModal
          open={open}
          setOpen={setOpen}
          children={
            <>
              <h1
                className={`md:text-[25px]  text-[20px] text-black  font-semibold font-poppins text-center py-2`}
              >
                Are you sure you want to delete this project?
              </h1>
              <div className="flex w-full items-center justify-evenly mb-6 mt-4">
                <div
                  className={`flex flex-row justify-center items-center  py-3 px-6 rounded-full cursor-pointer  min-h-[45px] text-[16px] font-poppins font-bold !w-[120px] h-[30px] bg-green-500`}
                  onClick={() => setDeleteProjectOpen(!deleteProjectOpen)}
                >
                  Cancel
                </div>
                <div
                  className={`flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer  min-h-[45px]  text-[16px] font-poppins font-bold !w-[120px] h-[30px] bg-red-500`}
                  onClick={handleDeleteProject}
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

export default ProjectHeader;
