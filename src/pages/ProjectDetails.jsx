import React, { useEffect, useState } from "react";
import DevelopersList from "../components/Project/DevelopersList";
import TasksAccordion from "../components/Project/TasksAccordion";
import ProjectHeader from "../components/Project/ProjectHeader";
import {
  useGetProjectByIdQuery,
  useRemoveDeveloperMutation,
} from "../redux/features/project/projectApi";
import { useParams } from "react-router-dom";
import { useCreateTaskMutation } from "../redux/features/task/taskApi";
import { useUsersListQuery } from "../redux/features/user/userApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";

const ProjectDetails = () => {
  const { data: userData } = useUsersListQuery();

  const { data: user, refetch: userRefetch } = useLoadUserQuery({});

  const developers = userData?.data
    // .filter((dt) => dt.position.includes("developer"))
    .map((dt) => ({
      value: dt._id,
      label: dt.name,
    }));

  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const [projectData, setProjectData] = useState({});

  const { data, isSuccess, refetch } = useGetProjectByIdQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });


  useEffect(() => {
    userRefetch();
  }, []);

  
  useEffect(() => {
    if (isSuccess) {
      setProjectData(data?.data);
    }
  }, [isSuccess]);

  const handleCreateTask = async () => {
   

    // await createTask(data);
  };

  const handleEditProject = () => {
    console.log("Edit project clicked");
  };

  const handleAddDeveloper = () => {
    console.log("Add developer clicked");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ProjectHeader
        developers={developers}
        project={projectData}
        onEdit={handleEditProject}
        refetch={refetch}
        setOpen={setOpen}
        user={user?.data}
      />
      <DevelopersList
        developers={projectData?.developers}
        onAddDeveloper={handleAddDeveloper}
        refetch={refetch}
      />
      <TasksAccordion tasks={projectData?.tasks}  refetch={refetch}/>
    </div>
  );
};

export default ProjectDetails;
