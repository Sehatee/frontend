"use client";
import Cookies from "js-cookie";

const LangSwitcher = () => {
  const changeLang = (newLang: string) => {
    Cookies.set("locale", newLang);
    location.reload();
  };
  return (
    <div className="flex gap-2">
      <button
        className="capitalize text-red-400"
        onClick={() => {
          changeLang("en");
        }}
      >
        <p>en</p>
      </button>
      <button
        className="capitalize text-red-400"
        onClick={() => {
          changeLang("ar");
        }}
      >
        <p>ar</p>
      </button>
    </div>
  );
};

export default LangSwitcher;
