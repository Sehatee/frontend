"use client";
import TextHeader from "@/ui/TextHeader";
import {
  Briefcase,
  Check,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import AboutCard from "./AboutCard";

const About = () => {
  const t = useTranslations("About");
  const someServices = t.raw("someServices");
  const valuesList = t.raw("values.valuesList");
  return (
    <div className="my-36">
      {/* main text */}
      <TextHeader title={t("title")} subTitle={t("subTitle")} />
      {/* vision  */}
      <div className="flex flex-col gap-4 my-16">
        <h2 className="text-2xl font-bold">{t("vision")}</h2>
        <p className="md:text-lg text-base text-textSecondary lg:w-[50%]">
          {t("visionText")}
        </p>
      </div>
      {/* message  */}
      <div className="flex flex-col gap-4 my-16">
        <h2 className="text-2xl font-bold">{t("mission")}</h2>
        <p className="md:text-lg text-base text-textSecondary lg:w-[50%]">
          {t("missionText")}
        </p>
      </div>
      {/* some services  */}
      <div className="flex flex-col gap-3 my-16">
        {someServices.map((service: { id: number; text: string }) => (
          <div key={service.id} className="flex items-center gap-4">
            <Check className="bg-main rounded-full p-1" color="white" />

            <p className="text-primary text-base text-textSecondary">
              {service.text}
            </p>
          </div>
        ))}
      </div>
      {/* Our values */}
      <TextHeader title={t("values.title")} subTitle={t("values.subTitle")} />
      <div className="my-16 grid grid-cols-2 md:grid-cols-2 gap-16">
        {valuesList.map(
          (value: {
            id: number;
            text: string;
            icon: string;
            description: string;
          }) => (
            <AboutCard
              key={value.id}
              icon={
                value.icon === "Briefcase"
                  ? Briefcase
                  : value.icon === "Lightbulb"
                  ? Lightbulb
                  : value.icon === "ShieldCheck"
                  ? ShieldCheck
                  : value.icon === "Handshake"
                  ? Handshake
                  : Users
              }
              title={value.text}
              des={value.description}
            />
          )
        )}
      </div>
    </div>
  );
};

export default About;
