import React from "react";
import { useTranslations } from "next-intl";

const Privacy = () => {
  const t = useTranslations("PrivacyPolicy");

  // Get sections as an array from the translation file
  const sections = t.raw("sections");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h1 className="font-display text-3xl font-bold leading-[1.2] text-ft sm:text-4xl md:text-5xl">
          {t("title")}
        </h1>
      </div>
      <p className="mt-10 leading-loose text-ft2 lg:text-lg">{t("intro")}</p>
      {sections.map(
        (section: { title: string; content: string[] }, idx: number) => (
          <section key={idx} className="mt-10">
            <h2 className="font-display text-xl font-bold text-ft sm:text-2xl">
              {section.title}
            </h2>
            <div className="mt-3 space-y-2">
              {section.content.map((line: string, i: number) => (
                <p key={i} className="leading-loose text-ft2">
                  {line}
                </p>
              ))}
            </div>
          </section>
        )
      )}
    </div>
  );
};

export default Privacy;
