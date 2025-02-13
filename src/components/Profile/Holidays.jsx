import React, {useState} from 'react';
import { Calendar } from 'lucide-react';
import {  useGetAllHolidayQuery } from '../../redux/features/holiday/holidayApi';


const Holidays = () => {
  const { data: holiday } = useGetAllHolidayQuery();


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get the current month
  const currentMonth = new Date().getMonth();

  // Filter holidays for the current month
  const currentMonthHolidays = holiday?.data.filter((holiday) => {
    const holidayMonth = new Date(holiday.date).getMonth();
    return holidayMonth === currentMonth;
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Upcoming Holidays</h2>
      <div className="space-y-3">
        {currentMonthHolidays && currentMonthHolidays.length > 0 ? (
          currentMonthHolidays.map((holiday) => (
            <div key={holiday._id} className="bg-white rounded-lg shadow-sm p-4 flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{holiday.name}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-purple-100 text-purple-800">
                    {holiday.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{formatDate(holiday.date)}</p>
                {holiday.description && <p className="text-sm text-gray-600 mt-2">{holiday.description}</p>}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No holidays this month.</p>
        )}
      </div>







    </div>
  );
};

export default Holidays;
