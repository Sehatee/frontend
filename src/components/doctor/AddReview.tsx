"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Star } from "lucide-react";
import Cookies from "js-cookie";
import { createReview } from "@/lib/api/review";
import { useUserStore } from "@/stores/user";
const AddReview = ({ doctorId }: { doctorId: string }) => {
  const t = useTranslations("Doctor");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const locale = Cookies.get("locale");
  const token = Cookies.get("token");
  const { user, setUser } = useUserStore();

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here (e.g., API call)
    const newReview = await createReview(token || " ", doctorId, {
      content,
      rating,
    });
    if (user) {
      setUser({
        ...user,
        reviews: [...user.reviews, newReview._id],
      });
    }
    setContent("");
    setRating(0);
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
          />
          <div
            className={`absolute ${
              locale === "ar" ? "left-3" : "right-3"
            } top-1/2 -translate-y-1/2 flex gap-1`}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="relative flex items-center">
                <Star
                  onClick={() => handleStarClick(star)}
                  className={`w-5 h-5 cursor-pointer ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill={rating >= star ? "currentColor" : "none"}
                  strokeWidth={1.5}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t("submit")}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
