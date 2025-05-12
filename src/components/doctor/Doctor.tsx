import React from "react";
import { MapPin, Clock, Calendar, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import RenderStars from "@/ui/RenderStars";
import MapComponent from "../map/Map";

interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

const Doctor = () => {
  const t = useTranslations("Doctor");

  // Sample doctor data
  const doctor = {
    name: "د. محمد أحمد",
    specialty: "أخصائي الباطنة العامة",
    rating: 4.5,
    totalReviews: 128,
    experience: "15 عام",
    location: {
      address: "شارع الملك فهد، الرياض",
      lat: 24.7136,
      lng: 46.6753,
    },
    workingHours: "9:00 صباحاً - 9:00 مساءً",
    workDays: "الأحد - الخميس",
    image: "/imgs/doctorsteam/doctor5.png",
  };

  // Sample reviews
  const reviews: Review[] = [
    {
      id: "1",
      patientName: "أحمد محمد",
      rating: 5,
      comment: "طبيب ممتاز وخدمة رائعة",
      date: "2024-02-15",
    },
    {
      id: "2",
      patientName: "سارة عبدالله",
      rating: 4,
      comment: "تجربة جيدة جداً وعيادة نظيفة ومنظمة",
      date: "2024-02-10",
    },
    {
      id: "2",
      patientName: "سارة عبدالله",
      rating: 4.5,
      comment: "تجربة جيدة جداً وعيادة نظيفة ومنظمة",
      date: "2024-02-10",
    },
    {
      id: "2",
      patientName: "سارة عبدالله",
      rating: 4,
      comment: "تجربة جيدة جداً وعيادة نظيفة ومنظمة",
      date: "2024-02-10",
    },
  ];

  return (
    <div className=" px-4 py-8">
      {/* Doctor Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-start">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {doctor.name}
            </h1>
            <p className="text-gray-600 mb-3">{doctor.specialty}</p>

            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <RenderStars rating={doctor.rating} />
              <span className="text-gray-500">
                ({doctor.totalReviews} {t("reviews")})
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>{doctor.location.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>{doctor.workingHours}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>{doctor.workDays}</span>
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
            <MapComponent />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-6 h-[400px] overflow-y-scroll">
          <h2 className="text-xl font-semibold mb-4">{t("patientReviews")}</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">{review.patientName}</span>
                  </div>
                  <RenderStars rating={review.rating} />
                </div>
                <p className="text-gray-600 mb-2">{review.comment}</p>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
