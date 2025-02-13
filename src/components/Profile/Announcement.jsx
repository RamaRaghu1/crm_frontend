import React from "react";
import { AlertCircle, MessageSquare } from "lucide-react";
import { useGetAllAnnouncementQuery } from "../../redux/features/announcement/announcementApi";
const Announcement = () => {
  const { data: announcements } = useGetAllAnnouncementQuery();
  // const announcements=[
  //     {
  //       id: '1',
  //       title: 'Office Notice',
  //       content: ' it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
  //       date: '2024-03-15',
  //       priority: 'high',
  //       author: 'HR Department'
  //     },
  //     {
  //       id: '2',
  //       title: 'New Project Launch',
  //       content: ' it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
  //       date: '2024-03-16',
  //       priority: 'medium',
  //       author: 'Project Management'
  //     }
  //   ];

  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Announcements</h2>
      <div className="space-y-3">
        {announcements?.data && announcements.data.length > 0 ? (
          announcements?.data?.map((announcement) => (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-900">
                    {announcement.title}
                  </h3>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    priorityColors[announcement.priority]
                  }`}
                >
                  {announcement.priority}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {announcement.content}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>{announcement.author}</span>
                <span>{new Date(announcement.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No new announcement this month</p>
        )}
      </div>
    </div>
  );
};

export default Announcement;
