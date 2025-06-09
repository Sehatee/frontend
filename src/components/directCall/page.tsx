"use client";
import React from "react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

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
    <div className="bg-white mt-32 p-6 md:p-8 rounded-2xl shadow-md max-w-xl w-full mx-auto border ">
      {/* العنوان */}
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        {t("title")}
      </h2>

      {/* مربع النص */}
      <textarea
        dir={textDirection}
        value={text}
        onChange={(e) => {
          if(e.target.value.length <= 200) {
            setText(e.target.value);
          }
          
        }}
        maxLength={200}
        placeholder={t("placeholder")}
        className="w-full h-32 border rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-1"
      ></textarea>
      <p className="text-sm text-gray-500 mb-4">{`${text.length}/200 ${t('char').split(' ')[1]}`}</p>

      {/* رفع ملف */}
      <label className="flex items-center justify-between px-4 py-3 border rounded-xl cursor-pointer mb-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          {/* أيقونة ورق */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828L18 10.828a4 4 0 00-5.656-5.656L5.343 12.172a6 6 0 008.485 8.485L20.485 14"
            />
          </svg>
          <span>{t("upload")}</span>
          <span className="text-gray-400">{t("opt")}</span>
        </div>
        <input type="file" className="hidden" />
      </label>

      {/* الموافقة */}
      <div className="flex items-start gap-2 mb-6">
        <input type="checkbox" id="agree" className="mt-1" />
        <label
          htmlFor="agree"
          className="text-sm leading-relaxed text-gray-700"
        >
          {t("check")}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:underline"
          >
            {t("showTerms")}
          </button>
        </label>
      </div>

      {/* زر تأكيد */}
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-xl transition"
        onClick={handleSubmit}
      >
        {t("submit")}
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-[72px] left-0 right-0 flex items-center justify-center">
          <div className="bg-green-100 text-black p-4 rounded-md shadow-lg flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <p className="font-bold">تم تأكيد الحجز</p>
              <p className="text-sm">
                سيتم التواصل معك قريبًا من قبل الطبيب المختص. شكرًا لثقتك
                بمنصتنا
              </p>
            </div>
            <button
              className="ml-auto text-gray-500 hover:text-gray-700"
              onClick={() => setShowToast(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center ">
          <div className="bg-white max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 rounded-xl shadow-lg relative">
            <h2 className="text-xl font-bold text-center mb-4 text-main mt-2">
              {t("Termstitle")}
            </h2>
            <div
              className={`text-sm text-ft leading-loose whitespace-pre-wrap px-3`}
            >
              <p>{t("Termscontent")}</p>
            </div>
            <button
              className="bg-main text-white w-full py-2 mt-5 text-lg rounded-md hover:bg-blue-700"
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
