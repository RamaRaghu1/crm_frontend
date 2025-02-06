import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUsersListQuery } from "../../redux/features/user/userApi";
import { useUpdateProjectMutation } from "../../redux/features/project/projectApi";
import toast from "react-hot-toast";
import Select from "react-select";

const UpdateProject = ({ setEditProjectOpen, project }) => {
    console.log(project)
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const [selectedLead, setSelectedLead] = useState({});
  const [projectData, setProjectData] = useState(project);
  const { id } = useParams();
  const { data } = useUsersListQuery();

  const [updateProject, { isSuccess, data: projectUpdateData, error }] = useUpdateProjectMutation();


 
  useEffect(() => {
    if (project) {

        const developers = data?.data
      .filter((dt) => dt.position.includes("developer"))
      .map((dt) => ({
        value: dt._id,
        label: dt.name,
      }));

        const projectLead = project.projectLeader
        ? { value: project.projectLeader._id, label: project.projectLeader.name }
        : null;


      setProjectData({
        title: project.title || "",
        description: project.description || "",
        startDate: project.startDate ? project.startDate.split("T")[0] : "", 
        endDate: project.endDate ? project.endDate.split("T")[0] : "", 
        projectLeader: projectLead ,
        developers: project.developers ,
      });
      setSelectedLead(projectLead);
      setSelectedDevelopers(project.developers.map((dev) => ({ value: dev._id, label: dev.name })));
    }
  }, [project, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setProjectData((prevData) => ({
      ...prevData,
      projectLeader: selectedLead?.value,
      developers: selectedDevelopers.map((item) => item.value),
    }));
  }, [selectedLead, selectedDevelopers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProject({id, data:projectData});
  };

  useEffect(() => {
    if (isSuccess && projectUpdateData.success === true) {
      toast.success(projectUpdateData.message);
      setEditProjectOpen(false); 
      window.location.reload();
    }

    if (error) {
        const errorMessage = error;
        toast.error(errorMessage?.data?.message);
      }
  }, [isSuccess, projectUpdateData, error, setEditProjectOpen]);

  const developers = data?.data
    .filter((dt) => dt.position.includes("developer"))
    .map((dt) => ({
      value: dt._id,
      label: dt.name,
    }));

  
  return (
    <div className="bg-white rounded-lg h-full w-full">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-xl font-semibold">Update Project</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Project Name
          </label>
          <input
            type="text"
            name="title"
            value={projectData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>
        <div className="mb-6 flex justify-between">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
            <div className="input-wrapper">
              <input
                type="date"
                name="startDate"
                value={projectData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </label>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
            <div className="input-wrapper">
              <input
                type="date"
                name="endDate"
                value={projectData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </label>
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Project Lead
          </label>
          <Select
            value={selectedLead}
            onChange={setSelectedLead}
            options={developers}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Assign Developers
          </label>
          <Select
            value={selectedDevelopers}
            onChange={setSelectedDevelopers}
            options={developers}
            isMulti
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setEditProjectOpen(false)}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
