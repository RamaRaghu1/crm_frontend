import React from 'react'
import { Calendar } from 'lucide-react'
const Holidays = () => {

    const holidays = [
        {
          id: '1',
          name: 'Memorial Day',
          date: '2024-05-27',
          description: ' it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
         
        },
        {
          id: '2',
          name: 'Independence Day',
          date: '2024-07-04',
          description: ' it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
         
        }
      ];


    //   const typeColors = {
    //     federal: 'bg-purple-100 text-purple-800',
    //     state: 'bg-blue-100 text-blue-800',
    //     optional: 'bg-gray-100 text-gray-800',
    //   };
    
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        });
      };

  return (


    <div className="space-y-4">
    <h2 className="text-lg font-medium text-gray-900">Upcoming Holidays</h2>
    <div className="space-y-3">
      {holidays.map((holiday) => (
        (
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{holiday.name}</p>
                {/* <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    typeColors[holiday.type]
                  }`}
                >
                  {holiday.type}
                </span> */}
              </div>
              <p className="text-sm text-gray-500 mt-1">{formatDate(holiday.date)}</p>
              {holiday.description && (
                <p className="text-sm text-gray-600 mt-2">{holiday.description}</p>
              )}
            </div>
          </div>
        )
      ))}
    </div>
  </div>


  
);
}

export default Holidays
