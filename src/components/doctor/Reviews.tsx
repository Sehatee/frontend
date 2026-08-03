"use client";

import React, { useState } from "react";
import Review from "./Review";
import { Review as ReviewType } from "@/types/Review";
import AddReview from "./AddReview";
import { useTranslations } from "next-intl";
import { useUserStore } from "@/stores/user";
import { MessageSquare } from "lucide-react";

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
    <div className="flex h-[520px] flex-col rounded-3xl border border-secondary bg-white p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="eyebrow">{t("patientReviews")}</span>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pe-1">
        {allReviews && allReviews.length > 0 ? (
          allReviews.map((review: ReviewType) => (
            <Review key={review._id} review={review} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <MessageSquare className="size-7 text-main" />
            </div>
            <p className="text-lg font-semibold text-ft">{t("noReviews")}</p>
            <p className="mt-1 text-sm text-ft2">{t("beFirstReview")}</p>
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
