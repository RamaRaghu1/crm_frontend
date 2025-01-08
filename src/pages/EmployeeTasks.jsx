import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";

import { TaskCard } from "../components/EmployeeTask/TaskCard";
import { useGetTaskByUserIdQuery } from "../redux/features/task/taskApi";
import { useParams } from "react-router-dom";



export function EmployeeTasks() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const { data, isSuccess } = useGetTaskByUserIdQuery(id);
  useEffect(() => {
    if (isSuccess && data.success) {
      setTasks(data.data);
    }
  }, [isSuccess]);

  console.log("thjguhj", tasks);
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Tasks</h1>

          <div className="flex items-center gap-6">
            {/* Search Input with Icon */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[300px] py-2 px-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters Section */}
            <div className="flex items-center gap-4">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-2 px-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Review">Review</option>
                <option value="Reassigned">Reassigned</option>
              </select>

              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="py-2 px-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>

 
   
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              title={task.title}
              description={task.description}
              dueDate={task.endDate}
              priority={task.priority}
              status={task.status}
              assignee={task?.assignedBy?.name}
            />
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No tasks found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
