"use client";
import { Review as ReviewType, UpdateReview } from "@/types/Review";
import RenderStars from "@/ui/RenderStars";
import { MessageCircle, Trash2, Edit2, Star } from "lucide-react";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { deleteReview, updateReview } from "@/lib/api/review";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/user";

interface ReviewProps {
  review?: ReviewType;
}

const Review = ({ review }: ReviewProps) => {
  const t = useTranslations("Doctor");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [currentReview, setCurrentReview] = useState<ReviewType | undefined>(
    review
  );
  const { user } = useUserStore();
  const isMyReview = user?.reviews.some((reviewUser: ReviewType) => {
    return reviewUser._id === review?._id;
  });

  const token = Cookies.get("token");

  if (!currentReview) {
    return <></>;
  }

  const handleDelete = async () => {
    try {
      await deleteReview(token || "", currentReview._id);
      setCurrentReview(undefined);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleRatingClick = (value: number) => {
    setEditRating(value);
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const updateData: UpdateReview = {
        content: editContent,
        rating: editRating,
      };
      console.log(updateData);
      console.log(updateData);
      const updatedReview = await updateReview(
        token || "",
        currentReview._id,
        updateData
      );
      setCurrentReview(updatedReview);
      setEditContent("");
      setEditRating(0);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const openEditModal = () => {
    setEditContent(currentReview.content);
    setEditRating(currentReview.rating);
    setIsEditModalOpen(true);
  };

  const lang =
    typeof window !== "undefined" ? document.documentElement.lang : "en";
  const dir = ["ar", "he", "fa", "ur"].includes(lang) ? "rtl" : "ltr";

  return (
    <>
      <div
        className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        dir={dir}
      >
        <div className="flex items-start gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={currentReview.patientId.picture || ""}
              alt={currentReview.patientId.username}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {currentReview.patientId.username}
                </span>
                <div className="flex items-center gap-1">
                  <RenderStars rating={currentReview.rating} />
                  <span className="text-sm text-gray-500">
                    ({currentReview.rating})
                  </span>
                </div>
              </div>
              {isMyReview && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openEditModal}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  <span className="text-sm text-gray-500">
                    {currentReview.createdAt.split("T")[0]}
                  </span>
                </div>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed mb-2">
              {currentReview.content}
            </p>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MessageCircle className="w-4 h-4" />
              <span>Review</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && isMyReview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          dir={dir}
        >
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">{t("confirmDelete")}</h3>
            <p className="text-gray-600 mb-6">{t("deleteReviewConfirm")}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && isMyReview && (
        <form
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          dir={dir}
          onSubmit={handleEdit}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            dir={dir}
          >
            <h3 className="text-lg font-semibold mb-4">{t("editReview")}</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                التقييم
              </label>
              <div className="flex items-center gap-2 ">
                <div className="flex gap-1" dir="rtl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      dir="rtl"
                      key={star}
                      className="relative flex items-center"
                    >
                      <Star
                        className={`w-5 h-5 cursor-pointer ${
                          editRating >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill={editRating >= star ? "currentColor" : "none"}
                        onClick={() => handleRatingClick(star)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المحتوى
              </label>
              <textarea
                placeholder={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                حفظ
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Review;
