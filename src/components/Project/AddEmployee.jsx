import React, { useEffect, useState } from "react";
import { styles } from "../../styles/style.js";
import { useAddUserMutation } from "../../redux/features/user/userApi.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AddEmployee = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [addUser, { isLoading, isSuccess, data, error }] = useAddUserMutation();
  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    email: "",
    position: "",
    team: "",
    branch: "",
    joiningDate: selectedDate,
    isSuperUser: false,
    password: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelation: "",
    salary: "",
    employmentStatus: "Active",
    phone: "",
    dateOfBirth: "",
    gender:"",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(employeeInfo);
    await addUser(employeeInfo);
  };

  useEffect(() => {
    if (isSuccess && data.success) {
      toast.success(data.message);
      navigate("/users");
    }

    if (error) {
      const errorMessage = error;
      toast.error(errorMessage?.data?.message);
    }
  }, [isSuccess, data, error]);
  const branches = [
    "Chennai",
    "Madurai",
    "Trichy",
    "Salem",
    "Tirunelveli",
    "Coimbatore",
    "Vellore",
  ];
  return (
    <div className=" w-[70%] mx-auto my-10">
      <h2 className="font-bold text-3xl  text-blue-600 my-5">
        Employee Details
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className={`${styles.label} text-start`}>
            Employee Name
          </label>
          <input
            type="text"
            id="name"
            required
            name=""
            placeholder="Enter eployee name"
            value={employeeInfo.name}
            className={`${styles.input}`}
            onChange={(e) =>
              setEmployeeInfo({ ...employeeInfo, name: e.target.value })
            }
          />
        </div>
        <br />

        <div>
          <label htmlFor="title" className={`${styles.label} text-start`}>
            Employee Email
          </label>
          <input
            type="email"
            id="email"
            required
            name=""
            placeholder="Enter eployee email"
            value={employeeInfo.email}
            className={`${styles.input}`}
            onChange={(e) =>
              setEmployeeInfo({ ...employeeInfo, email: e.target.value })
            }
          />
        </div>
        <br />
        <div>
          <label htmlFor="password" className={`${styles.label} text-start`}>
            Password
          </label>
          <input
            type="text"
            id="password"
            required
            name=""
            placeholder="Enter eployee email"
            value={employeeInfo.password}
            className={`${styles.input}`}
            onChange={(e) =>
              setEmployeeInfo({ ...employeeInfo, password: e.target.value })
            }
          />
        </div>
        <br />

        <div className="flex justify-between">
          <div>
            <label htmlFor="position" className={`${styles.label} text-start`}>
              Position
            </label>
            <input
              type="text"
              id="position"
              required
              name=""
              placeholder="Enter eployee position"
              value={employeeInfo.position}
              className={`${styles.input}`}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, position: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="employmentStatus"
              className={`${styles.label} text-start`}
            >
              Employment Status
            </label>
            <select
              id="employmentStatus"
              value={employeeInfo.employmentStatus}
              className={`${styles.input}`}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  employmentStatus: e.target.value,
                })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
       

          <div>
            <label htmlFor="phone" className={`${styles.label} text-start`}>
              Phone
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter phone number"
              value={employeeInfo.phone}
              className={`${styles.input}`}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, phone: e.target.value })
              }
            />
          </div>

        
        </div>
        <br />
        <div className="flex justify-between">
          <label className={`${styles.label}`} htmlFor="team">
            Team
            <select
              className={`${styles.input}`}
              name="team"
              id="team"
              value={employeeInfo.team}
              onChange={(e) => {
                setEmployeeInfo({ ...employeeInfo, team: e.target.value });
              }}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Tech">Tech</option>
              <option value="Support">Support</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Management">Management</option>

              <option value="Others">Others</option>
            </select>
          </label>
          <label className={`${styles.label}`} htmlFor="branch">
            Branch
            <select
              className={`${styles.input}`}
              name="branch"
              id="branch"
              value={employeeInfo.branch}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, branch: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select
              </option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </label>
          <div>
            <label htmlFor="joiningDate" className={`${styles.label}`}>
              Joining Date
            </label>
            <input
              type="date"
              id="joiningDate"
              required
              name=""
              value={selectedDate}
              className={`${styles.input} `}
              onChange={(e) =>
                // setEventInfo({ ...employeeInfo, joiningDate: e.target.value })
                setSelectedDate(e.target.value)
              }
            />
          </div>
        </div>
        <br />
        <div className="flex justify-between">
          <div>
            <label htmlFor="salary" className={`${styles.label} text-start`}>
              Salary
            </label>
            <input
              type="number"
              id="salary"
              placeholder="Enter salary"
              value={employeeInfo.salary}
              className={`${styles.input}`}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, salary: e.target.value })
              }
            />
          </div>
          <br />

          <div>
            <label htmlFor="gender" className={`${styles.label} text-start`}>
              Gender
            </label>
            <select
              className={`${styles.input}`}
              name="gender"
              id="gender"
              value={employeeInfo.gender}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, gender: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <br />

          <div>
            <label
              htmlFor="dateOfBirth"
              className={`${styles.label} text-start`}
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={employeeInfo.dateOfBirth}
              className={`${styles.input}`}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  dateOfBirth: e.target.value,
                })
              }
            />
          </div>
        </div>

        <br />
        <div>
          <label htmlFor="address" className={`${styles.label} text-start`}>
            Address
          </label>
          <input
            type="text"
            placeholder="Street"
            value={employeeInfo.address.street}
            className={`${styles.input}`}
            onChange={(e) =>
              setEmployeeInfo({
                ...employeeInfo,
                address: { ...employeeInfo.address, street: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="City"
            value={employeeInfo.address.city}
            className={`${styles.input}`}
            onChange={(e) =>
              setEmployeeInfo({
                ...employeeInfo,
                address: { ...employeeInfo.address, city: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="State"
            value={employeeInfo.address.state}
            className={`${styles.input}`}
            onChange={(e) =>
              setEmployeeInfo({
                ...employeeInfo,
                address: { ...employeeInfo.address, state: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Zip Code"
            value={employeeInfo.address.zipCode}
            className={`${styles.input}`}
            onChange={(e) =>
              setEmployeeInfo({
                ...employeeInfo,
                address: { ...employeeInfo.address, zipCode: e.target.value },
              })
            }
          />
        </div>
        <br />

        <div>
          <label
            htmlFor="emergencyContact"
            className={`${styles.label} text-start`}
          >
            Emergency Contact
          </label>
          <input
            type="text"
            placeholder="Full Name"
            value={employeeInfo.emergencyContactName}
            className={`${styles.input}`}
            onChange={(e) =>
              setEmployeeInfo({
                ...employeeInfo,
                emergencyContactName: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Relationship to Employee"
            value={employeeInfo.emergencyContactRelation}
            className={`${styles.input}`}
            onChange={(e) =>
              setEmployeeInfo({
                ...employeeInfo,
                emergencyContactRelation: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={employeeInfo.emergencyContactNumber}
            className={`${styles.input}`}
            onChange={(e) =>
              setEmployeeInfo({
                ...employeeInfo,
                emergencyContactNumber: e.target.value,
              })
            }
          />
        </div>
        <br />

        <div className="items-center">
          <label
            htmlFor="position"
            className={`${styles.label} text-start pr-2`}
          >
            Admin rights?
          </label>
          <input
            className="cursor-pointer "
            type="checkbox"
            checked={employeeInfo.isSuperUser}
            onChange={() =>
              setEmployeeInfo({
                ...employeeInfo,
                isSuperUser: !employeeInfo.isSuperUser,
              })
            }
          />
        </div>

        <br />

        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Add Employee"
            className="w-fit px-3 h-[40px] font-bold bg-blue-500 text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
