import { Calendar, Clock, Flag, MoreVertical, User } from "lucide-react";

import UserImg from "../../assets/user.png";

const priorityColors = {
  Low: "bg-blue-100 text-blue-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-red-100 text-red-800",
};

const statusColors = {
  "To Do": "bg-gray-200 text-gray-800",
  "In Progress": "bg-purple-100 text-purple-800",
  "Completed": "bg-green-100 text-green-800",
  "Reassigned": "bg-red-100 text-red-800",
  "Review": "bg-yellow-100 text-yellow-800",
};

export function TaskCard({
  title,
  description,
  dueDate,
  priority,
  status,
  assignee,
}) {
  return (
    <div className={`w-full max-w-md transition-all duration-300 hover:shadow-xl p-6 rounded-md border-2 `}>
        <div className={`bg-${priorityColors[priority]} w-fit h-4`}></div>
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold leading-none  tracking-tight">
            {title}
          </h3>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 text-gray-600">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4 ">
          <div
            className={`${priorityColors[priority]} flex items-center px-4 h-fit rounded-xl`}
          >
            <Flag className="mr-1 h-3 w-3" />
            <span className="text-sm ">
              {" "}
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
          </div>
          <div
            className={`${statusColors[status]} flex items-center px-4 h-fit rounded-xl`}
          >
            <Clock className="mr-1 h-3 w-3" />
            <span className="text-sm ">
              {" "}
              {status
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 border-t text-gray-600">
        <div className="flex items-center space-x-2">
          <img
            src={UserImg}
            alt={assignee}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-muted-foreground">
            {" "}
            Assigned by: {assignee}
          </span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          {new Date(dueDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
