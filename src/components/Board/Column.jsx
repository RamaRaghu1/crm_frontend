import React from 'react';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';


const Column= ({ column,data, setOpen,}) => {
//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

const filteredTasks = data.filter((task) => task?.status === column?.title);
console.log(data,"inside column")

  return (
    <div
      className="bg-gray-50 p-6 rounded-lg shadow-sm w-1/3 h-full "
    //   onDragOver={handleDragOver}
    //   onDrop={(e) => onDrop(e, column.id)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">{column?.label}</h3>
        {/* <span className="text-sm text-gray-500">{column.tasks.length}</span> */}
      </div>

      <div className="space-y-3">
        {filteredTasks?.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            // onDragStart={(e) => onDragStart(e, task.id, column.id)}
          />
        ))}
      </div> 

      <button
        onClick={() => setOpen(true)}
        className="mt-4 w-full py-2 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
      >
        <Plus size={20} className="mr-2" />
        Add Task
      </button>
    </div>
  );
};

export default Column;