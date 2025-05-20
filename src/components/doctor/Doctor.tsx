import React from "react";
import { MapPin, Calendar, MessageSquare, CalendarPlus } from "lucide-react";
import Image from "next/image";
import RenderStars from "@/ui/RenderStars";
import MapComponent from "../map/Map";
import Review from "./Review";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getDoctor } from "@/lib/api/doctor";
import { User } from "@/types/User";

const Doctor = async ({ doctorId }: { doctorId: string }) => {
  const t = await getTranslations("Doctor");
  const response = await getDoctor(doctorId);
  const doctor: User = response;

  // Check if doctor data is null or doctorId is invalid
  if (doctor === undefined) {
    return (
      <div className="px-4 py-8 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Not Found</h1>
          <p className="text-textSecondary leading-relaxed">
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
  console.log(
    "days",
    doctor.availableHours?.map((day) => {
      return day.day;
    })
  );

  return (
    <div className="px-4 py-8">
      {/* Doctor Profile Header */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex flex-col items-center gap-6 md:w-1/4">
            <div className="relative w-48 h-48 rounded-full overflow-hidden ring-4 ring-main/20">
              <Image
                src={doctor.picture || "imgs/doctorsteam/doctor2.png"}
                alt={doctor.username || "username"}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex gap-4 w-full">
              <Link
                href={`/appointment/${doctorId}`}
                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-main to-blue-600 text-white py-3 px-6 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all font-medium"
              >
                <CalendarPlus className="w-5 h-5" />
                {t("book")}
              </Link>
              <Link
                href={"/coominsoon"}
                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-orangColor to-orange-500 text-white py-3 px-6 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all font-medium"
              >
                <MessageSquare className="w-5 h-5" />
                {t("chat")}
              </Link>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {doctor.username}
                </h1>
                <div className="bg-blue-50 text-blue-700 px-5 py-2 rounded-full inline-block">
                  <p className="font-semibold">{doctor.specialization}</p>
                </div>
                <p className="text-textSecondary leading-relaxed">
                  {doctor.description || ""}
                </p>
                <div className="flex items-center gap-3">
                  <RenderStars rating={doctor.avgRatings || 0} />
                  <span className="text-gray-500 font-medium">
                    ({doctor.reviews?.length} {t("reviews")})
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <MapPin className="w-6 h-6 text-main" />
                </div>
                <span className="text-gray-700 font-medium">
                  {doctor.location?.addrss || "غير معروف"}
                </span>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <Calendar className="w-6 h-6 text-main" />
                </div>
                <span className="text-gray-700 font-medium">
                  {days?.join(" - ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t("location")}</h2>
          <div className="h-[300px] rounded-lg overflow-hidden">
            <MapComponent
              lat={doctor.location?.coordinates[0] || 0}
              lng={doctor.location?.coordinates[1] || 0}
            />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-6 h-[400px] relative">
          <h2 className="text-xl font-semibold mb-4">{t("patientReviews")}</h2>
          <div className="space-y-4 overflow-y-auto h-[calc(100%-140px)]">
            {reviews && reviews?.length > 0 ? (
              reviews.map((review) => (
                <Review key={review._id} review={review} />
              ))
            ) : (
              <Review />
            )}
          </div>

          <div className="sticky bottom-0 left-0 right-0 bg-white py-7 border-t">
            <form className="flex gap-2">
              <input
                type="text"
                placeholder={t("writeYourReview")}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
