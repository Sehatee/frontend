"use client";
import React from "react";
import { CalendarCheck, HeartPulse, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import TextHeader from "@/ui/TextHeader";

const iconMap: Record<string, React.ElementType> = {
  Video,
  CalendarCheck,
  HeartPulse,
};

const MyServices = () => {
  const t = useTranslations("MyServices");
  const services = t.raw("services");
  return (
    <section className="my-24 md:my-32">
      <TextHeader
        title={t("title")}
        subTitle={t("subTitle")}
        eyebrow={t("eyebrow")}
        accent
      />
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:pb-6">
        {services.map(
          (
            service: { title: string; text: string; icon: string },
            index: number
          ) => {
            const Icon = iconMap[service.icon] ?? HeartPulse;
            const isMiddle = index === 1;
            return (
              <div
                key={index}
                className={`group relative flex flex-col gap-5 rounded-3xl border border-secondary/70 p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-main/10 ${
                  index % 2 === 0 ? "bg-white" : "bg-cream"
                } ${isMiddle ? "lg:translate-y-6" : ""}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute end-6 top-6 font-display text-6xl font-bold text-main/15 transition-colors duration-300 group-hover:text-accent/25"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-main text-white shadow-lg shadow-main/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-accent group-hover:shadow-accent/25">
                  <Icon size={30} strokeWidth={1.75} />
                </div>
                <h3 className="mt-1 text-xl font-bold text-ft lg:text-2xl">
                  {service.title}
                </h3>
                <p className="max-w-[38ch] leading-relaxed text-ft2">
                  {service.text}
                </p>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default MyServices;
