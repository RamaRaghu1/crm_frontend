import React, { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import { useUsersListQuery } from "../../redux/features/user/userApi";
import toast from "react-hot-toast";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";

import { useCreateTaskMutation } from "../../redux/features/task/taskApi";

const AssignTask = ({ setCreateTaskOpen, project, refetch }) => {
  const { data: user, isSuccess } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  });
  const [
    createTask,
    { isSuccess: createTaskSuccess, data: createTaskData, error },
  ] = useCreateTaskMutation();
  const [userData, setUserData] = useState({});

  const { id } = useParams();
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  console.log("sele", selectedDeveloper);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "Low",
    projectId: project?._id,
  });
  const { data } = useUsersListQuery();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
      developer: selectedDeveloper?.value,
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      setUserData(user?.data);
    }

    setTaskData((prevData) => ({
      ...prevData,

      developer: selectedDeveloper?.value,
    }));
  }, [selectedDeveloper, isSuccess]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    await createTask(taskData);
  };

  useEffect(() => {
    if (createTaskSuccess && createTaskData.success === true) {
      toast.success(createTaskData.message);
      // refetch();
      window.location.reload();
      setCreateTaskOpen(false);
    }

    if (error) {
      const errorMessage = error;
      toast.error(errorMessage.data.message);
    }
  }, [createTaskSuccess, createTaskData, error]);

  const developer = data?.data
    // .filter((dt) => dt.position.includes("developer"))
    .map((dt) => ({
      value: dt._id,
      label: dt.name,
    }));

 
  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg h-full w-full">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-xl font-semibold">Create New Task</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Task Name
          </label>
          <input

            type="text"
            name="title"
            value={taskData.title}
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
            value={taskData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>
        <div className="mb-6 flex justify-between">
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Priority
            </label>
            <select required name="priority">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
            <div className="input-wrapper">
              <input
              required
                type="date"
                name="startDate"
                value={taskData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </label>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
            <div className="input-wrapper">
              <input
              required
                type="date"
                name="endDate"
                value={taskData.endDate}
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
            Assign Developer
          </label>
          <Select
            defaultValue={selectedDeveloper}
            onChange={setSelectedDeveloper}
            options={developer}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() =>setCreateTaskOpen(false)}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
    //   </div>
  );
};

export default AssignTask;
