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
                className="size-5 text-ft2"
                strokeWidth={1.5}
                fill="none"
              />
              <StarHalf
                className={`size-5 text-star absolute top-0 ${isRTL ? "right-0 scale-x-[-1]" : "left-0"}`}
                strokeWidth={1.5}
                fill="currentColor"
              />
            </div>
          );
        }

        return (
          <Star
            key={index}
            className={`size-5 ${isFullStar ? "text-star" : "text-ft2"}`}
            strokeWidth={1.5}
            fill={isFullStar ? "currentColor" : "none"}
          />
        );
      })}
    </div>
  );
};

export default RenderStars;
