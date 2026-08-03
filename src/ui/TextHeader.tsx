import React from "react";

interface TextHeaderProps {
  title: string;
  subTitle: string;
  eyebrow?: string;
  align?: "center" | "start";
  accent?: boolean;
}

const TextHeader = ({
  title,
  subTitle,
  eyebrow,
  align = "center",
  accent = false,
}: TextHeaderProps) => {
  const isStart = align === "start";
  const containerAlign = isStart ? "items-start" : "items-center";
  const textAlign = isStart ? "text-start" : "text-center";

  const words = title.trim().split(/\s+/);
  const lastWord = words.length > 0 ? words[words.length - 1] : "";
  const titleStart =
    accent && words.length > 1 ? words.slice(0, -1).join(" ") : null;

  return (
    <div className={`flex flex-col gap-3 py-3 ${containerAlign}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1
        className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ft ${textAlign}`}
      >
        {titleStart && <>{titleStart} </>}
        {accent ? <span className="text-accent">{lastWord}</span> : title}
      </h1>
      <p
        className={`text-base sm:text-lg md:text-xl font-medium text-textSecondary mt-2 ${textAlign}`}
      >
        {subTitle}
      </p>
    </div>
  );
};

export default TextHeader;
