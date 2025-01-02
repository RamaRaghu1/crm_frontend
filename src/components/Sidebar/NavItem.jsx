import React from 'react';
import { Link } from 'react-router-dom';




export default function NavItem({ name, href, icon: Icon, onClick }) {
  return (
    <Link
      to={href}
      className="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
    onClick={onClick}
    >
      <Icon className="w-5 h-5" />
      <span className="ml-3">{name}</span>
    </Link>
  );
}