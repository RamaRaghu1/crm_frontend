import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import FormSection from "../components/UpdateProfile/FormSection";
import FormField from "../components/UpdateProfile/FormField";
import {
  useAddHolidayMutation,
  useEditHolidayMutation,
  useDeleteHolidayMutation,
} from "../redux/features/holiday/holidayApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";

const Holiday = ({ isEdit, existingHoliday, id }) => {
const {data:userData}=useLoadUserQuery();
  console.log("new",existingHoliday)
  const [holidayData, setHolidayData] = useState({
    name: "",
    type: "",
    date: "",
    description: "",
  });
  const navigate=useNavigate();

  useEffect(() => {
    if (isEdit && existingHoliday) {
      setHolidayData(existingHoliday);
    }
  }, [isEdit, existingHoliday]);

  const [addHoliday, {isSuccess, error, data}] = useAddHolidayMutation();
  const [editHoliday, {isSuccess:editSuccess, error:editError, data:editData}] = useEditHolidayMutation();


  useEffect(()=>{

    if (isSuccess && data.success) {
      toast.success(data.message);
      
      navigate("/all-holiday");
    }

    if (editError) {
      const errorMessage = editError;
      toast.error(errorMessage?.data?.message);
    }
  },[isSuccess, editError])


  useEffect(()=>{

    if (editSuccess && editData.success) {
      toast.success(editData.message);
      
      navigate("/all-holiday");
    }

    if (error) {
      const errorMessage = error;
      toast.error(errorMessage?.editData?.message);
    }
  },[editSuccess, error])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHolidayData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await editHoliday({id, data:holidayData});
    } else {
      await addHoliday(holidayData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar data={userData?.data}/>
      <main className="lg:ml-64 min-h-screen p-8">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto py-8">
          <div className="flex items-center space-x-4 mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              {isEdit ? "Edit Holiday" : "Add Holiday"}
            </h1>
          </div>

          <FormSection title="Holiday Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Name"
                name="name"
                type="text"
                value={holidayData.name}
                onChange={handleChange}
                required
              />
              <FormField
                label="Description"
                name="description"
                type="text"
                value={holidayData.description}
                onChange={handleChange}
                required
              />

              <FormField
                label="Type"
                name="type"
                value={holidayData.type}
                onChange={handleChange}
                component="select"
                options={["Public Holiday", "Optional Holiday"]}
                required
              />
              <FormField
                label="Date"
                name="date"
                type="date"
                value={holidayData.date?.split("T")[0]}
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
              {isEdit ? "Update Holiday" : "Save Holiday"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Holiday;
