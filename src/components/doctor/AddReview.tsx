"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { createReview } from "@/lib/api/review";
import { useUserStore } from "@/stores/user";
import { Review } from "@/types/Review";
import showToast from "@/utils/showToast";
const AddReview = ({
  doctorId,
  reviews,
  setReviews,
}: {
  doctorId: string;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}) => {
  const t = useTranslations("Doctor");

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const locale = Cookies.get("locale");

  const token = Cookies.get("token");
  const { user, setUser } = useUserStore();

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || rating === 0) {
      return showToast("error", "من فضلك أدخل تقييم صحيح");
    }

    setIsLoading(true);
    try {
      // Submit logic here (e.g., API call)
      console.log(token);
      const newReview = await createReview(token || " ", doctorId, {
        content,
        rating,
      });
      if (user) {
        setUser({
          ...user,
          reviews: [...user.reviews, newReview._id],
        });

        setReviews([...reviews, newReview]);
      }
      setContent("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white py-7 border-t">
      <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={t("writeYourReview")}
            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
          />
          <div
            className={`absolute ${
              locale === "ar" ? "left-3" : "right-3"
            } top-1/2 -translate-y-1/2 flex gap-1`}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="relative flex items-center">
                <Star
                  onClick={() => !isLoading && handleStarClick(star)}
                  className={`w-5 h-5 cursor-pointer ${
                    isLoading ? "opacity-50" : ""
                  } ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                  fill={rating >= star ? "currentColor" : "none"}
                  strokeWidth={1.5}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center ${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t("submitting")}
            </>
          ) : (
            t("submit")
          )}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
