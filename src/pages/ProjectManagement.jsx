import { FolderKanban, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { StepBack } from "lucide-react";
import {
  useGetAllProjectsQuery,
  useGetProjectByDevIdQuery,
} from "../redux/features/project/projectApi";
import CreateProject from "../components/Project/CreateProject";
import CustomModel from "../utils/CustomModal";
import Column from "../components/Board/Column";
import { useNavigate } from "react-router-dom";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import { useParams } from "react-router-dom";



const ProjectManagement = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const {
    data: userData,
    isLoading,
    isSuccess,
    refetch: userRefetch,
  } = useLoadUserQuery({});

  const navigate=useNavigate();
  const { data: projectById, isLoading: projectDataLoading } =
    useGetProjectByDevIdQuery(id);

  const { data, refetch } = useGetAllProjectsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  useEffect(() => {
    if (isSuccess && userData.success) {
      setUser(userData.data);
    }
  }, [isSuccess, userData]);

  useEffect(() => {
    userRefetch();
  }, []);

  useEffect(() => {
    refetch();
    setProjectData(data?.data);
  }, [data]);

  const project = !user.isSuperUser ? projectById?.data : projectData;

  const columns = ["To Do", "In Progress", "Completed"];




  return (
    <div className="bg-indigo-200 h-[100%] w-[100%] ">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FolderKanban className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                {!user?.isSuperUser ? "My Projects" : " Project Management"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {user && user?.isSuperUser ? (
                <>
                  {/* Create Project Button */}
                  <button
                    onClick={() => setOpen(true)}
                    className="flex items-center px-4 py-2 text-white bg-indigo-600 rounded-md font-bold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    <PlusIcon className="mr-2 text-lg" />
                    Create Project
                  </button>
                </>
              ) : (
                <></>
              )}
              {/* Go Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center px-4 py-2 text-indigo-600 bg-gray-100 border border-gray-300 rounded-md font-bold shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
              >
                <StepBack className="mr-2 text-lg" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-screen px-4 sm:px-6 lg:px-2 py-2">
        <div className="flex gap-6 overflow-x-auto p-6">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              data={project}
              setOpen={setOpen}
              user={user}
            />
          ))}
        </div>
      </div>

      {open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          children={<CreateProject refetch={refetch} setOpen={setOpen} />}
        />
      )}
    </div>
  );
};

export default ProjectManagement;
