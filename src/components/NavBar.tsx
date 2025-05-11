"use client";
import {
  Bell,
  CalendarCheck,
  Headset,
  HeartHandshake,
  LogOut,
  Menu,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import LangSwitcher from "./lang/LangSwitcher";
import Image from "next/image";
import Cookies from "js-cookie";

const NavBar = () => {
  const t = useTranslations("NavBar");
  const userMenuT = useTranslations("NavBar.userMenu");
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openMenuUser, setOpenMenuUser] = useState<boolean>(false);

  const locale = Cookies.get("locale");

  const pathName = usePathname();

  // const user = null;
  const user = {
    role: "patient",
  };

  return (
    <div className="py-3 px-6 bg-bg fixed top-0 left-0 w-full z-20">
      {/* in Large Screen */}
      <div className="flex gap-7 items-center justify-between">
        {/* Logo  */}
        <div className="flex items-center gap-1">
          <HeartHandshake color="#0B62DE" size={25} />
          <h1 className="font-semibold">{t("LogoName")}</h1>
        </div>
        {/* Menu and btns */}
        <div className=" w-full flex gap-9  justify-end">
          {/* Menu */}
          <ul className="xs:hidden md:flex gap-6 items-center  font-semibold">
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
              {/*  */}
            </li>
            <li className="relative text-center group">
              <Link href={"/doctors"}>
                <h1>{t("doctors")}</h1>
                {/* hover effect */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 mt-1 h-[3px] rounded bg-main transition-all duration-300
                  ${
                    pathName === "/doctors"
                      ? "w-5 opacity-100"
                      : "w-0 group-hover:w-5 opacity-0 group-hover:opacity-100"
                  }
                `}
                ></div>
              </Link>
            </li>
            <li className="relative text-center group">
              <Link href={"/services"}>
                <h1>{t("services")}</h1>
                {/* hover effect */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 mt-1 h-[3px] rounded bg-main transition-all duration-300
                  ${
                    pathName === "/services"
                      ? "w-5 opacity-100"
                      : "w-0 group-hover:w-5 opacity-0 group-hover:opacity-100"
                  }
                `}
                ></div>{" "}
              </Link>
            </li>
            <li className="relative text-center group">
              <Link href={"/about"}>
                <h1>{t("about")}</h1>
                {/* hover effect */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 mt-1 h-[3px] rounded bg-main transition-all duration-300
                  ${
                    pathName === "/about"
                      ? "w-5 opacity-100"
                      : "w-0 group-hover:w-5 opacity-0 group-hover:opacity-100"
                  }
                `}
                ></div>
              </Link>
            </li>
          </ul>
          {/* if user is logged in */}
          <div className="flex gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setOpenMenuUser(!openMenuUser);
                  }}
                  className="w-10 h-10 shadow-md shadow-main rounded-full"
                >
                  <Image
                    src={"/imgs/navbar/user.png"}
                    alt="user_img"
                    width={500}
                    height={500}
                    className="w-full h-full rounded-full object-cover"
                  />
                </button>
                {/* user menu */}
                <div
                  className={`absolute z-10 w-[280px] xs:w-[350px] flex flex-col justify-between top-14 ${
                    locale === "ar"
                      ? "-right-32 xs:-right-56"
                      : "-left-32 xs:-left-56"
                  } bg-secondary shadow-md shadow-gray-300 rounded-md p-3 transition-all duration-300 ease-in-out ${
                    openMenuUser
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                  dir={locale === "ar" ? "rtl" : "ltr"}
                >
                  {/* btn close  */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setOpenMenuUser(false);
                      }}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  {/* user informations */}
                  <div className="flex flex-col gap-2 items-center justify-center mb-2">
                    <div className="w-12 h-12 overflow-hidden rounded-full">
                      <Image
                        src={"/imgs/navbar/user.png"}
                        alt="user_img"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="text-gray-700 font-semibold text-center">
                      كاس عماد
                    </h1>
                  </div>
                  {/* urls */}
                  <ul className="mt-5 flex flex-col gap-2 text-gray-700 font-semibold">
                    <li className="bg-white py-2.5 xs:py-3 px-5 xs:px-7 rounded-xl hover:bg-gray-50 transition-colors">
                      <Link
                        href={`/dashboard/${user.role}/profile/info`}
                        className="flex items-center justify-between"
                      >
                        <h1>{userMenuT("profile")}</h1>
                        <UserRound fill="#0B62DE" stroke="none" />
                      </Link>
                    </li>
                    <li className="bg-white py-2.5 xs:py-3 px-5 xs:px-7 rounded-xl hover:bg-gray-50 transition-colors">
                      <Link
                        href={`/dashboard/${user.role}/settings/notifications`}
                        className="flex items-center justify-between"
                      >
                        <h1>{userMenuT("notifications")}</h1>
                        <Bell fill="#0B62DE" stroke="none" />
                      </Link>
                    </li>
                    <li className="bg-white py-2.5 xs:py-3 px-5 xs:px-7 rounded-xl hover:bg-gray-50 transition-colors">
                      <Link
                        href={`/dashboard/${user.role}/appointments/`}
                        className="flex items-center justify-between"
                      >
                        <h1>{userMenuT("appointments")}</h1>
                        <CalendarCheck color="#0B62DE" />
                      </Link>
                    </li>
                    <li className="bg-white py-2.5 xs:py-3 px-5 xs:px-7 rounded-xl hover:bg-gray-50 transition-colors">
                      <Link
                        href={`/dashboard/${user.role}/settings/account`}
                        className="flex items-center justify-between"
                      >
                        <h1>{userMenuT("settings")}</h1>
                        <Settings fill="#0B62DE" stroke="white" />
                      </Link>
                    </li>
                  </ul>
                  {/* logout */}
                  <ul className="mt-5 flex flex-col gap-1 text-gray-700 font-semibold">
                    <li className="bg-white py-2.5 xs:py-3 px-5 xs:px-7 rounded-t-xl hover:bg-gray-50 transition-colors">
                      <Link
                        href={"/support"}
                        className="flex items-center justify-between"
                      >
                        <h1>{userMenuT("support")}</h1>
                        <Headset color="#0B62DE" />
                      </Link>
                    </li>
                    <li className="bg-white py-2.5 xs:py-3 px-5 xs:px-7 rounded-b-xl hover:bg-gray-50 transition-colors">
                      <button
                        // onClick={() => {
                        //   setOpenMenuUser(false);
                        // }}
                        className="w-full flex items-center justify-between"
                      >
                        <h1>{userMenuT("logout")}</h1>
                        <LogOut color="red" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                {/* login btn */}
                <Link href={"/login"} className="text-main font-medium">
                  {t("login")}
                </Link>
                {/* signup btn */}
                <Link
                  href={"/signup"}
                  className="py-2 px-3 hoverBtn bg-main text-white rounded "
                >
                  {t("signup")}
                </Link>
              </div>
            )}
            {/* lang switcher and menu  */}
            <div className="flex gap-2">
              {/* Lang Switcher */}
              <LangSwitcher />
              {/* Menu toggle */}
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="md:hidden block text-gray-700  p-2 rounded-md z-20 "
              >
                {openMenu ? (
                  <X size={25} color="red" />
                ) : (
                  <Menu size={25} color="#0B62DE" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* in Small Screen */}
      <div
        className={`fixed md:hidden top-0 left-0 bg-black/40 z-10 shadow-xl  px-6  py-4 w-full h-full transition-all duration-300 ease-in-out ${
          openMenu
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* Menu */}
        <ul className="flex flex-col gap-6 items-center justify-center text-white w-full h-full  font-semibold">
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
            <Link href={"/doctors"}>
              <h1>{t("doctors")}</h1>
              {/* hover effect */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-1 h-[3px] rounded bg-main transition-all duration-300
                  ${
                    pathName === "/doctors"
                      ? "w-5 opacity-100"
                      : "w-0 group-hover:w-5 opacity-0 group-hover:opacity-100"
                  }
                `}
              ></div>{" "}
            </Link>
          </li>
          <li className="relative text-center group">
            <Link href={"/"}>
              <h1>{t("services")}</h1>
              {/* hover effect */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-1 h-[3px] rounded bg-main transition-all duration-300
                  ${
                    pathName === "/services"
                      ? "w-5 opacity-100"
                      : "w-0 group-hover:w-5 opacity-0 group-hover:opacity-100"
                  }
                `}
              ></div>{" "}
            </Link>
          </li>
          <li className="relative text-center group">
            <Link href={"/about"}>
              <h1>{t("about")}</h1>
              {/* hover effect */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-1 h-[3px] rounded bg-main transition-all duration-300
                  ${
                    pathName === "/about"
                      ? "w-5 opacity-100"
                      : "w-0 group-hover:w-5 opacity-0 group-hover:opacity-100"
                  }
                `}
              ></div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
