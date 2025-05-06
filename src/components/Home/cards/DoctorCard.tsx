import React from "react";

interface DoctorCardProps {
  name: string;
  specialty: string;
  description: string;
  img: string;
}

const DoctorCard = ({ name, specialty, description, img }: DoctorCardProps) => {
  return (
    <div>
      <div>{name}</div>
      <div>{specialty}</div>
      <div>{description}</div>
      <div>{img}</div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DoctorCard;
