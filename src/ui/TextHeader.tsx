import React from "react";

const TextHeader = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="flex flex-col gap-3  items-center py-3">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
        {title}
      </h1>
      <p className="text-base  sm:text-lg md:text-xl font-medium text-textSecondary text-center mt-2">
        {subTitle}
      </p>
    </div>
  );
};

export default TextHeader;
