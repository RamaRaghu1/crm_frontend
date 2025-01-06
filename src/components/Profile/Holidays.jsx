import React from 'react'
import { Calendar } from 'lucide-react'
const Holidays = () => {

    const holidays = [
        {
          id: '1',
          name: 'Pongal',
          type:"Public Holiday",
          date: '2025-01-14',
          description: 'A harvest festival celebrated with enthusiasm, marking gratitude for the agricultural bounty.',
         
        },
        {
          id: '2',
          type:"Public Holiday",
          name: 'Thiruvalluar Day',
          date: '2025-01-15',
          description: 'A day to honor the revered Tamil poet and philosopher, Thiruvalluvar.',         
        },
        {
          id: '3',
          type:"Public Holiday",
          name: 'Republic Day',
          date: '2025-01-26',
          description: 'Commemorates the adoption of the Indian Constitution and celebrates national pride.',         
        },
        {
          id: '4',
          type:"Public Holiday",
          name: 'Ramzan',
          date: '2025-03-31',
          description: 'A significant religious observance for Muslims, marking the end of fasting during the holy month of Ramadan.',         
        },
        {
          id: '5',
          type:"Public Holiday",
          name: 'May Day',
          date: '2025-05-01',
          description: 'A day dedicated to workers\' rights and celebrating the labor movement.',         
        },
        {
          id: '6',
          type:"Public Holiday",
          name: 'Independence Day',
          date: '2025-08-05',
          description: 'A national holiday honoring the courage and sacrifices that led to India’s freedom from British colonial rule on August 15, 1947.',         
        },
        {
          id: '7',
          type:"Public Holiday",
          name: 'Vinayakar Chathurthi',
          date: '2025-08-27',
          description: 'A Hindu festival dedicated to the worship of Lord Ganesha.',         
        },
        {
          id: '8',
          type:"Public Holiday",
          name: 'Ayutha Pooja',
          date: '2025-10-01',
          description: 'A festival that honors tools, instruments, and machinery, symbolizing the importance of work.',         
        },
        {
          id: '9',
          type:"Public Holiday",
          name: 'Gandhi Jayanthi',
          date: '2025-10-02',
          description: 'Marks the birth of Mahatma Gandhi, India’s Father of the Nation.',         
        },
        {
          id: '10',
          type:"Public Holiday",
          name: 'Deepavali',
          date: '2025-10-20',
          description: 'A joyous festival that symbolizes the triumph of light over darkness and good over evil, celebrated with vibrant lights and festive spirit.',         
        },
        {
          id: '11',
          type:"Public Holiday",
          name: 'Christmas',
          date: '2025-12-25',
          description: 'A religious and cultural celebration honoring the birth of Jesus Christ, observed on December 25.',         
        },
      ];




  
    
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
  const currentMonthHolidays = holidays.filter(holiday => {
    const holidayMonth = new Date(holiday.date).getMonth();
    return holidayMonth === currentMonth;
  });

  return (


    <div className="space-y-4">
    <h2 className="text-lg font-medium text-gray-900">Upcoming Holidays</h2>
    <div className="space-y-3">
      {currentMonthHolidays.map((holiday) => (
        (
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{holiday.name}</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-purple-100 text-purple-800
                  `}
                >
                  {holiday.type}
                </span>
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
