import React from "react";
import { Star, StarHalf } from "lucide-react";
import { useLocale } from "next-intl";

interface Props {
  rating: number;
}

const RenderStars = ({ rating }: Props) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="flex gap-0.5">
      {Array(5).fill(0).map((_, index) => {
        const isHalfStar = index + 0.5 === rating;
        const isFullStar = index < rating;

        if (isHalfStar) {
          return (
            <div key={index} className="relative">
              <Star
                className="w-5 h-5 text-gray-300"
                strokeWidth={1.5}
                fill="white"
                stroke="#FBBF24"
              />
              <StarHalf
                className={`w-5 h-5 text-yellow-400 absolute top-0 ${isRTL ? "right-0 scale-x-[-1]" : "left-0"}`}
                strokeWidth={1.5}
                fill="#FBBF24"
              />
            </div>
          );
        }

        return (
          <Star
            key={index}
            className={`w-5 h-5 ${isFullStar ? "text-yellow-400" : "text-gray-300"}`}
            strokeWidth={1.5}
            fill={isFullStar ? "#FBBF24" : "white"}
            stroke="#FBBF24"
          />
        );
      })}
    </div>
  );
};

export default RenderStars;
