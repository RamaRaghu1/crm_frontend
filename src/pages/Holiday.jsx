import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import FormSection from "../components/UpdateProfile/FormSection";
import FormField from "../components/UpdateProfile/FormField";
import {
  useAddHolidayMutation,
  useEditHolidayMutation,
  useDeleteHolidayMutation,
} from "../redux/features/holiday/holidayApi";
const Holiday = () => {
  const [holidayData, setHolidayData] = useState({
    name: "",
    type: "",
    date: "",
    description: "",
  });
  const [addHoliday, { error, isSuccess }] = useAddHolidayMutation();
  const [deleteHoliday, { error: deleteError, isSuccess: deleteSuccess }] =
    useDeleteHolidayMutation();
  const [editHoliday, { error: editError, isSuccess: editSuccess }] =
    useEditHolidayMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHolidayData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await addHoliday(holidayData)
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <main className="lg:ml-64 min-h-screen p-8">
          <main className="main-content">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto py-8">
              <div className="flex items-center space-x-4 mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Holiday Details
                  </h1>
                </div>
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
                  {/* <Save className="w-4 h-4 mr-2" /> */}
                  Save Changes
                </button>
              </div>
            </form>
          </main>
        </main>
      </div>
    </>
  );
};

export default Holiday;
