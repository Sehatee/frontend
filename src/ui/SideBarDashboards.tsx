"use client";
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
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-main text-white shadow-md"
                    : "text-ft2 hover:bg-secondary hover:text-main"
                }`}
              >
                {Icon && <Icon className="size-4" />}
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideBarDashboards;
