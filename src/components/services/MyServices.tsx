"use client";
import React from "react";
import { CalendarCheck, HeartPulse, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import TextHeader from "@/ui/TextHeader";

const MyServices = () => {
  const t = useTranslations("MyServices");
  const services = t.raw("services");
  return (
    <div className="my-36">
      {/* main text */}
      <TextHeader title={t('title')} subTitle={t('subTitle')}/>
      {/* services */}
      <div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map(
            (
              service: { title: string; text: string; icon: string },
              index: number
            ) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center gap-3 p-4  rounded-lg bg-secondary"
                >
                  {service.icon === "Video" ? (
                    <div className="p-3 bg-secondary rounded-full">
                      <Video size={28} color="#0B62DE" />
                    </div>
                  ) : service.icon === "CalendarCheck" ? (
                    <div className="p-3 bg-secondary rounded-full">
                      <CalendarCheck size={28} color="#0B62DE" />
                    </div>
                  ) : (
                    <div className="p-3 bg-secondary rounded-full">
                      <HeartPulse size={28} color="#0B62DE" />
                    </div>
                  )}
                  <h2 className="text-lg font-semibold">{service.title}</h2>
                  <p className="text-sm text-textSecondary mt-2">
                    {service.text}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default MyServices;
