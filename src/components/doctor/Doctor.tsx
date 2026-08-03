import React from "react";
import {
  MapPin,
  CalendarDays,
  MessageSquare,
  CalendarPlus,
  CheckCircle2,
  Star,
  Users,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import RenderStars from "@/ui/RenderStars";
import MapComponent from "../map/Map";

import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getDoctor } from "@/lib/api/doctor";
import { User } from "@/types/User";

import Reviews from "./Reviews";

const Doctor = async ({ doctorId }: { doctorId: string }) => {
  const t = await getTranslations("Doctor");
  const tCard = await getTranslations("DoctorCard");
  const response = await getDoctor(doctorId);
  const doctor: User = response;

  // Check if doctor data is null or doctorId is invalid
  if (doctor === undefined) {
    return (
      <div className="px-4 py-10">
        <div className="rounded-3xl border border-secondary bg-white p-10 shadow-sm">
          <h1 className="font-display text-3xl font-bold text-ft">
            Doctor Not Found
          </h1>
          <p className="mt-2 leading-relaxed text-ft2">
            The doctor information is unavailable or the ID provided is invalid.
          </p>
        </div>
      </div>
    );
  }

  const reviews = doctor.reviews || [];
  const days = doctor.availableHours?.map((day) => {
    return t(`days.${day.day.toLowerCase()}`);
  });

  const initials = (doctor.username || "").trim().charAt(0) || "د";

  return (
    <div className="px-4 py-10">
      {/* Doctor Profile Header */}
      <div className="relative overflow-hidden rounded-[2rem] border border-secondary bg-white p-8 shadow-sm md:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-secondary"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -start-10 -bottom-16 h-40 w-40 rounded-full border-2 border-accent/30"
        />

        <div className="relative grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* profile block */}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
            <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-[1.5rem] bg-main ring-4 ring-secondary sm:h-44 sm:w-44">
              {doctor.picture ? (
                <Image
                  src={doctor.picture}
                  alt={doctor.username || "username"}
                  fill
                  className="object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-6xl font-bold text-white">
                    {initials}
                  </span>
                </div>
              )}
            </div>

            <div className="min-w-0 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl font-bold text-ft sm:text-4xl">
                  {doctor.username}
                </h1>
                <span
                  title={t("verified")}
                  className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-main"
                >
                  <CheckCircle2 className="size-4 text-main" />
                  {t("verified")}
                </span>
              </div>

              <p className="text-lg font-semibold text-main">
                {doctor.specialization}
              </p>

              <div className="flex items-center gap-3">
                <RenderStars rating={doctor.avgRatings || 0} />
                <span className="font-medium text-ft2">
                  ({doctor.reviews?.length} {t("reviews")})
                </span>
              </div>

              <div className="pt-2">
                <h2 className="mb-2 font-display text-xl font-bold text-ft">
                  {t("about")}
                </h2>
                <p className="max-w-[55ch] leading-relaxed text-ft2">
                  {doctor.description || ""}
                </p>
              </div>
            </div>
          </div>

          {/* stats + CTA */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-secondary p-6 text-center">
                <Star className="mx-auto size-6 text-main" fill="currentColor" />
                <p className="mt-2 font-display text-2xl font-bold text-ft">
                  {doctor.avgRatings?.toFixed(1) ?? "—"}
                </p>
                <p className="mt-1 text-xs font-medium text-ft2">
                  {t("rating")}
                </p>
              </div>
              <div className="rounded-2xl bg-cream p-6 text-center">
                <Users className="mx-auto size-6 text-main" />
                <p className="mt-2 font-display text-2xl font-bold text-ft">
                  {doctor.reviews?.length ?? 0}
                </p>
                <p className="mt-1 text-xs font-medium text-ft2">
                  {t("reviews")}
                </p>
              </div>
              <div className="rounded-2xl bg-secondary p-6 text-center">
                <CalendarDays className="mx-auto size-6 text-main" />
                <p className="mt-2 font-display text-2xl font-bold text-ft">
                  {days?.length ?? 0}
                </p>
                <p className="mt-1 text-xs font-medium text-ft2">
                  {tCard("workDays")}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href={`/appointment/${doctorId}`}
                className="btn-primary flex-1"
              >
                <CalendarPlus className="size-5" />
                {t("book")}
              </Link>
              <Link
                href={`/chat?doctorId=${doctor._id}`}
                className="btn-ghost flex-1"
              >
                <MessageSquare className="size-5" />
                {t("chat")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* location + working days */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-secondary bg-white p-5 transition-colors hover:bg-bg">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
            <MapPin className="size-6 text-main" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-main">{t("location")}</p>
            <span className="line-clamp-3 font-medium text-ft">
              {doctor.location?.addrss || "غير معروف"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-secondary bg-white p-5 transition-colors hover:bg-bg">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
            <Calendar className="size-6 text-main" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-main">
              {tCard("workDays")}
            </p>
            <span className="font-medium text-ft">
              {days?.join(" - ") || "—"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Map Section */}
        <div className="rounded-3xl border border-secondary bg-white p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-ft">
            {t("location")}
          </h2>
          <div className="h-[300px] overflow-hidden rounded-2xl">
            <MapComponent
              lat={doctor.location?.coordinates[0] || 0}
              lng={doctor.location?.coordinates[1] || 0}
            />
          </div>
        </div>

        {/* Reviews section */}
        <Reviews doctorId={doctor._id} initialReviews={reviews} />
      </div>
    </div>
  );
};

export default Doctor;
