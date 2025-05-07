import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DoctorCardProps {
  name: string;
  rating: number;
  totalRatings: number;
  specialization: string;
  experience: string;
  languages: string[];
  workDays: string[];
  imageUrl: string;
}

export default function DoctorCard({
  name,
  rating,
  totalRatings,
  specialization,
  experience,
  languages,
  workDays,
  imageUrl,
}: DoctorCardProps) {
  
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => {
        const isHalfStar = index + 0.5 === rating;
        const isFullStar = index < rating;

        if (isHalfStar) {
          return (
            <div key={index} className="relative">
              <Star className="w-5 h-5 fill-gray-300 text-gray-300" />
              <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400 absolute top-0 left-0" />
            </div>
          );
        }

        return (
          <Star
            key={index}
            className={`w-5 h-5 ${
              isFullStar
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        );
      });
  };

  return (
    <div className="bg-white border rounded-lg shadow-md flex flex-col md:flex-row gap-4 w-full max-w-3xl p-4">
      <div className="w-full md:w-1/3  md:h-auto">
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={400}
          className="w-full h-full rounded-lg object-cover "
        />
      </div>

      <div className="w-full md:w-2/3 flex flex-col gap-4 p-2 md:p-4 ">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
              {renderStars(rating)}
              <span className="text-gray-500 text-sm">({totalRatings})</span>
            </div>
          </div>
          <div>
            <p className="text-main bg-secondary p-1 px-2 rounded-full text-sm md:text-base">
              {specialization}
            </p>
          </div>
        </div>

        <p className="text-sm md:text-base text-textSecondary">{experience}</p>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
            <span className="text-sm md:text-base text-textSecondary">اللغات:</span>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, index) => (
                <span key={index} className="text-sm md:text-base text-textSecondary">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
            <span className="text-sm md:text-base text-textSecondary">أيام العمل:</span>
            <div className="flex flex-wrap gap-2">
              {workDays.map((day, index) => (
                <span key={index} className="text-sm md:text-base text-textSecondary">
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Link
            href="/appointment"
            className="bg-main text-white px-4  py-2 rounded-md hover:bg-main/90 transition-colors text-center text-[14px] sm:text-[16px]"
          >
            حجز موعد
          </Link>
          <button className="text-main border border-main px-4 md:px-6 py-2 rounded-md hover:bg-main/10 transition-colors text-[14px] sm:text-[16px]">
            اتصال مباشر
          </button>
        </div>
      </div>
    </div>
  );
}
