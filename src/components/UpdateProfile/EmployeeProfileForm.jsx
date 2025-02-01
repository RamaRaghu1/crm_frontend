import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Sidebar } from "../Sidebar/Sidebar";
import FormSection from "./FormSection";
import FormField from "./FormField";
import { useGetUserByIdQuery } from "../../redux/features/user/userApi";
import { User } from "lucide-react";
import { useUpdateProfileMutation } from "../../redux/features/user/userApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import LeaveBalance from "../Leave/LeaveBalance";

export default function EmployeeProfileForm() {
  const { id } = useParams();
 const {data}=useLoadUserQuery();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const { data: userData, isSuccess } = useGetUserByIdQuery(id);
  const navigate = useNavigate();
  const [
    UpdateProfile,
    { isSuccess: updateSuccess, data: updateData, error: updateError },
  ] = useUpdateProfileMutation();

  useEffect(() => {
    if (isSuccess && userData.success) {
     
      setFormData(userData?.data);
    }
  }, [isSuccess]);

  console.log("form", userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const keys = name.split(".");
      if (keys.length === 1) {
        return { ...prev, [keys[0]]: value };
      } else {
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: value,
          },
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    await UpdateProfile({ id, formData });
  };

  console.log("formsfsa", formData);
  useEffect(() => {
    if (updateSuccess && updateData.success) {
      toast.success(updateData.message);
    location.reload()
      // navigate(`/profile/${id}`);
    }
  }, [updateSuccess, updateData]);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Sidebar data={data?.data} />
        <main className="lg:ml-64 min-h-screen p-8">
          <div className="app">
          <div>
                    <h1 className="text-2xl font-semibold text-gray-900 p-4">
                      Leave Summary
                    </h1>
                 
                  </div>
          <LeaveBalance/>
            <main className="main-content">
              <form onSubmit={handleSubmit} className="max-w-3xl mx-auto py-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    {/* <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm border border-gray-200">
      <User className="w-4 h-4 text-gray-500" />
    </button> */}
                  </div>
                  
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      Update Profile
                    </h1>
                    <p className="text-sm text-gray-500">
                      Keep your profile information up to date
                    </p>
                  </div>
                </div>

                <FormSection title="Personal Information">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      error={errors.name}
                    />
                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      error={errors.email}
                    />
                    <FormField
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      error={errors.phone}
                    />
                    <FormField
                      label="Gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      component="select"
                      options={["Male", "Female", "Other"]}
                      required
                      error={errors.gender}
                    />
                    <FormField
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth?.split("T")[0]}
                      onChange={handleChange}
                      required
                      error={errors.dateOfBirth}
                    />
                  </div>
                </FormSection>

                <FormSection title="Employment Details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Department"
                      name="team"
                       
                      value={formData.team}
                      onChange={handleChange}
                      required
                      component="select"
                      options={[
                        "Others",
                        "Management",
                        "Digital Marketing",
                        "Support",
                        "Tech",
                      ]}
                    />
                    <FormField
                      label="Branch"
                      name="branch"
                       
                      value={formData.branch}
                      onChange={handleChange}
                      component="select"
                      options={[
                        "Chennai",
                        "Madurai",
                        "Trichy",
                        "Salem",
                        "Tirunelveli",
                        "Coimbatore",
                        "Vellore",
                      ]}
                      required
                    />
                    <FormField
                      label="Position"
                      name="position"
                       
                      value={formData.position}
                      onChange={handleChange}
                      required
                    />
                    <FormField
                      label="Join Date"
                      name="joiningDate"
                      type="date"
                      value={formData?.joiningDate?.split("T")[0]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </FormSection>

                <FormSection title="Address">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <FormField
                        label="Street Address"
                        name="address.street"
                        value={formData?.address?.street}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <FormField
                      label="City"
                      name="address.city"
                      value={formData?.address?.city}
                      onChange={handleChange}
                      required
                    />
                    <FormField
                      label="State"
                      name="address.state"
                      value={formData?.address?.state}
                      onChange={handleChange}
                      required
                    />
                    <FormField
                      label="ZIP Code"
                      name="address.zipCode"
                      value={formData?.address?.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </FormSection>
                <FormSection title="Emergency Contact">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Full Name"
                      name="emergencyContactName"
                      value={formData?.emergencyContactName}
                      onChange={handleChange}
                      required
                    />
                    <FormField
                      label="Contact Number"
                      name="emergencyContactNumber"
                      value={formData?.emergencyContactNumber}
                      onChange={handleChange}
                      required
                    />

                    <FormField
                      label="Relationship to Employee"
                      name="emergencyContactRelation"
                      value={formData?.emergencyContactRelation}
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
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </main>
          </div>
        </main>
      </div>
    </>
  );
}
