import { useState, useEffect } from "react";
import * as React from "react";
import {
  CalendarDays,
  User,
  ArrowRightLeft,
  Clock,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

import {
  useChangeTaskStatusMutation,
  useGetTaskByIDQuery,
} from "../../redux/features/task/taskApi";
import userImg from "../../assets/user.png";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
// Constants
const STATUSES = ["To Do", "In Progress", "Review", "Reassigned", "Completed"];

// Utility functions
const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "Low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "In Progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "Review":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "Reassigned":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const getRemainingDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { isOverdue: false, days: 0 };
  }

  const differenceInMs = end - start;
  const days = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

  return {
    isOverdue: days < 0,
    days: Math.abs(days),
  };
};

function ViewTask({ taskId, setOpen, refetch }) {
  const [task, setTask] = useState({});
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const { isOverdue, days } = getRemainingDays(task?.startDate, task?.endDate);
  const { isSuccess, error, data } = useGetTaskByIDQuery(taskId);
  const [
    changeTaskStatus,
    {
      isSuccess: changeStatusSuccess,
      error: changeStatusError,
      data: changeStatusData,
    },
  ] = useChangeTaskStatusMutation();
  useEffect(() => {
    if (isSuccess && data.success) {
      setTask(data?.data);
    }
  }, [isSuccess, data]);

  const handleStatusChange = async (newStatus) => {
    setTask((prev) => ({
      ...prev,
      status: newStatus,
    }));
    setIsSelectOpen(false);
    await changeTaskStatus({
      id: task.projectId,
      taskId: task._id,
      status: newStatus,
    });
    console.log(`Updating task ${task._id} status to ${newStatus}`);
  };

  useEffect(() => {
    if (changeStatusSuccess && changeStatusData.success) {
      toast.success(changeStatusData.message);
      setOpen(false);
       window.location.reload()
    }

    if (changeStatusError) {
      const errorMessage = changeStatusError;
      toast.error(errorMessage?.data?.message);
    }
  }, [changeStatusError, changeStatusSuccess]);
  return (
    <div className="py-2">
      <div className="px-6   space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-semibold text-xl">{task.title}</h3>
            {isOverdue && task.status !== "Completed" && (
              <div className="flex items-center gap-1 text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Overdue by {days} days
                </span>
              </div>
            )}
          </div>
          <div
            className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {task.description}
        </p>
      </div>

      <div className="px-6 py-4 mt-4 border-t flex justify-between items-center">
        <div
          className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(
            task.status
          )}`}
        >
          {task.status}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsSelectOpen(!isSelectOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-md border bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span>Update Status</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {isSelectOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {STATUSES.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 space-y-4 border-t py-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4 text-gray-500" />
            <span className="text-gray-500">
              {new Date(task?.startDate).toLocaleDateString()} -{" "}
              {new Date(task?.endDate).toLocaleDateString()}
            </span>
          </div>

          {!isOverdue && task.status !== "Completed" && days > 0 && (
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <Clock className="h-4 w-4" />
              <span>{days} days remaining</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex px-6 py-4 items-center border-t  justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userImg}
            alt={task?.developer?.name}
            className="w-8 h-8 rounded-full shadow-md"
          />
          <div className="text-sm">
            <p className="font-medium">{task?.developer?.name}</p>
            <p className="text-muted-foreground">{task?.developer?.position}</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Assigned by: {task?.assignedBy?.name}
        </div>
      </div>
    </div>
  );
}

export default ViewTask;
