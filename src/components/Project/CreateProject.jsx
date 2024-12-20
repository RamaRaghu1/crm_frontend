import React, { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import { useUsersListQuery } from "../../redux/features/user/userApi";
import toast from "react-hot-toast";
import Select from "react-select";
import { useCreateProjectMutation } from "../../redux/features/project/projectApi";

const CreateProject = ({setOpen}) => {
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const [selectedLead, setSelectedLead] = useState({});
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    projectLeader: null,
    developers: [],
  });
  const { data } = useUsersListQuery();

  const [CreateProject, { isSuccess,data:projectCreateData, error }] = useCreateProjectMutation();

  console.log(selectedDevelopers);
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
    console.log(projectData);
    e.preventDefault();
    await CreateProject(projectData);
  };

  useEffect(() => {
    if (isSuccess && projectCreateData.success === true) {
      toast.success(projectCreateData.message);

      setOpen(false);
    }

    if (error) {
      const errorMessage = error;
      toast.error(errorMessage.projectCreateData.message);
    }
  }, [isSuccess, projectCreateData, error]);

  const developers = data?.data
    .filter((dt) => dt.position.includes("developer"))
    .map((dt) => ({
      value: dt._id,
      label: dt.name,
    }));

  console.log(selectedLead, "nhhgjh");
  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg h-[90vh] w-full">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-xl font-semibold">Create New Project</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Lead
          </label>
          <Select
            defaultValue={selectedLead}
            onChange={setSelectedLead}
            options={developers}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Assign Developers
          </label>
          <Select
            defaultValue={selectedDevelopers}
            onChange={setSelectedDevelopers}
            options={developers}
            isMulti
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
    //   </div>
  );
};

export default CreateProject;
