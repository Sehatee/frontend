"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBarDashboards = ({
  links,
}: {
  links: {
    name: string;
    href: string;
  }[];
}) => {
  const pathName = usePathname();
  return (
    <div className=" sticky top-20 z-10 bg-secondary w-full rounded-lg  py-2 px-3">
      <div className="flex justify-center gap-6 text-sm w-full">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`w-1/2 text-center ${
              link.href === pathName ? "bg-white" : ""
            } rounded-lg py-4 px-3 font-medium`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBarDashboards;
