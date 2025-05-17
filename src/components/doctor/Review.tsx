import { Review as ReviewType } from "@/types/User";
import RenderStars from "@/ui/RenderStars";
import { MessageCircle, MessageSquare } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

interface ReviewProps {
  review?: ReviewType;
}

const Review = ({ review }: ReviewProps) => {
  const t = useTranslations("Doctor");
 
  if (!review) {
    return (
      <div className="border flex flex-col items-center justify-center py-8 px-4 bg-gray-50 rounded-lg">
        <MessageSquare className="w-12 h-12 text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {t("noReviews")}{" "}
        </h3>
        <p className="text-gray-500 text-center">{t("beFirstReview")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={review.patientId.picture || "/imgs/navbar/user.png"}
            alt={review.patientId.username}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                {review.patientId.username}
              </span>
              <RenderStars rating={review.rating} />
            </div>
            <span className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-2">{review.content}</p>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MessageCircle className="w-4 h-4" />
            <span>Review</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
