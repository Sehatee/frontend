"use client";
import React from "react";

const SerchBar = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 px-4 md:px-8 my-8">
      <div className="w-full md:w-2/3 relative">
        <input
          type="text"
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="ابحث عن طبيب"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <select
        defaultValue="hello"
        className="w-full md:w-1/3 h-12 border-2 border-gray-300 rounded-lg px-4 focus:outline-none focus:border-blue-500 transition-colors"
      >
        <option value="hello">جميع التخصصات</option>
        <option value="cardiology">قلب</option>
        <option value="neurology">أعصاب</option>
        <option value="orthopedics">عظام</option>
        <option value="pediatrics">أطفال</option>
      </select>
    </div>
  );
};

export default SerchBar;
