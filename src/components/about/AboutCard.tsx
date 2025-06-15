'use client'
import React from "react";

const AboutCard = ({
  icon: Icon,
  title,
  des,
}: {
  icon: React.ElementType;
  title: string;
  des: string;
}) => {
  return (
    <div className="bg-white mx-auto lg:min-w-[420px] s:min-w-[350px] shadow-md rounded-2xl p-6 text-center flex flex-col items-center gap-4 transition-all hover:shadow-lg">
      {/* دائرة الأيقونة */}
      <div className="bg-[#eef4ff] p-4 rounded-full flex items-center justify-center">
        <Icon size={32} className="text-main" />
      </div>

      {/* العنوان */}
      <h3 className="text-xl font-bold text-main">{title}</h3>

      {/* الوصف */}
      <p className="text-gray-600 text-sm max-w-xs">{des}</p>
    </div>
  );
};

export default AboutCard;
