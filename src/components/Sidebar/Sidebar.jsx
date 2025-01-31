import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Settings, Users, BarChart2, HelpCircle,LogOut,Calendar,BookUser ,Mail  } from 'lucide-react';
import NavItem from './NavItem';
import logo from "../../assets/logo.jpeg"
import userImg from "../../assets/user.png";
import { useNavigate } from 'react-router-dom';
import { useLogOutQuery } from '../../redux/features/api/auth/authApi.js';
import toast from 'react-hot-toast';



export  const Sidebar=({data})=> {


  console.log("data__________", data)

  const navigate=useNavigate();
  const [logOut, setLogOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
 
  const { refetch, data:logoutData, isSuccess } = useLogOutQuery(undefined, {
    skip: !logOut,
  });
 

  useEffect(() => {
    if (logOut) {
      refetch().then(() => {
     
      }).catch((error) => {
        console.error("Error logging out:", error);
      }).finally(() => {
        setLogOut(false);
      });
    }
  }, [logOut, refetch]);

console.log("sideDa",data)
// const { email, name, _id } = data;
useEffect(()=>{
  if(isSuccess && logoutData.success==true){
    toast.success("Logged out successfully!")
    navigate("/login")
  }
},[isSuccess, logoutData])

const navigation = [
  { name: 'Dashboard', icon: Home, href: '/' },
  { name: 'Project', icon: BarChart2, href: `/project-management/${data?._id}` },
  { name: 'Task', icon: Users, href: `/tasks/${data?._id}` },
  { name: 'Leave', icon: Settings, href: `/applied-leaves/${data?._id}` },
  
  


];


if (data?.isAdmin) {
 
  navigation.push({ name: 'Manage Team', icon: BookUser, href: '/team' });
  navigation.push({ name: 'Send Mail', icon: Mail, href: '/send-mail' });
}

navigation.push(  { name: 'Logout', icon: LogOut , href: '#' });
 const logOutHandler=()=>{
  console.log("jkhgftuh")
  setLogOut(true);

}

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open sidebar</span>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-gray-50">
            {/* <span className="text-xl font-bold text-gray-800">Your Logo</span> */}
            <img src={logo} className='w-16 h-14'/>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) =>
              item.name === 'Logout' ? (
                <NavItem
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  onClick={logOutHandler} 
                />
              ) : (
                <NavItem
                  key={item.name}
                  name={item.name}
                  href={item.href}
                  icon={item.icon}
                />
              )
            )}
          </nav>

          {/* Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center cursor-pointer" onClick={()=>navigate(`/profile/${data?._id}`)}>
              <img
                src={ userImg}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{data?.name}</p>
                <p className="text-xs text-gray-500">{data?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

