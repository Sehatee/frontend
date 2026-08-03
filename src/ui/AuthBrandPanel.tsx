"use client";
import { CheckCircle2, ShieldCheck, Stethoscope } from "lucide-react";
import { useTranslations } from "next-intl";

const AuthBrandPanel = ({ ns }: { ns: "Login" | "Signup" }) => {
  const t = useTranslations(ns);

  return (
    <div className="relative hidden overflow-hidden rounded-[2.5rem] bg-main lg:flex lg:flex-col lg:justify-center lg:p-12 xl:p-14">
      <div
        aria-hidden="true"
        className="absolute -end-24 -top-24 h-72 w-72 rounded-full bg-mainLight/25"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -start-16 h-48 w-48 rounded-full border-2 border-accent/70"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-40 end-10 h-24 w-24 rounded-full bg-white/5"
      />

      <div className="relative">
        <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
          {t("brandEyebrow")}
        </span>
        <h2 className="mt-6 max-w-[14ch] font-display text-4xl font-bold leading-[1.15] text-white xl:text-5xl">
          {t("brandTitle")}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-white/80 xl:text-lg">
          {t("brandSub")}
        </p>

        <div className="relative mt-10 max-w-md">
          <div
            aria-hidden="true"
            className="absolute -top-3 start-5 h-full w-[calc(100%-2.5rem)] rounded-2xl bg-white/10"
          />
          <div className="relative flex items-center gap-5 rounded-2xl bg-white p-6 shadow-2xl">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent">
              <ShieldCheck className="size-7 text-white" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold text-main">Sehatee</p>
                <span className="whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-main">
                  {t("cardTag")}
                </span>
              </div>
              <p className="mt-1.5 text-base font-bold text-ft">{t("cardTitle")}</p>
              <p className="mt-1 text-sm text-ft2">{t("cardSub")}</p>
            </div>
          </div>
        </div>

        <ul className="mt-8 space-y-3">
          {["feature1", "feature2", "feature3"].map((key) => (
            <li key={key} className="flex items-center gap-3 text-white/90">
              <CheckCircle2 className="size-5 shrink-0 text-accent" />
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center gap-3 text-white/70">
          <Stethoscope className="size-5 shrink-0" />
          <p className="text-sm">{t("trust")}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthBrandPanel;
