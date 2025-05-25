"use client";
import React, { useState } from "react";
import Review from "./Review";
import { Review as ReviewType } from "@/types/Review";
import AddReview from "./AddReview";
import { useTranslations } from "next-intl";

const Reviews = ({
  doctorId,
  initialReviews,
}: {
  doctorId: string;
  initialReviews: ReviewType[];
}) => {
  const t = useTranslations("Doctor");
  const [allReviews, setAllReviews] = useState(initialReviews);
  return (
    <>
      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-md p-6 h-[400px] relative">
        <h2 className="text-xl font-semibold mb-4">{t("patientReviews")}</h2>
        <div className="space-y-4 overflow-y-auto h-[calc(100%-140px)]">
          {allReviews && allReviews?.length > 0 ? (
            allReviews.map((review: ReviewType) => (
              <Review key={review._id} review={review} />
            ))
          ) : (
            <Review />
          )}
        </div>

        <AddReview
          doctorId={doctorId}
          reviews={allReviews}
          setReviews={setAllReviews}
        />
      </div>
    </>
  );
};

export default Reviews;
