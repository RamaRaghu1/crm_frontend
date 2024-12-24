import React from 'react';
import { Pencil } from 'lucide-react';




const ProjectHeader= ({ project, onEdit }) => {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
        <p className="mt-2 text-gray-600">{project.description}</p>
        <div className="mt-2 flex gap-4 text-sm text-gray-500">
          <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
          <span>End: {new Date(project.endDate).toLocaleDateString()}</span>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <Pencil size={16} />
        <span>Edit Project</span>
      </button>
    </div>
  );
};

export default ProjectHeader;