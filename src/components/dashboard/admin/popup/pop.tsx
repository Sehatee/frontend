"use client";
import React from "react";
import Image from "next/image";
import Modal from "@/ui/Modal";

interface GenericUserModalProps {
  picture: string;
  username: string;
  subtitle?: string;
  title: string;
  primaryActionLabel: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  closeModal: () => void;
}

const GenericUserModal: React.FC<GenericUserModalProps> = ({
  picture,
  username,
  subtitle,
  title,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  closeModal,
}) => {
  return (
    <Modal open onClose={closeModal} title={title}>
      <div className="flex flex-col items-center gap-3 pt-2">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-main ring-4 ring-secondary">
          {picture ? (
            <Image
              src={picture}
              alt={username}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-white">
              {username.charAt(0)}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-ft">{username}</h3>
        {subtitle && <p className="text-sm text-ft2 text-center">{subtitle}</p>}

        <div className="mt-2 w-full space-y-3">
          {primaryActionLabel && primaryActionLabel !== "" && (
            <button
              onClick={onPrimaryAction}
              className="btn-primary w-full"
            >
              {primaryActionLabel}
            </button>
          )}
          {secondaryActionLabel && secondaryActionLabel !== "" && (
            <button
              onClick={onSecondaryAction}
              className="flex w-full items-center justify-center rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 ease-out hover:opacity-90"
            >
              {secondaryActionLabel}
            </button>
          )}
          <button
            className="btn-ghost w-full"
            onClick={closeModal}
          >
            إغلاق
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GenericUserModal;
