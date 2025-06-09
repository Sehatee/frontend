"use client";
import { useUserStore } from "@/stores/user";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfileCard = () => {
  const { user } = useUserStore();

  return (
    <div className="  top-20 bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center gap-6">
        {/* Profile Image with Border */}
        <div className="relative">
          <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-main p-1">
            <Image
              src={user?.picture || "/imgs/header/doctor.png"}
              alt="Profile"
              width={300}
              height={400}
              className="w-full h-full object-cover object-top rounded-full"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white z-10"></div>
        </div>

        {/* User Info */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-800">{user?.username}</h3>
          <p className="text-blue-600 font-medium">{user?.role || "Doctor"}</p>
        </div>

        {/* Contact Information */}
        <div className="w-full space-y-3 pt-4 border-t">
          <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
            <Mail className="w-5 h-5 text-blue-600" />
            <p className="text-sm">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
            <Phone className="w-5 h-5 text-blue-600" />
            <p className="text-sm">{user?.phone}</p>
          </div>
          {user?.role === "doctor" && (
            <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
              <MapPin className="w-5 h-5 text-blue-600" />
              <p className="text-sm">{user?.location?.addrss}</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {user?.role === "doctor" && (
          <div className="w-full grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {user.avgRatings}
              </p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {user.reviews?.length || 0}
              </p>
              <p className="text-sm text-gray-600">Reviews</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
