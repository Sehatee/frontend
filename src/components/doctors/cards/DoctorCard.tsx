import RenderStars from "@/ui/RenderStars";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { User } from "@/types/User";
import { useTranslations } from "next-intl";

export default function DoctorCard({ doctor }: { doctor: User }) {
  const t = useTranslations("Doctors");
  const initials = (doctor.username || "").trim().charAt(0) || "د";

  return (
    <div
      className="flex flex-col gap-6 rounded-3xl border border-secondary bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-main/10"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-main">
            {doctor.picture ? (
              <Image
                src={doctor.picture}
                alt={doctor.username || ""}
                fill
                className="object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-display text-2xl font-bold text-white">
                  {initials}
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-ft">
              {doctor.username || ""}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <RenderStars rating={doctor.avgRatings} />
              <span className="text-sm text-ft2">
                ({doctor.reviews?.length ?? 0})
              </span>
            </div>
          </div>
        </div>
        <span className="inline-flex shrink-0 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-main">
          {doctor.specialization || ""}
        </span>
      </div>

      <p className="line-clamp-3 text-sm leading-relaxed text-ft2 md:text-base">
        {doctor.description || ""}
      </p>

      <div className="mt-auto flex flex-col gap-3 pt-1 sm:flex-row">
        <Link
          href={`/appointment/${doctor._id}`}
          className="btn-primary px-5 py-2.5 text-sm"
        >
          {t("book")}
        </Link>
        <Link
          href="/directCall"
          className="btn-ghost px-5 py-2.5 text-sm"
        >
          <Phone className="size-4" />
          {t("call")}
        </Link>
      </div>
    </div>
  );
}
