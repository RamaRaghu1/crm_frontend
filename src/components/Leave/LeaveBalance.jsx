import React, { useEffect, useState } from 'react';
import { Clock, Calendar, Battery } from 'lucide-react';
import './LeaveBalance.css';
import { useGetLeaveSummaryQuery } from '../../redux/features/leave/leaveApi';
import { useParams } from 'react-router-dom';

const LeaveBalance = () => {
  const [leaveData, setLeaveData] = useState([]);
  const { id } = useParams();
  const { isSuccess, error, data } = useGetLeaveSummaryQuery(id);

  useEffect(() => {
    if (isSuccess && data.success) {
      setLeaveData(data.data.leaveSummary);
    }
  }, [isSuccess, data]);



  // Default leave types
  const leaveTypes = [
    { type: 'Casual Leave', days: 7, used: 0, icon: Calendar, id: 'casual-leave' },
    { type: 'Sick Leave', days: 5, used: 0, icon: Clock, id: 'sick-leave' },
    { type: 'Unpaid Leave', days: 15, used: 0, icon: Battery, id: 'unpaid-leave' },
  ];

  // Create a map of leave data for easy lookup
  const leaveUsageMap = leaveData.reduce((acc, leave) => {
    acc[leave._id] = leave.count;
    return acc;
  }, {});

  return (
    <div className="leave-balance">
      {leaveTypes.map(({ type, days, icon: Icon, id }) => {
        const used = leaveUsageMap[id] || 0; // Get used leave from API data
        return (
          <div key={type} className="balance-card">
            <div className="card-header">
              <div className="leave-type">
                <Icon className="leave-type-icon" size={20} />
                <h3 className="leave-type-text">{type}</h3>
              </div>
              <span className="remaining-badge">
                {days - used} remaining
              </span>
            </div>
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(used / days) * 100}%` }}
                />
              </div>
              <p className="progress-text">
                {used} of {days} days used
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaveBalance;
