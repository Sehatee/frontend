import React from "react";
import Image from "next/image";

interface GenericUserModalProps {
  picture: string;
  username: string;
  subtitle?: string; // يمكن أن تكون التخصص أو سبب الحظر
  title: string;
  headerColorFrom: string;
  headerColorTo: string;
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
  headerColorFrom,
  headerColorTo,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-[#f5f6fa] rounded-2xl shadow-2xl p-0 w-full max-w-xs text-center relative overflow-hidden">
        
        <div className={`bg-gradient-to-tr from-${headerColorFrom} to-${headerColorTo} h-24 relative flex justify-center items-end`}>
          <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
            <Image
              src={picture}
              alt={username}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>
        <div className="pt-16 pb-6 px-4">
          <h2 className={`text-xl font-bold text-${headerColorFrom}-700 mb-1`}>{title}</h2>
          <p className={`text-base text-${headerColorFrom}-500 mb-1`}>{username}</p>
          {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}

          <button
            onClick={onPrimaryAction}
            className="w-full flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-2 rounded-xl mb-3 text-base font-semibold shadow hover:from-yellow-500 hover:to-orange-500 transition"
          >
            {primaryActionLabel}
          </button>
          <button
            onClick={onSecondaryAction}
            className="w-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-xl mb-3 text-base font-semibold shadow hover:from-pink-600 hover:to-rose-600 transition"
          >
            {secondaryActionLabel}
          </button>
          <button
            className="w-full flex items-center justify-center bg-gray-300 text-gray-700 py-2 rounded-xl text-base font-semibold hover:bg-gray-400 transition"
            onClick={closeModal}
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericUserModal;
