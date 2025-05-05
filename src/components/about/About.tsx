import TextHeader from "@/ui/TextHeader";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const About = () => {
  const t = useTranslations("About");
  const someServices = t.raw("someServices");
  return (
    <div>
      {/* main text */}
      <TextHeader title={t("title")} subTitle={t("subTitle")} />
      {/* vision  */}
      <div className="flex flex-col gap-4 my-16">
        <h2 className="text-2xl font-bold">{t("vision")}</h2>
        <p className="text-lg text-textSecondary">{t("visionText")}</p>
      </div>
      {/* message  */}
      <div className="flex flex-col gap-4 my-16">
        <h2 className="text-2xl font-bold">{t("mission")}</h2>
        <p className="text-lg text-textSecondary">{t("missionText")}</p>
      </div>
      {/* some services  */}
      <div className="flex flex-col gap-3 ">
        {someServices.map((service: { id: number; text: string }) => (
          <div key={service.id} className="flex  gap-4">
            <Check className="bg-main rounded-full p-1" color="white" />

            <p className="text-primary text-base text-textSecondary">
              {service.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
