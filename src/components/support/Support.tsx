import React from "react";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import AccordingSupport from "./AccordingSupport";
import { useTranslations } from "next-intl";
import TextHeader from "@/ui/TextHeader";

const Support = () => {
  const t = useTranslations("Support");

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-12">
      <TextHeader
        title={t("title")}
        subTitle={t("subtitle")}
        eyebrow={t("eyebrow")}
        accent
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:gap-12">
        {/* لوحة التواصل */}
        <div className="relative overflow-hidden rounded-3xl bg-main p-8 text-white sm:p-10 lg:col-span-2">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -end-20 -top-20 h-56 w-56 rounded-full bg-white/5"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -start-16 h-64 w-64 rounded-full bg-accent/15"
          />

          <div className="relative flex h-full flex-col gap-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-black/10">
              <MessageCircle size={26} />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                {t("liveChat.title")}
              </h2>
              <p className="mt-3 leading-relaxed text-white/80">
                {t("liveChat.description")}
              </p>
              <a
                href="mailto:contact@sehatte.com"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-main transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-cream hover:shadow-lg"
              >
                <Mail size={18} />
                {t("liveChat.button")}
              </a>
            </div>

            <div className="mt-auto rounded-2xl bg-white/5 p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <Phone size={20} />
                </span>
                <div>
                  <h3 className="font-bold text-white">{t("callUs.title")}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/75">
                    {t("callUs.description")}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white" dir="ltr">
                    {t("callUs.phone")}
                  </p>
                </div>
              </div>
              <p className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-white/70">
                <Clock size={16} className="shrink-0 text-accent" />
                {t("callUs.workingHours")}
              </p>
            </div>
          </div>
        </div>

        {/* الأسئلة الشائعة */}
        <div className="lg:col-span-3">
          <h2 className="font-display text-2xl font-bold text-ft sm:text-3xl">
            {t("faq.title")}
          </h2>
          <div className="mt-6">
            <AccordingSupport />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
