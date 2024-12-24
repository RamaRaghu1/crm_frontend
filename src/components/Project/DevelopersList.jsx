import React from 'react';
import { UserPlus, X } from 'lucide-react';




const DevelopersList= ({
  developers,
  onAddDeveloper,
  onRemoveDeveloper,
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Project Team</h2>
        <button
          onClick={onAddDeveloper}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors"
        >
          <UserPlus size={16} />
          <span>Add Developer</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {developers.map((developer) => (
          <div
            key={developer.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-3">
              <img
                src={developer.avatar}
                alt={developer.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900">{developer.name}</h3>
                <p className="text-sm text-gray-500">{developer.role}</p>
              </div>
            </div>
            <button
              onClick={() => onRemoveDeveloper(developer.id)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevelopersList;