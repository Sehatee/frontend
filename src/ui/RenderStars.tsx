import React from "react";
import { Star, StarHalf } from "lucide-react";
import { useLocale } from "next-intl";

interface Props {
  rating: number;
}
const RenderStars = ({ rating }: Props) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return Array(5)
    .fill(0)
    .map((_, index) => {
      const isHalfStar = index + 0.5 === rating;
      const isFullStar = index < rating;

      if (isHalfStar) {
        return (
          <div key={index} className="relative">
            <Star
              stroke="gold"
              className=" w-5 h-5 fill-gray-300 text-gray-300"
            />
            <StarHalf
              className={`w-5 h-5 fill-yellow-400  text-yellow-400 absolute top-0 ${
                isRTL ? "right-0 scale-x-[-1]" : "left-0"
              }`}
              stroke="gold"
              fill="gold"
            />
          </div>
        );
      }

      return (
        <Star
          key={index}
          className={`w-5 h-5 ${
            isFullStar
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-300 text-gray-300"
          }`}
          stroke="gold"
          fill="gold"
        />
      );
    });
};

export default RenderStars;
