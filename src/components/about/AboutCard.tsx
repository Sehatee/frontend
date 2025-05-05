'use client'
import React from "react";

const AboutCard = ({
  icon: Icon,
  title,
  des,
}: {
  icon: React.ElementType; // Expecting a component
  title: string;
  des: string;
}) => {
    
  return (
    <div className="p-4 flex flex-col items-center gap-2 border-2 rounded shadow-md">
      <div>
        <Icon
          color="#0B62DE"
          className="p-2 bg-primary rounded-full"
          size={60}
        />
      </div>
      <div className="flex items-center mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="text-sm text-gray-700 w-80 text-center">{des}</p>
    </div>
  );
};

export default AboutCard;
