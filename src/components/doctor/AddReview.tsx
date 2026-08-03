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
    <div className="border-t border-secondary bg-white p-4 sm:p-6">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <textarea
          rows={3}
          placeholder={t("writeYourReview")}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoading}
          className="w-full rounded-xl border border-secondary bg-bg p-4 text-ft placeholder:text-ft2/70 focus:border-main focus:outline-none focus:ring-2 focus:ring-main/30 transition"
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => !isLoading && handleStarClick(star)}
                className={`size-6 cursor-pointer transition ${
                  isLoading ? "opacity-50" : ""
                } ${rating >= star ? "text-star" : "text-ft2"}`}
                fill={rating >= star ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            ))}
            {rating > 0 && (
              <span className="ms-2 text-sm font-semibold text-main">
                {rating}/5
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t("submitting")}
              </>
            ) : (
              t("submit")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
