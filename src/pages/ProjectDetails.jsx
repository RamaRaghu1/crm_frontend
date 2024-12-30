import React, { useEffect, useState } from "react";
import DevelopersList from "../components/Project/DevelopersList";
import TasksAccordion from "../components/Project/TasksAccordion";
import ProjectHeader from "../components/Project/ProjectHeader";
import { useGetProjectByIdQuery, useRemoveDeveloperMutation } from "../redux/features/project/projectApi";
import { useParams } from "react-router-dom";
import { useCreateTaskMutation } from "../redux/features/task/taskApi";

import toast from "react-hot-toast";


const ProjectDetails = () => {
  const [open, setOpen]=useState(false);
  const { id } = useParams();

  const [projectData, setProjectData] = useState({});



  const { data, isSuccess , refetch} = useGetProjectByIdQuery(id,{
    refetchOnMountOrArgChange: true});

  console.log("det", projectData);
  useEffect(() => {
    if (isSuccess) {
       
      setProjectData(data?.data);
    }

    
  }, [isSuccess]);

  const handleCreateTask = async() => {
    console.log("create task clicked");

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
      <ProjectHeader project={projectData} onEdit={handleEditProject} refetch={refetch} />
      <DevelopersList
        developers={projectData?.developers}
        onAddDeveloper={handleAddDeveloper}
        refetch={refetch}
      />
      <TasksAccordion tasks={projectData?.tasks} />




    


    </div>
  );
};

export default ProjectDetails;
