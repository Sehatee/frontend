"use client";

import React, { useState } from "react";
import Review from "./Review";
import { Review as ReviewType } from "@/types/Review";
import AddReview from "./AddReview";
import { useTranslations } from "next-intl";
import { useUserStore } from "@/stores/user";

const Reviews = ({
  doctorId,
  initialReviews,
}: {
  doctorId: string;
  initialReviews: ReviewType[];
}) => {
  const t = useTranslations("Doctor");
  const { user } = useUserStore();
  const [allReviews, setAllReviews] = useState(initialReviews);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-[400px] relative">
      <h2 className="text-xl font-semibold mb-4">{t("patientReviews")}</h2>

      <div className="space-y-4 overflow-y-auto h-[calc(100%-140px)]">
        {allReviews && allReviews.length > 0 ? (
          allReviews.map((review: ReviewType) => (
            <Review key={review._id} review={review} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-20">
            <p className="text-lg font-semibold mb-1">لا توجد تقييمات حتى الآن</p>
            <p className="text-sm text-gray-400">كن أول من يشارك تجربته مع هذا الطبيب</p>
          </div>
        )}
      </div>

      {user?.role === "patient" && (
        <AddReview
          doctorId={doctorId}
          reviews={allReviews}
          setReviews={setAllReviews}
        />
      )}
    </div>
  );
};

export default Reviews;
