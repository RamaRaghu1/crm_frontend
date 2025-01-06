import React, { useState,useEffect } from 'react'
import Holidays from '../components/Profile/Holidays'
import Announcement from '../components/Profile/Announcement'
import Sidebar from '../components/Sidebar/Sidebar'
import { useLoadUserQuery } from '../redux/features/api/apiSlice'
import GreetingCard from '../components/Profile/GreetingCard'
import Menu from "../components/Profile/Menu"

const Dashboard = () => {

    const [data, setData]=useState({});
    const {data:userData ,isSuccess}=useLoadUserQuery();

    useEffect(() => {
        if (isSuccess && userData.success === true) {
          setData(userData.data);
        }
      }, [isSuccess]);
    

      console.log("newwwwww",userData)


  return (
    <div className="min-h-screen bg-gray-100">
    <Sidebar data={data}/>
    <main className="lg:ml-64 min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <GreetingCard name={data?.name} />
        <Menu  user={data}/>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
           <Holidays/>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
           <Announcement/>
          </div>
        </div>
      </div>
    </main>
  </div>
  )
}

export default Dashboard
