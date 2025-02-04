import React, { useState, FormEvent, useEffect } from "react";
import { Calendar, FileText, AlertCircle, UserRound } from "lucide-react";
import "./LeaveForm.css";
import { useApplyLeaveMutation } from "../../redux/features/leave/leaveApi";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LeaveForm = () => {
  const navigate = useNavigate();
const initailLeave= {
  leaveType: "",
  startDate: "",
  endDate: "",
  leaveReason: "",
  leaveDuration: "",
}
  const [leaveDate, setLeaveDate] = useState([
   initailLeave]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveDate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [applyLeave, { isSuccess, error, data }] = useApplyLeaveMutation();
  const { data: userData, isSuccess: userDataSuccess, refetch } = useLoadUserQuery();

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message);
      navigate(`/applied-leaves/${userData?.data?._id}`);
    }

    if (error) {
      const errorMessage = error;
      toast.error(errorMessage.data.message);
    }
  }, [isSuccess, data, error]);


  
  useEffect(() => {
   refetch();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(leaveDate);
    await applyLeave({
      uid: userData?.data?._id,
      employeeName: userData?.data?.name,
      employeeId: userData?.data?.employeeId,
      branch: userData?.data?.branch,
      leaveDate,
    });
  };

  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit} className="leave-form">
        <div className="form-group">
          <div className="flex justify-between">
            <label className="form-label">
              Leave Type
              <select
              required
                name="leaveType"
                value={leaveDate.leaveType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="" defaultValue >Select</option>
                <option value="casual-leave">Casual Leave</option>
                <option value="sick-leave">Sick Leave</option>
                <option value="unpaid-leave">Unpaid Leave</option>
              </select>
            </label>

            <label className="form-label">
              Leave Duration
              <select
              required
                name="leaveDuration"
                value={leaveDate.leaveDuration}
                onChange={handleChange}
                className="form-select"
              >
                <option value="" defaultValue >Select</option>
                <option value="full-day">Full Day</option>
                <option value="half-day">Half Day</option>
              </select>
            </label>
          </div>
          <div className="date-inputs">
            <label className="form-label">
              Start Date
              <div className="input-wrapper">
                <input
                required
                  type="date"
                  name="startDate"
                  value={leaveDate.startDate}
                  onChange={handleChange}
                  className="date-input"
                />
                <Calendar className="input-icon" size={20} />
              </div>
            </label>

            <label className="form-label">
              End Date
              <div className="input-wrapper">
                <input
                required
                  type="date"
                  name="endDate"
                  value={leaveDate.endDate}
                  onChange={handleChange}
                  className="date-input"
                />
                <Calendar className="input-icon" size={20} />
              </div>
            </label>
          </div>

          <label className="form-label">
            Reason for Leave
            <div className="input-wrapper">
              <textarea
              required
                name="leaveReason"
                value={leaveDate.leaveReason}
                onChange={handleChange}
                className="textarea"
                placeholder="Please provide details about your leave request..."
              />
              <FileText className="input-icon" size={20} />
            </div>
          </label>
        </div>

        <div className="alert">
          <AlertCircle className="alert-icon" size={20} />
          <div className="alert-content">
            Your leave request will be sent to your supervisor for approval.
            Please ensure all information is accurate before submitting.
          </div>
        </div>

        <div className="form-actions">
          <button className="button button-secondary" onClick={()=>setLeaveDate(initailLeave)
          
          }>
            Cancel
          </button>
          <button type="submit" className="button button-primary">
            Apply Leave
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveForm;
