import React from 'react'
import {Sun,Moon, Coffee, Sunrise} from "lucide-react"

const GreetingCard = ({name}) => {
    const getTimeBasedGreeting = () => {
        const hour = new Date().getHours();
        
        if (hour < 12) {
          return {
            greeting: 'Good Morning',
            message: 'Start your day with a smile!',
            Icon: Sunrise,
            bgColor: 'from-orange-100 to-yellow-100',
            iconColor: 'text-orange-500',
          };
        } else if (hour < 17) {
          return {
            greeting: 'Good Afternoon',
            message: 'Hope you\'re having a productive day!',
            Icon: Sun,
            bgColor: 'from-blue-50 to-indigo-50',
            iconColor: 'text-blue-500',
          };
        } else if (hour < 20) {
          return {
            greeting: 'Good Evening',
            message: 'Time to wrap up for the day!',
            Icon: Coffee,
            bgColor: 'from-purple-50 to-pink-50',
            iconColor: 'text-purple-500',
          };
        } else {
          return {
            greeting: 'Good Night',
            message: 'Have a peaceful evening!',
            Icon: Moon,
            bgColor: 'from-indigo-50 to-purple-50',
            iconColor: 'text-indigo-500',
          };
        }
      };
    
      const { greeting, message, Icon, bgColor, iconColor } = getTimeBasedGreeting();
    
      return (
        <div className={`rounded-lg p-6 bg-gradient-to-br ${bgColor} border border-gray-100 shadow-sm`}>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-800">
                {greeting}, {name}!
              </h2>
              <p className="text-gray-600">{message}</p>
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <Icon className={`w-8 h-8 ${iconColor}`} />
          </div>
        </div>
      )
}

export default GreetingCard
