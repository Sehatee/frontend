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
      className={`rounded-2xl border border-secondary p-5 ${
        isRead ? "bg-bg" : "bg-white shadow-sm"
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isRead ? "bg-secondary text-ft2" : "bg-secondary text-main"
          }`}
        >
          <Bell className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className={`font-semibold ${isRead ? "text-ft2" : "text-ft"}`}>
            {title}
          </h3>
          <p className="mt-1 text-sm text-ft2">{description}</p>
          {time && <span className="mt-2 block text-xs text-ft2/70">{time}</span>}
        </div>
      </div>
    </div>
  );
};

export default NotitficationCard;
