import { FolderKanban ,PlusIcon} from 'lucide-react'
import React, { useState } from 'react'
import { useGetAllProjectsQuery } from '../redux/features/project/projectApi'
import CreateProject from '../components/Project/CreateProject';
import CustomModel from '../utils/CustomModal';



const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'review', title: 'Review' },

  { id: 'reassigned', title: 'Reassigned' },
  { id: 'completed', title: 'Completed' },
  { id: 'reassigned', title: 'Reassigned' },
  { id: 'completed', title: 'Completed' },
];


const ProjectManagement = () => {
  const [open, setOpen]=useState(false);
  const {data}=useGetAllProjectsQuery();
  console.log(data)
  return (
    <div className='bg-indigo-400 h-screen w-full'>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FolderKanban className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Project Management
              </h1>
            </div>
            <div className="flex items-center space-x-4 ">
             <button onClick={()=>setOpen(true)} className='text-white bg-indigo-600 flex p-2 rounded-md font-bold'>
              <PlusIcon/>
              Create Project
             </button>
            </div>
          </div>
        </div>

      </div>
      <div className="w-screen px-4 sm:px-6 lg:px-2 py-2 ">




        </div>


      {open && (
  <CustomModel
    open={open}
    setOpen={setOpen}  
    component={CreateProject}
  />
)}

    </div>





  )
}

export default ProjectManagement
