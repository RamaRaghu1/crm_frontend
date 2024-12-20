import React from 'react';
import { Clock, Calendar, Battery } from 'lucide-react';
import './LeaveBalance.css';

const LeaveBalance = () => {
  const leaveTypes = [
    { type: 'Casual Leave', days: 5, used: 5, icon: Calendar },
    { type: 'Sick Leave', days: 7, used: 2, icon: Clock },
    { type: 'Unpaid Leave', days: 15, used: 1, icon: Battery },
  ];

  return (
    <div className="leave-balance">
      {leaveTypes.map(({ type, days, used, icon: Icon }) => (
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
      ))}
    </div>
  );
};

export default LeaveBalance;