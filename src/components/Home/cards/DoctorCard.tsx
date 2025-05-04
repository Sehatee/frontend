import React from "react";
import { Phone } from "lucide-react";
import Image from "next/image";

interface DoctorCardProps {
  name: string;
  specialty: string;
  description: string;
  img: string;
}

const DoctorCard = ({ name, specialty, description, img }: DoctorCardProps) => {
  return (
    <div></div>
  );
};

export default DoctorCard;
