import React from 'react';


const ProjectCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <h3 className="font-medium text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm mb-3">{description}</p>
    
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {dueDate && (
          <div className="flex items-center text-gray-500 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {new Date(dueDate).toLocaleDateString()}
          </div>
        )}
        {comments > 0 && (
          <div className="flex items-center text-gray-500 text-xs">
            <MessageCircle className="w-3 h-3 mr-1" />
            {comments}
          </div>
        )}
      </div>
      
      {assignee && (
        <img
          src={assignee.avatar}
          alt={assignee.name}
          className="w-6 h-6 rounded-full"
          title={assignee.name}
        />
      )}
    </div>
  </div>
  )
}

export default ProjectCard
