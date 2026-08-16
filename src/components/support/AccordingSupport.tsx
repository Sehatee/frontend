"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

const AccordingSupport = () => {
  const t = useTranslations("Support");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-2xl border bg-white px-6 transition-all duration-300 ${
              isOpen
                ? "border-main/25 shadow-lg shadow-main/5"
                : "border-secondary"
            }`}
          >
            <button
              className="flex w-full items-center justify-between gap-4 py-5 text-start font-semibold text-ft transition-colors duration-300 hover:text-main"
              onClick={() => toggleAccordion(index)}
              aria-expanded={isOpen}
            >
              <span>{t(`faq.questions.${index}.question`)}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-main transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out-quart ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden min-h-0">
                <div className={`py-5 ${isOpen ? "border-t border-secondary" : ""}`}>
                  <p className="leading-relaxed text-ft2">
                    {t(`faq.questions.${index}.answer`)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordingSupport;
