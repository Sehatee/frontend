import React from "react";

const CalendarIcon = () => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a6 6 0 0112 0v2" />
      <circle cx="17" cy="7" r="4" />
      <path d="M21 21v-2a6 6 0 00-6-6" />
    </svg>
  );
};

export default CalendarIcon;
