import React, { useState , useEffect} from "react";
import { Pencil, PlusIcon, UserPlus, DeleteIcon } from "lucide-react";
import toast from "react-hot-toast";
import AssignTask from "../task/AssignTask";
import CustomModel from "../../utils/CustomModal";
import Select from "react-select";
import NewModal from "../../utils/NewModal";
import { useAssignDeveloperMutation } from "../../redux/features/project/projectApi";
import { useParams } from "react-router-dom";
import userImg from "../../assets/user.png"

const ProjectHeader = ({developers, project, onEdit, refetch, setOpen }) => {

  const {id}=useParams();
  const { title, description, startDate, endDate,  projectLeader } = project;
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [addDeveloperOpen, setAddDeveloperOpen] = useState(false);
  const [selectedDevelopers, setSelectedDevelopers] = useState(null);


const [assignDeveloper, {isSuccess, error, data}]=useAssignDeveloperMutation();


const devId=selectedDevelopers?.value;

const handleAddDeveloper = async ({ id, devId }) => {

  await assignDeveloper({ id, data: { devId} });
};
useEffect(() => {
  if (isSuccess && data?.success) {
    toast.success(data.message);
    refetch();
    window.location.reload()
    setOpen(false);
  }

  if (error) {
    const errorMessage =
      error?.data?.message || "Failed to remove developer.";
    toast.error(errorMessage);
  }
}, [isSuccess, data, error, refetch]);


  return (
    <div className="flex justify-between items-start mb-8 md:mx-20 m-4">
      <div className="w-2/4">
        <h1 className="text-3xl font-bold text-indigo-600">{title}</h1>
        <p className="mt-2  text-gray-600">{description}</p>
        <div className="mt-2 flex gap-4 text-sm text-gray-500">
          <span>Start: {new Date(startDate).toLocaleDateString()}</span>
          <span>End: {new Date(endDate).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between items-center mb-4 pt-4">
        <h2 className="text-xl font-semibold text-gray-900">Project Lead</h2>
      </div>
      <div className="flex items-center gap-2 p-4">
              <img
                src={userImg}
                alt={projectLeader?.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900">{projectLeader?.name}</h3>
                <p className="text-sm text-gray-500">{projectLeader?.position}</p>
              </div>
      </div>
</div>
      <div className="flex w-2/4">
        <button
          onClick={() => setAddDeveloperOpen(true)}
          className="flex items-center w-fit gap-2 px-2 py-2 bg-indigo-100 hover:bg-indigo-200  transition-colors"
        >
          <UserPlus size={16} />
          <span>Add Dev</span>
        </button>
        <button
          onClick={() => setCreateTaskOpen(true)}
          className="flex items-center gap-2 w-fit px-2 py-2 bg-indigo-100 hover:bg-indigo-200  transition-colors"
        >
          <PlusIcon size={16} />
          <span>Add Task</span>
        </button>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 w-fit px-2 py-2 bg-indigo-100 hover:bg-indigo-200  transition-colors"
        >
          <Pencil size={16} />
          <span>Edit Project</span>
        </button>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 w-fit px-2 py-2 bg-indigo-100 hover:bg-indigo-200  transition-colors"
        >
          <DeleteIcon size={16} />
          <span>Delete Project</span>
        </button>
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
         children={ <div>

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
                onClick={() => handleAddDeveloper({id, devId})}
              >
                Add
              </div>
            </div>
          </div>}
          />
      )}


    </div>
  );
};

export default ProjectHeader;
