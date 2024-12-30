import { FolderKanban, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useGetAllProjectsQuery } from "../redux/features/project/projectApi";
import CreateProject from "../components/Project/CreateProject";
import CustomModel from "../utils/CustomModal";
import Column from "../components/Board/Column";
import { useCreateProjectMutation } from "../redux/features/project/projectApi";
const ProjectManagement = () => {
  // const [column, setColumn]=useState([]);
  const [open, setOpen] = useState(false);

  const [projectData, setProjectData] = useState([]);
  const { data, refetch } = useGetAllProjectsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  // let set = new Set();

  // projectData?.map((dt) => set.add(dt.status));

  // const columns = dArray.from(set);
  const columns=["To Do", "In Progress", "Completed"]
 
  console.log("set", columns);
 

 
  useEffect(() => {
    refetch();
    setProjectData(data?.data);
  }, [data]);
  console.log(projectData);
  return (
    <div className="bg-indigo-400 h-full w-[100%] ">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FolderKanban className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Project Management
              </h1>
            </div>
            <div className="flex items-center space-x-4 ">
              <button
                onClick={() => setOpen(true)}
                className="text-white bg-indigo-600 flex p-2 rounded-md font-bold"
              >
                <PlusIcon />
                Create Project
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] px-4 sm:px-6 lg:px-2 py-2">
        <div className="flex gap-6 overflow-x-auto p-6">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              data={projectData}
              setOpen={setOpen}
              // onDragStart={handleDragStart}
              // onDrop={handleDrop}
              // onAddTask={handleAddTask}
            />
          ))}
        </div>
      </div>

      {open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          children={<CreateProject refetch={refetch} setOpen={setOpen}/>}
         
        />
      )}
    </div>
  );
};

export default ProjectManagement;
