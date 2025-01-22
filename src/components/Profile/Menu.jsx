import React from "react";
import { Mail ,FileText, House, Users,SquareKanban ,CalendarDays,ListTodo  } from "lucide-react";
import {Link} from "react-router-dom"

const Menu = ({user}) => {

  const admindata = [
    { label: "Employee", count: 4, color: "bg-blue-400", icon: <Users/>, src:"/users"},
    { label: "Attendance", count: 3, color: "bg-yellow-400", icon: <House/> , src:"/attendance"},
    { label: "Leave Requests", count: 2, color: "bg-green-400", icon: <Mail/>, src:"/pending-leaves" },
    { label: "Projects", count: 2, color: "bg-red-400", icon:<FileText /> , src:`/project-management/${user?._id}`}
  ];

  const userdata = [
    { label: "Project", count: 4, color: "bg-blue-400", icon: <SquareKanban />, src:`/project-management/${user?._id}`},
    { label: "Task", count: 3, color: "bg-yellow-400", icon: <ListTodo /> , src:`/tasks/${user?._id}`},
    { label: "Leave", count: 2, color: "bg-green-400", icon: <Mail/>, src:`/applied-leaves/${user?._id}` },
    { label: "Calendar", count: 2, color: "bg-red-400", icon:<CalendarDays /> , src:""},
  ];
  const data = (user?.isSuperUser|| user?.isAdmin) ? admindata : userdata;
  return (
    <div className="flex  items-center ">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-6 w-full ">

       
        {data.map((item, index) => (
        <Link to={item?.src}>
        
        <div
            key={index}
            className={`${item.color} flex cursor-pointer  flex-col items-center justify-center p-6 rounded-lg shadow-lg text-white`}
          >
            <div className="text-4xl">{item.icon}</div>
            <div className="text-lg font-bold mt-2">{item.label}</div>
           
          </div></Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
