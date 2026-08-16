"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import React from "react";

const SideBarDashboards = ({
  links,
}: {
  links: {
    name: string;
    href: string;
    icon?: LucideIcon;
  }[];
}) => {
  const pathName = usePathname();
  return (
    <nav className="w-full rounded-2xl border border-secondary bg-white p-2 shadow-sm">
      <ul className="flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:justify-center">
        {links.map((link, index) => {
          const isActive = link.href === pathName;
          const Icon = link.icon;
          return (
            <li key={index} className="w-full sm:w-auto">
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-ft2 hover:bg-secondary hover:text-main"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-main shadow-md"
                    transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {Icon && <Icon className="size-4" />}
                  {link.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideBarDashboards;
