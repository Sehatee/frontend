"use client";
import { HeartHandshake } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import LangSwitcher from "./lang/LangSwitcher";

const NavBar = () => {
  const t = useTranslations("NavBar");
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const pathName = usePathname();
  console.log(pathName === "/");

  return (
    <div className="py-3">
      <div className="flex items-center justify-between">
        {/* Logo  */}
        <div className="flex items-center gap-1">
          <HeartHandshake color="#0B62DE" size={25} />
          <h1 className="font-semibold">{t("LogoName")}</h1>
        </div>
        {/* Menu and btns */}
        <div className=" w-full flex gap-9  justify-end">
          {/* Menu */}
          <ul className="xs:hidden sm:flex gap-6 items-center  font-semibold">
            <li className="relative text-center group">
              <Link href={"/"}>
                <h1>{t("home")}</h1>
                {/* hover effect */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 mt-1 h-[3px] rounded bg-main transition-all duration-300
                  ${
                    pathName === "/"
                      ? "w-5 opacity-100"
                      : "w-0 group-hover:w-5 opacity-0 group-hover:opacity-100"
                  }
                `}
                ></div>
              </Link>
            </li>
            <li className="relative text-center group">
              <Link href={"/"}>
                <h1>{t("doctors")}</h1>
                {/* hover effect */}
                <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-0 group-hover:w-5  h-[3px] rounded bg-main opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </Link>
            </li>
            <li className="relative text-center group">
              <Link href={"/"}>
                <h1>{t("services")}</h1>
                {/* hover effect */}
                <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-0 group-hover:w-5  h-[3px] rounded bg-main opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </Link>
            </li>
            <li className="relative text-center group">
              <Link href={"/"}>
                <h1>{t("about")}</h1>
                {/* hover effect */}
                <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-0 group-hover:w-5  h-[3px] rounded bg-main opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </Link>
            </li>
          </ul>
          {/* login and signup */}
          <div className="flex gap-2 items-center">
            {/* login btn */}
            <Link href={"/login"} className="text-main font-medium">
              {t("login")}
            </Link>
            {/* signup btn */}
            <button className="py-2 px-3 hoverBtn bg-main text-white rounded ">
              {t("signup")}
            </button>
            {/* Lang Switcher */}
            <LangSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
