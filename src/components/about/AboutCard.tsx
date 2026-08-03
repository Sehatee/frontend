"use client";
import React from "react";

const AboutCard = ({
  icon: Icon,
  title,
  des,
  number,
  variant = "default",
}: {
  icon: React.ElementType;
  title: string;
  des: string;
  number?: number;
  variant?: "default" | "main";
}) => {
  const isMain = variant === "main";
  return (
    <div
      className={`group relative flex flex-col items-start gap-5 overflow-hidden rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl ${
        isMain
          ? "bg-main text-white hover:shadow-main/30"
          : "border border-secondary bg-white text-ft hover:shadow-main/10"
      }`}
    >
      {number !== undefined && (
        <span
          aria-hidden="true"
          className={`absolute end-6 top-6 font-display text-6xl font-bold transition-colors duration-300 ${
            isMain ? "text-white/10" : "text-main/10 group-hover:text-accent/25"
          }`}
        >
          {String(number).padStart(2, "0")}
        </span>
      )}
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 ${
          isMain
            ? "bg-white/15 text-accent"
            : "bg-main text-white group-hover:bg-accent"
        }`}
      >
        <Icon size={28} strokeWidth={1.75} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className={`text-xl font-bold ${isMain ? "text-white" : "text-ft"}`}>
          {title}
        </h3>
        <p
          className={`text-sm leading-relaxed ${
            isMain ? "text-white/75" : "text-ft2"
          }`}
        >
          {des}
        </p>
      </div>
    </div>
  );
};

export default AboutCard;
