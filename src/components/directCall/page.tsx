"use client";
import React from "react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Paperclip, CheckCircle2, X } from "lucide-react";

function DirectCall() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [showToast, setShowToast] = useState(false); // New state for toast visibility
  const t = useTranslations("DirectCall");

  const textDirection = useLocale() === "ar" ? "rtl" : "ltr";

  function handleSubmit() {
    const textAreaElement = document.querySelector("textarea");
    const textAreaValue = textAreaElement ? textAreaElement.value : "";

    const checkboxElement = document.getElementById(
      "agree"
    ) as HTMLInputElement;
    const isCheckboxChecked = checkboxElement ? checkboxElement.checked : false;
    if (textAreaValue.trim() === "" || !isCheckboxChecked) {
      return; // لا تفعل شيئًا إذا كان مربع النص فارغًا أو checkbox غير مفعلة
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 pb-20 pt-10">
      {/* banner */}
      <div className="relative overflow-hidden rounded-[2rem] bg-main p-10 text-center shadow-lg shadow-main/25">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-20 -top-20 h-56 w-56 rounded-full bg-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -start-10 h-32 w-32 rounded-full border-2 border-accent/70"
        />
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent shadow-lg shadow-black/10">
          <Phone className="size-7 text-white" />
        </div>
        <h1 className="relative mt-5 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
          {t("title")}
        </h1>
      </div>

      {/* form card */}
      <div className="mt-6 rounded-3xl border border-secondary bg-white p-6 shadow-sm sm:p-8">
        <textarea
          dir={textDirection}
          value={text}
          onChange={(e) => {
            if (e.target.value.length <= 200) {
              setText(e.target.value);
            }
          }}
          maxLength={200}
          placeholder={t("placeholder")}
          className="w-full h-32 resize-none rounded-xl border border-secondary bg-bg p-4 text-sm text-ft placeholder:text-ft2/70 focus:border-main focus:outline-none focus:ring-2 focus:ring-main/30 transition"
        ></textarea>
        <p className="mb-4 mt-1 text-sm text-ft2">{`${text.length}/200 ${t('char').split(' ')[1]}`}</p>

        {/* رفع ملف */}
        <label className="mb-6 flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-secondary bg-bg px-4 py-3 transition hover:border-main/40">
          <div className="flex items-center gap-2 text-sm font-semibold text-ft">
            <Paperclip className="size-4 text-main" />
            <span>{t("upload")}</span>
            <span className="text-ft2">{t("opt")}</span>
          </div>
          <input type="file" className="hidden" />
        </label>

        {/* الموافقة */}
        <div className="mb-6 flex items-start gap-3">
          <input
            type="checkbox"
            id="agree"
            className="mt-1 size-4 accent-[oklch(0.52_0.165_256)]"
          />
          <label
            htmlFor="agree"
            className="text-sm leading-relaxed text-ft2"
          >
            {t("check")}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="ms-1 font-semibold text-main hover:underline"
            >
              {t("showTerms")}
            </button>
          </label>
        </div>

        {/* زر تأكيد */}
        <button
          className="btn-primary w-full text-lg"
          onClick={handleSubmit}
        >
          {t("submit")}
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-[72px] start-0 end-0 z-50 flex items-center justify-center px-4">
          <div className="flex items-center gap-3 rounded-2xl border border-secondary bg-white p-4 shadow-xl">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
              <CheckCircle2 className="size-5 text-main" />
            </span>
            <div>
              <p className="font-bold text-ft">تم تأكيد الحجز</p>
              <p className="text-sm text-ft2">
                سيتم التواصل معك قريبًا من قبل الطبيب المختص. شكرًا لثقتك
                بمنصتنا
              </p>
            </div>
            <button
              className="ms-auto rounded-full p-1 text-ft2 transition hover:bg-secondary hover:text-main"
              onClick={() => setShowToast(false)}
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ft/40 p-4">
          <div className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-secondary bg-white p-6 shadow-2xl">
            <h2 className="mb-4 mt-2 text-center font-display text-xl font-bold text-main">
              {t("Termstitle")}
            </h2>
            <div className="whitespace-pre-wrap px-3 text-sm leading-loose text-ft">
              <p>{t("Termscontent")}</p>
            </div>
            <button
              className="btn-primary mt-5 w-full"
              onClick={() => setIsModalOpen(false)}
            >
              {t("continue")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DirectCall;
