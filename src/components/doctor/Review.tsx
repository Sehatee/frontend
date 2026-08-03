"use client";
import { Review as ReviewType, UpdateReview } from "@/types/Review";
import RenderStars from "@/ui/RenderStars";
import Modal from "@/ui/Modal";
import { MessageCircle, Trash2, Edit2, Star } from "lucide-react";
import Image from "next/image";
import React, { FormEvent, useMemo, useState } from "react";
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

  const isMyReview = useMemo(() => {
    return (
      user?.reviews.some((reviewUser: ReviewType) => {
        return reviewUser._id === review?._id;
      }) || false
    );
  }, [user?.reviews, review?._id]);

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

  const initials = (currentReview.patientId.username || "").trim().charAt(0);

  return (
    <>
      <div
        className="rounded-2xl border border-secondary bg-white p-6"
        dir={dir}
      >
        <div className="flex items-start gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-main">
            {currentReview.patientId.picture ? (
              <Image
                src={currentReview.patientId.picture}
                alt={currentReview.patientId.username}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-display text-lg font-bold text-white">
                  {initials}
                </span>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-ft">
                  {currentReview.patientId.username}
                </span>
                <div className="flex items-center gap-1.5">
                  <RenderStars rating={currentReview.rating} />
                  <span className="text-sm text-ft2">
                    ({currentReview.rating})
                  </span>
                </div>
              </div>
              {isMyReview && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={openEditModal}
                    className="rounded-full p-1.5 text-ft2 transition-colors hover:bg-secondary hover:text-main"
                  >
                    <Edit2 className="size-4" />
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="rounded-full p-1.5 text-accent transition-colors hover:bg-accent/10"
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <span className="text-sm text-ft2">
                    {currentReview.createdAt.split("T")[0]}
                  </span>
                </div>
              )}
            </div>

            <p className="mt-2 leading-relaxed text-ft2">
              {currentReview.content}
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm text-ft2">
              <MessageCircle className="size-4" />
              <span>Review</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t("confirmDelete")}
      >
        <p className="text-ft2">{t("deleteReviewConfirm")}</p>
        <div className="mt-6 flex justify-end gap-3" dir={dir}>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="btn-ghost px-5 py-2.5 text-sm"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-accent/90"
          >
            <Trash2 className="size-4" />
            {t("delete")}
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={t("editReview")}
      >
        <form className="space-y-5" dir={dir} onSubmit={handleEdit}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ft">
              {t("rating")}
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  className={`size-6 cursor-pointer ${
                    editRating >= star ? "text-star" : "text-ft2"
                  }`}
                  fill={editRating >= star ? "currentColor" : "none"}
                  strokeWidth={1.5}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ft">
              {t("content")}
            </label>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-secondary bg-bg p-4 text-ft placeholder:text-ft2/70 focus:border-main focus:outline-none focus:ring-2 focus:ring-main/30 transition"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="btn-ghost px-5 py-2.5 text-sm"
            >
              {t("cancel")}
            </button>
            <button type="submit" className="btn-primary px-5 py-2.5 text-sm">
              {t("save")}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Review;
