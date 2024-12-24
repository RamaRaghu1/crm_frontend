import React from 'react';
import {Paperclip, MessageCircle,Clock,GripVertical} from 'lucide-react'
import { useNavigate } from 'react-router-dom';


const TaskCard= ({ task}) => {
const navigate=useNavigate();
const {title, description, endDate, startDate, _id}=task;

  return (
    <div className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer" onClick={()=>navigate(`/project/${_id}`)}>
    <div className="opacity-0 group-hover:opacity-100 transition-opacity px-4 pt-2">
      <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
    </div>
    <div className="px-3 pb-3">
      <h3 className="font-medium text-indigo-600 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm mb-3 truncate hover:text-clip">{description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {endDate && (
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5" />
              {new Date(endDate).toLocaleDateString()}
            </div>
          )}
          <div className="flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" />
            comments
          </div>
          <div className="flex items-center gap-1">
            <Paperclip className="w-3.5 h-3.5" />
            2
          </div>
        </div>
        
       
      </div>
    </div>
  </div>
  );
};

export default TaskCard;