"use client";

import {
  Briefcase,
  CheckCircle2,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import AboutCard from "./AboutCard";
import TextHeader from "@/ui/TextHeader";

const About = () => {
  const t = useTranslations("About");
  const someServices = t.raw("someServices");
  const valuesList = t.raw("values.valuesList");

  return (
    <div className="mt-24 space-y-20 md:space-y-28">
      {/* من نحن */}
      <section className="grid gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-14">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-secondary px-8 py-12 sm:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="absolute -end-16 -top-16 h-56 w-56 rounded-full bg-white/60"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -start-16 h-64 w-64 rounded-full bg-accent/10"
          />
          <div className="relative">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.15] text-ft sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-[45ch] leading-loose text-ft2 lg:text-lg">
              {t("subTitle")}
            </p>
            <div className="mt-8 rounded-2xl bg-white/80 p-6 shadow-sm shadow-main/5">
              <h3 className="text-2xl font-bold text-main">{t("vision")}</h3>
              <p className="mt-2 leading-loose text-ft2">{t("visionText")}</p>
            </div>
          </div>
        </div>

        <div>
          <span className="eyebrow">{t("missionEyebrow")}</span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.2] text-ft sm:text-4xl">
            {t("mission")}
          </h2>
          <p className="mt-4 leading-loose text-ft2 lg:text-lg">
            {t("missionText")}
          </p>
          <ul className="mt-8 space-y-3">
            {someServices.map((service: { id: number; text: string }) => (
              <li key={service.id} className="flex items-start gap-3">
                <CheckCircle2
                  size={24}
                  className="mt-0.5 shrink-0 text-main"
                  strokeWidth={1.75}
                />
                <span className="leading-loose text-ft2">{service.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* القيم */}
      <section className="bg-bg px-5 pb-24 pt-16 sm:px-8 md:pb-28 lg:px-14">
        <TextHeader
          title={t("values.title")}
          subTitle={t("values.subTitle")}
          eyebrow={t("values.eyebrow")}
          accent
        />
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {valuesList.map(
            (
              value: {
                id: number;
                text: string;
                icon: string;
                description: string;
              },
              index: number
            ) => (
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
                number={index + 1}
                variant={index % 2 === 1 ? "main" : "default"}
              />
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
