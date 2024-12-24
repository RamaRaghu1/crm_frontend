import React from 'react';
import DevelopersList from '../components/Project/DevelopersList';
import TasksAccordion from '../components/Project/TasksAccordion';
import ProjectHeader from '../components/Project/ProjectHeader';
import { useGetProjectByIdQuery } from '../redux/features/project/projectApi';
import { useParams } from 'react-router-dom';

const mockProject = {
  id: '1',
  name: 'E-commerce Platform Redesign',
  description: 'Modernizing the user interface and improving the shopping experience',
  startDate: '2024-03-01',
  endDate: '2024-06-30',
  developers: [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Lead Developer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Frontend Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
  ],
  tasks: [
    {
      id: '1',
      title: 'Design System Implementation',
      status: 'inprogress',
      assignedTo: {
        id: '1',
        name: 'Sarah Johnson',
        role: 'Lead Developer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      },
    },
    {
      id: '2',
      title: 'User Authentication Flow',
      status: 'completed',
      assignedTo: {
        id: '2',
        name: 'Michael Chen',
        role: 'Frontend Developer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      },
    },
    {
      id: '3',
      title: 'Shopping Cart Implementation',
      status: 'todo',
    },
  ],
};

const ProjectDetails= () => {
    const {id}=useParams();
const {data}=useGetProjectByIdQuery(id);
    console.log("det", data)
  const handleEditProject = () => {
    console.log('Edit project clicked');
  };

  const handleAddDeveloper = () => {
    console.log('Add developer clicked');
  };

  const handleRemoveDeveloper = (id) => {
    console.log('Remove developer clicked', id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ProjectHeader project={mockProject} onEdit={handleEditProject} />
      <DevelopersList
        developers={mockProject.developers}
        onAddDeveloper={handleAddDeveloper}
        onRemoveDeveloper={handleRemoveDeveloper}
      />
      <TasksAccordion tasks={mockProject.tasks} />
    </div>
  );
};

export default ProjectDetails;