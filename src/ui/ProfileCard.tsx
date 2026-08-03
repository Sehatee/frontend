"use client";
import { useUserStore } from "@/stores/user";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfileCard = () => {
  const { user } = useUserStore();

  const initials = (user?.username ?? "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  const roleLabel =
    user?.role === "doctor"
      ? user.specialization || user.role
      : user?.role || "Doctor";

  return (
    <div className="top-20 w-full shrink-0 rounded-3xl border border-secondary bg-white p-8 shadow-sm md:w-80 lg:w-96">
      <div className="flex flex-col items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-main text-white ring-4 ring-mainLight/30">
            {user?.picture ? (
              <Image
                src={user.picture}
                alt="Profile"
                width={300}
                height={400}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <span className="font-display text-4xl font-bold">
                {initials || "S"}
              </span>
            )}
          </div>
          <span className="absolute bottom-1 end-1 h-5 w-5 rounded-full bg-green-500 ring-4 ring-white" />
        </div>

        {/* User Info */}
        <div className="space-y-2 text-center">
          <h3 className="font-display text-2xl font-bold text-ft">
            {user?.username}
          </h3>
          <p className="font-medium text-main">{roleLabel}</p>
        </div>

        {/* Contact Information */}
        <div className="w-full space-y-3 border-t border-secondary pt-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-main">
              <Mail className="h-4 w-4" />
            </span>
            <p className="truncate text-sm text-ft2">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-main">
              <Phone className="h-4 w-4" />
            </span>
            <p className="truncate text-sm text-ft2">{user?.phone || "—"}</p>
          </div>
          {user?.role === "doctor" && (
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-main">
                <MapPin className="h-4 w-4" />
              </span>
              <p className="truncate text-sm text-ft2">
                {user?.location?.addrss || "—"}
              </p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {user?.role === "doctor" && (
          <div className="grid w-full grid-cols-2 gap-4 border-t border-secondary pt-5">
            <div className="rounded-2xl bg-secondary p-4 text-center">
              <p className="text-2xl font-bold text-main">{user.avgRatings}</p>
              <p className="text-sm text-ft2">Rating</p>
            </div>
            <div className="rounded-2xl bg-secondary p-4 text-center">
              <p className="text-2xl font-bold text-main">
                {user.reviews?.length || 0}
              </p>
              <p className="text-sm text-ft2">Reviews</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
