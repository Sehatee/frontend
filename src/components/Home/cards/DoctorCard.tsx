import React from "react";

interface DoctorCardProps {
  name: string;
  specialty: string;
  description: string;
  img: string;
}

const DoctorCard = ({ name, specialty, description, img }: DoctorCardProps) => {
  console.log(name, specialty, description, img);
  return <div></div>;
};

export default DoctorCard;
