import RenderStars from "@/ui/RenderStars";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { User } from "@/types/User";
import {useTranslations} from "next-intl";

export default function DoctorCard({ doctor }: { doctor: User }) {
  const t = useTranslations("Doctors");
  return (
    <div
      dir=""
      className="bg-white  border rounded-lg shadow-md flex flex-col md:flex-row gap-4 m:w-[400px] md:w-full max-w-3xl p-4 mx-auto"
    >
      <div className="sm:w-[400px] h-[250px]  md:w-1/3 md:h-auto relative group">
        <Image
          src={doctor.picture || "/imgs"}
          alt={doctor.username}
          width={300}
          height={400}
          className="w-full h-full rounded-lg object-cover object-top"
        />
        <Link
          href={`/doctor/${doctor._id}`}
          className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors group-hover:opacity-100 opacity-0"
        >
          <ExternalLink className="w-5 h-5 text-main" />
        </Link>
      </div>

      <div className="w-full md:w-2/3 flex flex-col gap-4 p-2 md:p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              {doctor.username}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <RenderStars rating={doctor.avgRatings} />
              <span className="text-gray-500 text-sm">({doctor.reviews.length})</span>
            </div>
          </div>
          <div>
            <p className="text-main bg-secondary p-1 px-2 rounded-full text-sm md:text-base">
              {doctor.specialization}
            </p>
          </div>
        </div>
        <div className="">
          <p className=" text-sm md:text-base text-textSecondary line-clamp-3 ">
            {doctor.description}
          </p>
        </div>

        

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Link
            href={`/appointment/${doctor._id}`}
            className="bg-main text-white px-4 py-2 rounded-md hover:bg-main/90 transition-colors text-center text-[14px] sm:text-[16px]"
          >
            {t("book")}
          </Link>
          <Link
            href={`/directCall`}
            className="text-main border border-main px-4 md:px-6 py-2 rounded-md hover:bg-main/10 transition-colors text-[14px] sm:text-[16px] text-center"
          >
            {t("call")}
          </Link>
        </div>
      </div>
    </div>
  );
}
