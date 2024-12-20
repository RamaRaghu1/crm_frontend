import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   eachDayOfInterval,
//   isSameMonth,
//   isSameDay,
//   addMonths,
//   subMonths,
// } from 'date-fns';



const eventColors = {
  present: 'bg-green-100 text-green-800',
  absent: 'bg-red-100 text-red-800',
  holiday: 'bg-blue-100 text-blue-800',
  leave: 'bg-yellow-100 text-yellow-800',
};

export function Calendar({ events }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getEventForDay = (day) => 
    events.find(event => isSameDay(event.date, day));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Attendance Calendar</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-medium">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
        
        {days.map(day => {
          const event = getEventForDay(day);
          return (
            <div
              key={day.toISOString()}
              className={`
                p-2 text-center relative
                ${!isSameMonth(day, currentDate) ? 'text-gray-400' : ''}
                ${event ? eventColors[event.type] : ''}
              `}
            >
              <span className="text-sm">{format(day, 'd')}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex gap-4 justify-end">
        {Object.entries(eventColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <span className="text-sm text-gray-600 capitalize">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}