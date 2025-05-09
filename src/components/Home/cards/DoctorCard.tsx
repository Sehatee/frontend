import React from "react";
import Image from "next/image";


interface DoctorCardProps {
  name: string;
  specialty: string;
  description: string;
  img: string;
}

const DoctorCard = ({ name, specialty, description, img }: DoctorCardProps) => {
  
  return (
    <div className="relative bg-[#3F89F0] flex w-[520px] pr-[180px] mt-20 rounded-2xl ">
      <div className="absolute -right-32 bottom-0">
        <Image
          width={350}
          height={350}
          alt="docImg"
          src={img}
        />
      </div>
      <div className="text-bg pt-6 pl-10 mr-6">
        <h1 className="text-2xl font-bold فث">
          {name} 
          <span className="block mt-2 text-sm font-light">{specialty}</span>
        </h1>

        <p className="text-[13px] w-[270px]  mt-4 leading-loose">{description} </p>
       
        <button className="flex gap-2 my-6 mr-6 px-4 py-1 border-2 rounded-lg font-semibold shadow-[0_0_10px_2px_#a2c5f646] hover:bg-[#5b94e3] hover:shadow-[#7cc0be84] transition duration-300">
        <p> اتصل الان</p>
        <img src="/imgs/doctorsteam/phone.png" className="w-[24px]"/>
        </button>
      </div>
    </div>
    
  )
};

export default DoctorCard;
