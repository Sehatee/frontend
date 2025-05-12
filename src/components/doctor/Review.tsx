import RenderStars from "@/ui/RenderStars";
import { MessageCircle } from "lucide-react";
import React from "react";

const Review = ({
  review,
}: {
  review: {
    id: string;
    patientName: string;
    rating: number;
    comment: string;
    date: string;
  };
}) => {
  return (
    <div key={review.id} className="border-b pb-4 last:border-0">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          <span className="font-medium">{review.patientName}</span>
        </div>
        <RenderStars rating={review.rating} />
      </div>
      <p className="text-gray-600 mb-2">{review.comment}</p>
      <span className="text-sm text-gray-500">{review.date}</span>
    </div>
  );
};

export default Review;
