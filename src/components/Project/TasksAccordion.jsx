import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';


// "To Do", "In Progress", "Review", "Reassigned", "Completed"

const TasksAccordion = ({ tasks }) => {

  console.log("hgfyghj", tasks)
  const [openSection, setOpenSection] = useState('todo');

  const tasksByStatus = {
    todo: tasks?.filter(task => task.status === 'To Do'),
    inprogress: tasks?.filter(task => task.status === 'In Progress'),
    review: tasks?.filter(task => task.status === 'Review'),
    reassigned: tasks?.filter(task => task.status === 'Reassigned'),
    completed: tasks?.filter(task => task.status === 'completed'),
  };

  const sections = [
    { id: 'todo', title: 'To Do', tasks: tasksByStatus.todo },
    { id: 'inprogress', title: 'In Progress', tasks: tasksByStatus.inprogress },
    { id: 'review', title: 'Review', tasks: tasksByStatus.review },
    { id: 'reassigned', title: 'Reassigned', tasks: tasksByStatus.reassigned },
    { id: 'completed', title: 'Completed', tasks: tasksByStatus.completed },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Tasks</h2>
      {sections.map((section) => (
        <div key={section.id} className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenSection(openSection === section.id ? '' : section.id)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{section.title}</span>
              {/* <span className="text-sm text-gray-500">({section.tasks.length})</span> */}
            </div>
            {openSection === section.id ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {openSection === section.id && (
            <div className="divide-y">
              {section?.tasks?.map((task) => (
                <div key={task.id} className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    {/* {task.assignedTo && (
                      <div className="flex items-center gap-2">
                        <img
                          src={task.assignedTo.avatar}
                          alt={task.assignedTo.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-gray-500">
                          {task.assignedTo.name}
                        </span>
                      </div>
                    )} */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TasksAccordion;