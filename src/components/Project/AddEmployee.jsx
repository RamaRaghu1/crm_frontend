import React, { useEffect, useState } from 'react';
import {styles} from "../../styles/style.js";
import { useAddUserMutation } from '../../redux/features/user/userApi.js';
import toast from 'react-hot-toast';

const AddEmployee = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
const [addUser, {isLoading,isSuccess,data, isError}]=useAddUserMutation();
const [employeeInfo, setEmployeeInfo]=useState({
    name:"",
    email:"",
    position:"",
    team:"",
    joiningDate:selectedDate,
    isSuperUser:false,
    password:""
})

const handleSubmit=async(e)=>{
    e.preventDefault();
    // console.log(employeeInfo)
    await addUser(employeeInfo)
}


useEffect(()=>{
    if(isSuccess && data.success===true){
        toast.success(data.message)
    }
})

  return (
    <div className=" w-[70%] mx-auto my-10">
    <h2 className="font-bold text-3xl  text-blue-600 my-5">Employee Details</h2>
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
      <div>
        <label htmlFor="position" className={`${styles.label} text-start`}>
          Position
        </label>
        <input
          type="position"
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
      <br />
      <div className='flex justify-between'>
    
      <label className={`${styles.label}`} htmlFor="team">
          Team
          <select
            className={`${styles.input}`}
            name="team"
            id="team"
            value={employeeInfo.team}
            onChange={(e)=>{
setEmployeeInfo({...employeeInfo, team: e.target.value})
            }}
            required
          >
            <option>Select</option>
            <option value="Tech">
              Tech
            </option>
            <option value="Support">
              Support
            </option>
            <option value="Digital Marketing">
              Digital Marketing
            </option>
            <option value="Management">
             Management
            </option>
          
            <option value="Others">Others</option>
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

      <div>
        <label htmlFor="position" className={`${styles.label} text-start`}>
          IsSuperUser
        </label>
        <input
              className="cursor-pointer"
                type="checkbox"
                checked={employeeInfo.isSuperUser}
                onChange={() =>
                    setEmployeeInfo({...employeeInfo, isSuperUser:!employeeInfo.isSuperUser})
                 }
              />
      </div>
  
    
      <br />

    
    

      <br />

      <div className="w-full flex items-center justify-end">
        <input
          type="submit"
          value="Create event"
          className="w-fit px-3 h-[40px] font-bold bg-blue-500 text-center text-[#fff] rounded mt-8 cursor-pointer"
        />
      </div>
    </form>
  </div>
  )
}

export default AddEmployee;
