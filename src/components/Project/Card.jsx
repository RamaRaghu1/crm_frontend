import React from 'react';
import { Clock, MessageCircle, Paperclip, GripVertical } from 'lucide-react';


export function Card({ title, description, dueDate, comments, assignee }) {
  return (
    <div className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity px-3 pt-2">
        <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
      </div>
      <div className="px-3 pb-3">
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {dueDate && (
              <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5" />
                {new Date(dueDate).toLocaleDateString()}
              </div>
            )}
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              {comments}
            </div>
            <div className="flex items-center gap-1">
              <Paperclip className="w-3.5 h-3.5" />
              2
            </div>
          </div>
          
          {/* {assignee && (
            <img
              src={assignee.avatar}
              alt={assignee.name}
              className="w-6 h-6 rounded-full ring-2 ring-white"
              title={assignee.name}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}