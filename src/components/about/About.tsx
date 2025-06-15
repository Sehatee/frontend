"use client";

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
    <div className="mt-28 space-y-24">
      {/* من نحن */}
      <section className="grid lg:grid-cols-2 gap-10 m:mx-20 mx-5 lg:mx-10 text-lg">
        <div className="lg:mx-auto">
        <h2 className="text-4xl mb-5 font-bold text-blue-700">{t("title")}</h2>
        <p className="text-textSecondary text-xl  leading-loose max-w-xl ">{t("subTitle")}</p>
        </div>  
      {/* رؤيتنا */}
        <div className="bg-[#eef4ff] lg:mx-auto mr-auto mt-5 p-6 shadow-sm space-y-4 leading-loose rounded-xl max-w-[500px]  ">
          <h3 className="text-2xl font-bold text-main">{t("vision")}</h3>
          <p className="text-textSecondary">{t("visionText")}</p>
        </div>
      </section>

      {/* الرسالة */}
      
        <section className="lg:mx-40 m:mx-20 mx-5">
          <h3 className="text-3xl mb-2 font-bold text-main">{t("mission")}</h3>
          <p className="text-textSecondary text-[19px]">{t("missionText")}</p>
          <ul className="space-y-2 mt-4">
            {someServices.map((service: { id: number; text: string }) => (
              <li key={service.id} className="flex text-lg items-start gap-3">
                <Check className="text-white mt-1 bg-main rounded-full p-1" size={20} />
                <span className="text-textSecondary">{service.text}</span>
              </li>
            ))}
          </ul>
        </section>        
     

      {/* القيم */}
      <section className="text-center pb-28 bg-[#eef4ff] p-10 space-y-12">
        <div>
          <h2 className="text-3xl mb-2 font-bold text-main">{t("values.title")}</h2>
          <p className="text-textSecondary max-w-3xl mx-auto">{t("values.subTitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
      </section>
    </div>
  );
};

export default About;
