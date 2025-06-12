import React from 'react'
import { useTranslations, useLocale } from "next-intl";

const Privacy = () => {
  const t = useTranslations("PrivacyPolicy");
  const locale = useLocale();

  // Get sections as an array from the translation file
  const sections = t.raw("sections");

  // Set direction and textAlign based on locale
  const isArabic = locale === "ar";
  const dirClass = isArabic ? "rtl text-right" : "ltr text-left";

  return (
    <div className={`${dirClass} max-w-[800px] mx-auto font-inherit pt-6 px-4 my-20`}>
      <h2 className="text-[#2563eb] text-center font-bold mb-6">{t("title")}</h2>
      <div className="mb-6">{t("intro")}</div>
      {sections.map((section: { title: string, content: string[] }, idx: number) => (
        <div key={idx} className="mb-6">
          <div className="font-bold text-lg mb-2">{section.title}</div>
          {section.content.map((line: string, i: number) => (
            <div key={i} className="text-[#444] text-base mb-1">{line}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Privacy