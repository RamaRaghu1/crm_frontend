import React, { useState } from 'react';
import { ChevronDown, ChevronUp, TableOfContents  } from 'lucide-react';
import NewModal from '../../utils/NewModal';
import UserImg from "../../assets/user.png"
import ViewTask from '../task/ViewTask';
// "To Do", "In Progress", "Review", "Reassigned", "Completed"

const TasksAccordion = ({ tasks, refetch }) => {

  const [open, setOpen]=useState(false);
const[id, setId]=useState(null);
   const [openSection, setOpenSection] = useState('todo');


  const handleOpen=(id)=>{
    setOpen(true);
    setId(id)
  }
  const tasksByStatus = {
    todo: tasks?.filter(task => task.status === 'To Do'),
    inprogress: tasks?.filter(task => task.status === 'In Progress'),
    review: tasks?.filter(task => task.status === 'Review'),
    reassigned: tasks?.filter(task => task.status === 'Reassigned'),
    completed: tasks?.filter(task => task.status === 'Completed'),
  };

  const sections = [
    { id: 'todo', title: 'To Do', tasks: tasksByStatus.todo },
    { id: 'inprogress', title: 'In Progress', tasks: tasksByStatus.inprogress },
    { id: 'review', title: 'Review', tasks: tasksByStatus.review },
    { id: 'reassigned', title: 'Reassigned', tasks: tasksByStatus.reassigned },
    { id: 'completed', title: 'Completed', tasks: tasksByStatus.completed },
  ];

  return (
    <div className="space-y-4 md:mx-20 m-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Tasks</h2>
      {sections.map((section) => (
        <div key={section.id} className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenSection(openSection === section.id ? '' : section.id)}
            className="w-full flex items-center justify-between p-4 bg-indigo-100 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{section.title}</span>
              <span className="text-sm text-gray-500">({section?.tasks?.length})</span>
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
                <div key={task._id} className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>

                    {/* {task.developer && (
                      <div className="flex items-center gap-2">
                        <img
                          src={UserImg}
                          alt={task.developer?.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-gray-500">
                          {task.developer?.name}
                        </span>
                      </div>
                    )} */}
                    
                    <TableOfContents className='cursor-pointer' onClick={()=>handleOpen(task?._id)} size={26}/>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}



      {open ? (
           <NewModal
           open={open}
           setOpen={setOpen}
           children={
            <ViewTask taskId={id} setOpen={setOpen} refetch={refetch}/>
           }
           />
      ) : <></>}
    </div>
  );
};

export default TasksAccordion;