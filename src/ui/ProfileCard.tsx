"use client";
import { useUserStore } from "@/stores/user";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const ProfileCard = () => {
  const t = useTranslations("Profile");
  const { user } = useUserStore();
  return (
    <div className="w-full  md:w-80 bg-white rounded-lg p-6 shadow-sm ">
      <div className="flex flex-col justify-between h-full items-center gap-4">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <Image
            src={user?.picture || "/imgs/header/doctor.png"}
            alt="Profile"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-bold md:text-xl sm:text-lg text-gray-900 text-center ">
            {user?.username}
          </h3>
          <div className="flex items-center gap-2">
            <Mail size={16} color="#0B62DE" className="text-gray-500" />
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} color="#0B62DE" className="text-gray-500" />
            <p className="text-sm text-gray-500">{user?.phone}</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} color="#0B62DE" className="text-gray-500" />
            <p className="text-sm text-gray-500">{user?.location?.addrss}</p>
          </div>
        </div>

        <button className="w-full bg-main text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
          {t("editProfile")}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
