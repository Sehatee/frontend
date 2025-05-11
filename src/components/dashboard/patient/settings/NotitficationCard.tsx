import React from "react";
import { Bell } from "lucide-react";

type NotificationCardProps = {
  title: string;
  description: string;
  time?: string;
  isRead?: boolean;
};

const NotitficationCard = ({
  title,
  description,
  time,
  isRead = false,
}: NotificationCardProps) => {
  return (
    <div
      className={`p-4 border rounded-lg ${isRead ? "bg-gray-50" : "bg-white"}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`p-2 rounded-full ${
            isRead ? "bg-gray-100" : "bg-blue-50"
          }`}
        >
          <Bell
            className={`w-5 h-5 ${isRead ? "text-gray-600" : "text-main"}`}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          {time && (
            <span className="text-xs text-gray-500 mt-2 block">{time}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotitficationCard;
