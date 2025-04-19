"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import { FlagIcon, FlagIconCode } from "react-flag-kit";

const LangSwitcher = () => {
  const languages: { key: FlagIconCode; code: string; name: string }[] = [
    { key: 'SA', code: 'ar', name: 'العربية' },
    { key: 'GB', code: 'en', name: 'English' },
    // { key: 'FR', code: 'fr', name: 'Français' },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = Cookies.get("locale") || "en";
  const selectedLanguage =
    languages.find((lang) => lang.code === currentLang) || languages[1];
  const handleLanguageChange = (newLang: string) => {
    Cookies.set("locale", newLang);
    location.reload();
  };
  return (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none transition"
      >
        <FlagIcon code={selectedLanguage.key} size={24} />
        <span>{selectedLanguage.name}</span>
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[140px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 transition ${
                  currentLang === lang.code ? "bg-gray-100 font-semibold" : ""
                }`}
              >
                <FlagIcon
                  code={lang.key}
                  size={20}
                  className="mr-2"
                />
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LangSwitcher;
