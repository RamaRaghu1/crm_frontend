import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import FormSection from "../components/UpdateProfile/FormSection";
import FormField from "../components/UpdateProfile/FormField";
import { useAddAnnouncementMutation, useDeleteAnnouncementMutation, useUpdateAnnouncementMutation } from "../redux/features/announcement/announcementApi";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";





const Announcement = ({isEdit, selectedAnnouncement, id}) => {
  const {data:userData}=useLoadUserQuery();
const[addannouncement, {isSuccess, error, data}]=useAddAnnouncementMutation();
const[updateannouncement, {isSuccess:updateSuccess, error:updateError, data:updateData}]=useUpdateAnnouncementMutation();
const navigate=useNavigate();
    const [announcementData, setannouncementData] = useState({
        title: "",
        priority: "",
        date: "",
        content: "",
        author:"",
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setannouncementData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleSubmit=async(e)=>{
        e.preventDefault();
        if(isEdit){
          await updateannouncement({id,data:announcementData })
        }else{
          await addannouncement(announcementData)
        }
       
      }
 useEffect(() => {
    if (isEdit && selectedAnnouncement) {
      setannouncementData(selectedAnnouncement);
    }
  }, [isEdit, selectedAnnouncement]);


  useEffect(()=>{

    if (isSuccess && data.success) {
      toast.success(data.message);
      
      navigate("/all-announcements");
    }

    if (error) {
      const errorMessage = error;
      toast.error(errorMessage?.data?.message);
    }
  },[isSuccess, error])


  useEffect(()=>{

    if (updateSuccess && updateData.success) {
      toast.success(updateData.message);
      
      navigate("/all-announcements");
    }

    if (updateError) {
      const errorMessage = updateError;
      toast.error(errorMessage?.updateData?.message);
    }
  },[updateSuccess, updateError])

  return (
      <div className="min-h-screen bg-gray-100">
            <Sidebar data={userData.data}/>
            <main className="lg:ml-64 min-h-screen p-8">
              <main className="main-content">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto py-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-900">
                        Announcement Details
                      </h1>
                    </div>
                  </div>
    
                  <FormSection title="Announcement Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Title"
                        name="title"
                        type="text"
                        value={announcementData.title}
                        onChange={handleChange}
                        required
                      />
                      <FormField
                        label="Content"
                        name="content"
                        type="text"
                        value={announcementData.content}
                        onChange={handleChange}
                        required
                      />
    
                      <FormField
                        label="Priority"
                        name="priority"
                        value={announcementData.priority}
                        onChange={handleChange}
                        component="select"
                        options={["High", "Medium", "Low"]}
                        required
                      />
                      <FormField
                        label="Date"
                        name="date"
                        type="date"
                        value={announcementData.date?.split("T")[0]}
                        onChange={handleChange}
                        required
                      />
                       <FormField
                        label="Author"
                        name="author"
                        type="text"
                        value={announcementData.author}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </FormSection>
    
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {/* <Save className="w-4 h-4 mr-2" /> */}
                      Add Announcement
                    </button>
                  </div>
                </form>
              </main>
            </main>
          </div>
  )
}

export default Announcement
