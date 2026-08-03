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
  Home, User, Stethoscope, Info, BadgeDollarSign
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import LangSwitcher from "./lang/LangSwitcher";
import Image from "next/image";
import { useUserStore } from "@/stores/user";
import { handleLogout } from "@/lib/auth";

const NavBar = () => {
  const t = useTranslations("NavBar");
  const userMenuT = useTranslations("NavBar.userMenu");
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openMenuUser, setOpenMenuUser] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const isArabic = locale === "ar";
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

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/doctors", label: t("doctors") },
    { href: "/services", label: t("services") },
    { href: "/about", label: t("about") },
    { href: "/pricing", label: t("pricing") },
  ];

  const navMobileIcons: Record<string, React.ReactNode> = {
    "/": <Home className="w-5 h-5" />,
    "/doctors": <User className="w-5 h-5" />,
    "/services": <Stethoscope className="w-5 h-5" />,
    "/about": <Info className="w-5 h-5" />,
    "/pricing": <BadgeDollarSign className="w-5 h-5" />,
  };

  const userMenuItemClass =
    "flex items-center justify-between rounded-xl px-4 py-2.5 text-ft transition-colors hover:bg-secondary";

  return (
    <div className="py-3 px-6 bg-bg fixed top-0 start-0 w-full z-20">
      {/* in Large Screen */}
      <div className="flex gap-7 items-center justify-between">
        {/* Logo  */}
        <Link href="/" className="flex items-center gap-1">
          <HeartHandshake className="text-main" size={25} />
          <h1 className="font-display font-bold text-ft">{t("LogoName")}</h1>
        </Link>
        {/* Menu and btns */}
        <div className=" w-full flex gap-9  justify-end">
          {/* Menu */}
          <ul className="xs:hidden md:flex gap-1 items-center  font-semibold">
            {navLinks.map((link) => (
              <li key={link.href} className="relative text-center">
                <Link
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    pathName === link.href
                      ? "bg-secondary text-main"
                      : "text-ft2 hover:bg-secondary hover:text-main"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* if user is logged in */}
          <div className="flex gap-2">
            {user ? (
              <div className="relative z-30" ref={menuRef}>
                <button
                  onClick={() => {
                    setOpenMenuUser(!openMenuUser);
                  }}
                  className="w-10 h-10 shadow-md shadow-main/20 rounded-full"
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
                  className={`absolute z-40 w-[300px] md:w-[350px] flex flex-col  justify-between top-full mt-2 end-0 bg-white border border-secondary rounded-2xl p-3 shadow-lg shadow-main/10 md:text-base text-sm transition-all duration-300 ease-in-out ${
                    openMenuUser
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {/* btn close  */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setOpenMenuUser(false);
                      }}
                      className="rounded-full p-1.5 text-ft2 transition-colors hover:text-accent"
                      aria-label="close"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  {/* user informations */}
                  <div className="flex flex-col gap-2 items-center justify-center mt-1">
                    <div className="w-12 h-12 overflow-hidden rounded-full ring-2 ring-main">
                      <Image
                        src={user.picture || "/imgs/doctorsteam/doctor3.png"}
                        alt="user_img"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <h1 className="text-ft font-semibold text-center">
                      {user.username}
                    </h1>
                  </div>
                  {/* urls */}
                  <ul className="mt-5 flex flex-col gap-1 text-ft font-semibold">
                    {user.role === "admin" ? (
                      <>
                        <li className={userMenuItemClass}>
                          <Link
                            href="/dashboard/admin/users"
                            className="flex items-center justify-between w-full"
                          >
                            <span>المستخدمين</span>
                            <UserRound className="text-main" fill="currentColor" stroke="none" />
                          </Link>
                        </li>
                        <li className={userMenuItemClass}>
                          <Link
                            href="/dashboard/admin/appointments"
                            className="flex items-center justify-between w-full"
                          >
                            <span>المواعيد</span>
                            <CalendarCheck className="text-main" />
                          </Link>
                        </li>
                        <li className={userMenuItemClass}>
                          <Link
                            href="/dashboard/admin/banned-users"
                            className="flex items-center justify-between w-full"
                          >
                            <span>المحظورين </span>
                            <UserRound className="text-accent" fill="currentColor" stroke="none" />
                          </Link>
                        </li>
                        <li className={userMenuItemClass}>
                          <Link
                            href="/dashboard/admin/doctors"
                            className="flex items-center justify-between w-full"
                          >
                            <span>الأطباء</span>
                            <UserRound className="text-main" fill="currentColor" />
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className={userMenuItemClass}>
                          <Link
                            href={`/dashboard/${user.role}/profile/info`}
                            className="flex items-center justify-between w-full"
                          >
                            <span>{userMenuT("profile")}</span>
                            <UserRound className="text-main" fill="currentColor" stroke="none" />
                          </Link>
                        </li>
                        <li className={userMenuItemClass}>
                          <Link
                            href={`/dashboard/${user.role}/settings/notifications`}
                            className="flex items-center justify-between w-full"
                          >
                            <span>{userMenuT("notifications")}</span>
                            <Bell className="text-main" fill="currentColor" stroke="none" />
                          </Link>
                        </li>
                        <li className={userMenuItemClass}>
                          <Link
                            href={`/dashboard/${user.role}/appointments/`}
                            className="flex items-center justify-between w-full"
                          >
                            <span>{userMenuT("appointments")}</span>
                            <CalendarCheck className="text-main" />
                          </Link>
                        </li>
                        <li className={userMenuItemClass}>
                          <Link
                            href={`/dashboard/${user.role}/medical-records/`}
                            className="flex items-center justify-between w-full"
                          >
                            <span>{userMenuT("medicalRecords")}</span>
                            <ClipboardMinus className="text-main" />
                          </Link>
                        </li>
                        <li className={userMenuItemClass}>
                          <Link
                            href={`/dashboard/${user.role}/settings/account`}
                            className="flex items-center justify-between w-full"
                          >
                            <span>{userMenuT("settings")}</span>
                            <Settings className="text-main" fill="currentColor" />
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                  {/* logout */}
                  <ul className="mt-5 flex flex-col gap-1 text-ft font-semibold">
                    <li className="rounded-xl transition-colors hover:bg-secondary">
                      <Link
                        href={"/support"}
                        className="flex items-center justify-between px-4 py-2.5 w-full"
                      >
                        <span>{userMenuT("support")}</span>
                        <Headset className="text-main" />
                      </Link>
                    </li>
                    <li className="rounded-xl transition-colors hover:bg-accent group">
                      <button
                        onClick={logout}
                        className="w-full flex items-center justify-between px-4 py-2.5 "
                      >
                        <span className="group-hover:text-white">
                          {userMenuT("logout")}
                        </span>
                        <LogOut className="text-accent group-hover:text-white " />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                {/* login btn */}
                <Link href={"/login"} className="text-main font-medium hover:underline">
                  {t("login")}
                </Link>
                {/* signup btn */}
                <Link
                  href={"/signup"}
                  className="py-2 px-3 rounded-lg bg-main text-white text-sm font-semibold transition-colors duration-300 hover:bg-mainLight"
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
                className="md:hidden block text-ft  p-2 rounded-md z-20 "
                aria-label="menu"
              >
                {openMenu ? (
                  <X size={25} className="text-accent" />
                ) : (
                  <Menu size={25} className="text-main" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
        
      {/* in Small Screen */}
        <div
          className={`fixed md:hidden inset-0 bg-ft/40 z-50 w-full h-full transition-opacity duration-300 ease-in-out ${
            openMenu ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpenMenu(false)}
        >
          <div
            className={`absolute top-0 inset-y-0 start-0 w-[280px] h-full bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${
              openMenu
              ? "translate-x-0"
              : isArabic
              ? "translate-x-full"
              : "-translate-x-full"
            }`}
          >

            {/* Menu Items */}
            <ul className="flex flex-col py-4 px-3 text-ft text-lg font-semibold space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200 ${
                    pathName === link.href
                      ? "text-main font-bold bg-secondary"
                      : "text-ft2 hover:bg-secondary hover:text-main"
                  }`}
                  onClick={() => setOpenMenu(false)}
                >
                  {navMobileIcons[link.href]}
                  <span>{link.label}</span>
                </Link>
              ))}
            </ul>
            <div className="flex justify-between items-center  px-4 py-6 border-t border-secondary rounded-t-xl">
            <p className="text-sm text-ft2 mb-2">{t("language")}</p>
                <LangSwitcher />
            </div>
          </div>
        </div>
    </div>
    );
  };

  export default NavBar;
