import React from "react";
import { useTranslations } from "next-intl";
import { Construction, Hourglass } from "lucide-react";

const CoominSoon = () => {
  const t = useTranslations("ComingSoon");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-bg p-6">
      <div className="flex w-full max-w-xl flex-col items-center gap-5 rounded-3xl border border-secondary bg-white p-12 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-main">
          <Construction size={32} />
        </span>

        <span className="eyebrow">{t("title")}</span>
        <h1 className="font-display text-3xl font-bold text-ft sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-lg text-ft2">{t("description")}</p>

        <span className="inline-flex items-center gap-2 text-sm font-medium text-main">
          <Hourglass className="h-4 w-4" />
          {t("loading")}
        </span>
      </div>
    </div>
  );
};

export default CoominSoon;
