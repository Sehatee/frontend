import RenderStars from "@/ui/RenderStars";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface DoctorCardProps {
  id: string;
  name: string;
  rating: number;
  totalRatings: number;
  specialization: string;
  experience: string;
  languages: string[];
  workDays: {
    day:
      | "Sunday"
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday";
  }[];
  imageUrl: string;
}

export default function DoctorCard({
  id,
  name,
  rating,
  totalRatings,
  specialization,
  experience,
  languages,
  workDays,
  imageUrl,
}: DoctorCardProps) {
  return (
    <div
      dir=""
      className="bg-white border rounded-lg shadow-md flex flex-col md:flex-row gap-4 w-full max-w-3xl p-4"
    >
      <div className="w-full md:w-1/3 md:h-auto relative group">
        <Image
          src={imageUrl || "/imgs"}
          alt={name}
          width={300}
          height={400}
          className="w-full h-full rounded-lg object-cover"
        />
        <Link
          href={`/doctor/${id}`}
          className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors group-hover:opacity-100 opacity-0"
        >
          <ExternalLink className="w-5 h-5 text-main" />
        </Link>
      </div>

      <div className="w-full md:w-2/3 flex flex-col gap-4 p-2 md:p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              {name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <RenderStars rating={rating} />
              <span className="text-gray-500 text-sm">({totalRatings})</span>
            </div>
          </div>
          <div>
            <p className="text-main bg-secondary p-1 px-2 rounded-full text-sm md:text-base">
              {specialization}
            </p>
          </div>
        </div>
        <div className="">
          <p className=" text-sm md:text-base text-textSecondary line-clamp-3 ">
            {experience + experience}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
            <span className="text-sm md:text-base text-textSecondary">
              اللغات:
            </span>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, index) => (
                <span
                  key={index}
                  className="text-sm md:text-base text-textSecondary"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
            <span className="text-sm md:text-base text-textSecondary">
              أيام العمل:
            </span>
            <div className="flex flex-wrap gap-2">
              {workDays.map((day, index) => (
                <span
                  key={index}
                  className="text-sm md:text-base text-textSecondary"
                >
                  {day.day}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Link
            href={`/appointment/${id}`}
            className="bg-main text-white px-4 py-2 rounded-md hover:bg-main/90 transition-colors text-center text-[14px] sm:text-[16px]"
          >
            حجز موعد
          </Link>
          <Link
            href={`/coominsoon`} className="text-main border border-main px-4 md:px-6 py-2 rounded-md hover:bg-main/10 transition-colors text-[14px] sm:text-[16px]">
            اتصال مباشر
          </Link>
        </div>
      </div>
    </div>
  );
}
