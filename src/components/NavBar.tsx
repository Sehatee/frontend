"use client";
import {
  Bell,
  CalendarCheck,
  ClipboardMinus,
  Headset,
  HeartHandshake,
  LogOut,
  Menu,
  Settings,
  UserRound,
  X,
  Home,
  User,
  Stethoscope,
  Info,
  BadgeDollarSign,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import LangSwitcher from "./lang/LangSwitcher";
import Image from "next/image";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/user";
import { handleLogout } from "@/lib/auth";

const NavBar = () => {
  const t = useTranslations("NavBar");
  const userMenuT = useTranslations("NavBar.userMenu");
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openMenuUser, setOpenMenuUser] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const locale = Cookies.get("locale");
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMenu]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuUser(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { user, clearUser, fetchUser } = useUserStore();

  const logout = () => {
    handleLogout(); // to remove token
    clearUser(); // to remove user =>  user = null
    router.push("/"); // to redirect to home page
  };
  useEffect(() => {
    const fetchingUser = async () => {
      await fetchUser();
    };
    fetchingUser();
  }, [fetchUser]);

  return (
    <div className="py-3 px-6 bg-bg fixed top-0 left-0 w-full z-20">
      {/* in Large Screen */}
      <div className="flex gap-7 items-center justify-between">
        {/* Logo  */}
        <Link href="/" className="flex items-center gap-1">
          <HeartHandshake color="#0B62DE" size={25} />
          <h1 className="font-semibold">{t("LogoName")}</h1>
        </Link>
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
            <li className="relative text-center group">
              <Link href={"/pricing"}>
                <h1>{t("pricing")}</h1>
                {/* hover effect */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 mt-1 h-[3px] rounded bg-main transition-all duration-300
                  ${
                    pathName === "/pricing"
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
              <div className="relative z-30" ref={menuRef}>
                <button
                  onClick={() => {
                    setOpenMenuUser(!openMenuUser);
                  }}
                  className="w-10 h-10 shadow-md shadow-main rounded-full"
                >
                  <Image
                    src={user.picture || "/imgs/doctorsteam/doctor3.png"}
                    alt="user_img"
                    width={500}
                    height={500}
                    className="w-full h-full rounded-full object-cover object-top"
                    priority={false}
                  />
                </button>
                {/* user menu */}
                <div
                  className={`absolute z-40 w-[280px] xs:w-[350px] flex flex-col justify-between top-14 ${
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
                        src={user.picture || "/imgs/doctorsteam/doctor3.png"}
                        alt="user_img"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <h1 className="text-gray-700 font-semibold text-center">
                      {user.username}
                    </h1>
                  </div>
                  {/* urls */}
                  <ul className="mt-5 flex flex-col gap-2 text-gray-700 font-semibold">
                    {user.role === "admin" ? (
                      <>
                        <li className="bg-white py-2.5 xs:py-3 px-5 xs:px-7 rounded-xl hover:bg-gray-50 transition-colors">
                          <Link
                            href="/dashboard/admin/users"
                            className="flex items-center justify-between"
                          >
                            <h1>المستخدمين</h1>
                            <UserRound fill="#0B62DE" stroke="none" />
                          </Link>
                        </li>
                        <li className="bg-white py-2.5 xs:py-3 px-5 xs:px-7 rounded-xl hover:bg-gray-50 transition-colors">
                          <Link
                            href="/dashboard/admin/appointments"
                            className="flex items-center justify-between"
                          >
                            <h1>المواعيد</h1>
                            <CalendarCheck color="#0B62DE" />
                          </Link>
                        </li>
                        <li className="bg-white py-2.5 xs:py-3 px-5 xs:px-7 rounded-xl hover:bg-gray-50 transition-colors">
                          <Link
                            href="/dashboard/admin/banned-users"
                            className="flex items-center justify-between"
                          >
                            <h1>المحظورين </h1>
                            <UserRound fill="#DE0B0B" stroke="none" />
                          </Link>
                        </li>
                        <li className="bg-white py-2.5 xs:py-3 px-5 xs:px-7 rounded-xl hover:bg-gray-50 transition-colors">
                          <Link
                            href="/dashboard/admin/doctors"
                            className="flex items-center justify-between"
                          >
                            <h1>الأطباء</h1>
                            <UserRound fill="#0B62DE" stroke="white" />
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
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
                            href={`/dashboard/${user.role}/medical-records/`}
                            className="flex items-center justify-between"
                          >
                            <h1>{userMenuT("medicalRecords")}</h1>
                            <ClipboardMinus color="#0B62DE" />
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
                      </>
                    )}
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
                    <li className="bg-white  py-2.5 xs:py-3 px-5 xs:px-7 rounded-b-xl hover:bg-red-500 transition-colors group">
                      <button
                        onClick={logout}
                        className="w-full flex items-center justify-between"
                      >
                        <h1 className="group-hover:text-white">
                          {userMenuT("logout")}
                        </h1>
                        <LogOut className="text-red-600 group-hover:text-white" />
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
              <div className="md:block hidden">
                <LangSwitcher />
              </div>
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
        className={`fixed md:hidden top-0 ${
          locale === "ar" ? "right-0" : "left-0"
        } bg-black/40 z-50 w-full h-full transition-opacity duration-300 ease-in-out ${
          openMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenMenu(false)}
      >
        <div
          className={`bg-gradient-to-bl from-blue-50 via-white to-blue-50 absolute top-0 ${
            locale === "ar" ? "left-0" : "right-0"
          } w-[280px] h-full bg-white ${
            locale === "ar" ? "rounded-r-xl" : "rounded-l-xl"
          } shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            openMenu
              ? "translate-x-0"
              : locale === "ar"
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
        >
          {/* Menu Items */}
          <ul className="flex flex-col py-4 text-gray-800 text-lg font-semibold space-y-2">
            <Link
              href="/"
              className={`flex items-center gap-3 h-20 px-4 rounded-xl hover:bg-secondary transition duration-200 ${
                pathName === "/" ? "text-blue-600 font-bold" : "text-gray-600"
              }`}
              onClick={() => setOpenMenu(false)}
            >
              <Home className="w-5 h-5" />
              <span>{t("home")}</span>
            </Link>

            <Link
              href="/doctors"
              className={`flex items-center gap-3 h-20 px-4 rounded-xl hover:bg-secondary transition duration-200 ${
                pathName === "/doctors"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600"
              }`}
              onClick={() => setOpenMenu(false)}
            >
              <User className="w-5 h-5" />
              <span>{t("doctors")}</span>
            </Link>

            <Link
              href="/services"
              className={`flex items-center gap-3 h-20 px-4 rounded-xl hover:bg-secondary transition duration-200 ${
                pathName === "/services"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600"
              }`}
              onClick={() => setOpenMenu(false)}
            >
              <Stethoscope className="w-5 h-5" />
              <span>{t("services")}</span>
            </Link>

            <Link
              href="/about"
              className={`flex items-center gap-3 h-20 px-4 rounded-xl hover:bg-secondary transition duration-200 ${
                pathName === "/about"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600"
              }`}
              onClick={() => setOpenMenu(false)}
            >
              <Info className="w-5 h-5" />
              <span>{t("about")}</span>
            </Link>

            <Link
              href="/pricing"
              className={`flex items-center gap-3 h-20 px-4 rounded-xl hover:bg-secondary transition duration-200 ${
                pathName === "/pricing"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600"
              }`}
              onClick={() => setOpenMenu(false)}
            >
              <BadgeDollarSign className="w-5 h-5" />
              <span>{t("pricing")}</span>
            </Link>
          </ul>
          <div className="flex justify-between items-center  px-4 py-6 border-t border-b border-gray-100 rounded-t-xl">
            <p className="text-sm text-gray-500 mb-2">{t("language")}</p>
            <LangSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
