"use client";
import Cookies from "js-cookie";
import { ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FlagIcon, FlagIconCode } from "react-flag-kit";

const LangSwitcher = () => {
  const languages: { key: FlagIconCode; code: string; name: string }[] = [
    { key: "DZ", code: "ar", name: "العربية" },
    { key: "GB", code: "en", name: "English" },
    // { key: "FR", code: "fr", name: "Français" },
  ];
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(Cookies.get("locale"));
  const selectedLanguage = languages.find(
    (lang) => lang.code === currentLang
  ) || { key: "GB", code: "en", name: "English" };
  const handleLanguageChange = (newLang: string) => {
    Cookies.set("locale", newLang);
    setCurrentLang(newLang);
    setIsOpen(false);
    router.refresh();
  };
  console.log(currentLang);
  return (
    <div className="relative inline-block text-left z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 py-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none transition"
      >
        <FlagIcon code={selectedLanguage.key} size={24} />
        <ArrowDown size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 px-2 w-[70px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex justify-center   px-4 py-2 text-sm hover:bg-gray-100 transition ${
                  currentLang === lang.code ? "bg-gray-100 font-semibold" : ""
                }`}
              >
                <FlagIcon code={lang.key} size={20} className="mr-2" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LangSwitcher;
