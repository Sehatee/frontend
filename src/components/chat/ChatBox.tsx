"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  Paperclip,
  X,
  FileIcon,
  ExternalLink,
  Video,
} from "lucide-react";
import { Doctor, Message } from "@/types/Chat";
import { VideoCallModal } from "./VideoCall";
import IncomingVideoCall from "./IncomingVideoCall";

interface ChatBoxProps {
  selectedReceiver: Doctor | null;
  messages: Message[];
  isLoadingMessages: boolean;
  message: string;
  setMessage: (val: string) => void;
  onSendMessage: () => void;
  patientId: string;
  onFileSelect?: (file: File) => void;
  attachments: File[];
  setAttachments: React.Dispatch<React.SetStateAction<File[]>>;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
  selectedReceiver,
  messages,
  isLoadingMessages,
  message,
  setMessage,
  onSendMessage,
  patientId,
  attachments,
  setAttachments,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ref للانتقال إلى أسفل قائمة الرسائل
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // حالة Modal معاينة الصورة
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // حالة Modal المكالمة المرئية
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [isIncomingCall, setIsIncomingCall] = useState(false);

  // التمرير التلقائي للأسفل عند التغير في مصفوفة الرسائل
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoadingMessages]);

  // إغلاق المعاينة عند الضغط على زر Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAttachment = (indexToRemove: number) => {
    setAttachments((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  if (!selectedReceiver) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-bg p-6 text-center rounded-e-2xl border-s border-secondary/40">
        <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4 text-ft2">
          💬
        </div>
        <p className="text-ft font-medium text-base">لم يتم تحديد محادثة</p>
        <p className="text-ft2 text-xs mt-1">
          اختر طبيبًا من القائمة الجانبية لبدء المحادثة
        </p>
      </div>
    );
  }

  const canSend = message.trim().length > 0 || attachments.length > 0;

  return (
    <div className="flex flex-col flex-1 rounded-e-2xl overflow-hidden bg-bg/50 backdrop-blur-sm border-s border-secondary/40 relative">
      {/* 1. Receiver Information Header */}
      <div className="bg-main text-white px-6 py-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <Image
              src={selectedReceiver.picture}
              alt={selectedReceiver.username}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover object-top ring-2 ring-white/20 shadow-inner"
            />
            <span className="absolute bottom-0 end-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-main" />
          </div>
          <div className="text-start">
            <h3 className="font-bold text-base leading-tight">
              {selectedReceiver.username}
            </h3>
            <p className="text-xs text-white/80 flex items-center gap-1.5 mt-0.5">
              <span>{selectedReceiver.specialization}</span>
            </p>
          </div>
        </div>

        {/* Video Call Trigger Button */}
        <button
          type="button"
          onClick={() => setIsVideoCallOpen(true)}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 shadow-sm border border-white/10 flex items-center gap-2 text-xs font-medium"
          title="بدء مكالمة فيديو"
        >
          <Video className="h-5 w-5" />
          <span className="hidden sm:inline">مكالمة فيديو</span>
        </button>
      </div>

      {/* 2. Chat Area (Messages Container) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-bg to-bg/30">
        {isLoadingMessages ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-main">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="text-sm font-medium">جاري تحميل الرسائل...</span>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => {
              const isMe = msg.sender._id === patientId;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`flex items-end gap-2.5 ${
                    isMe ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  {msg.receiver._id === patientId ? (
                    <Image
                      src={msg.sender.picture}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full bg-secondary object-cover object-top shadow-sm mb-1"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-main/10 text-main font-semibold flex items-center justify-center text-[11px] mb-1 ring-1 ring-main/20">
                      أنت
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`text-start px-4 py-2.5 max-w-[70%] sm:max-w-md text-sm leading-relaxed shadow-sm transition-all space-y-2 ${
                      isMe
                        ? "bg-main text-white rounded-2xl rounded-br-xs"
                        : "bg-secondary/80 border border-secondary text-ft rounded-2xl rounded-bl-xs"
                    }`}
                  >
                    {/* Attachments inside message bubble */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {msg.attachments.map(
                          (
                            att: {
                              type: string;
                              url: string;
                            },
                            attIdx,
                          ) => {
                            const isObject =
                              typeof att === "object" && att !== null;
                            const fileUrl = isObject ? att.url : att;

                            const cleanUrl = fileUrl.split("?")[0];
                            const fileExtension =
                              cleanUrl.split(".").pop()?.toLowerCase() || "";

                            const imageExtensions = [
                              "jpg",
                              "jpeg",
                              "png",
                              "webp",
                              "gif",
                              "svg",
                              "bmp",
                            ];
                            const isRealImage =
                              imageExtensions.includes(fileExtension);

                            if (isRealImage) {
                              return (
                                <button
                                  key={attIdx}
                                  type="button"
                                  onClick={() => setPreviewImage(fileUrl)}
                                  className="block overflow-hidden rounded-xl border border-black/10 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-start w-full"
                                >
                                  <img
                                    src={fileUrl}
                                    alt={`مرفق ${attIdx + 1}`}
                                    className="max-h-60 w-full object-cover rounded-xl"
                                  />
                                </button>
                              );
                            }

                            return (
                              <a
                                key={attIdx}
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-between gap-3 p-3 rounded-xl transition-all duration-200 border shadow-xs group ${
                                  isMe
                                    ? "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                                    : "bg-bg/90 hover:bg-bg border-secondary/50 text-ft"
                                }`}
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div
                                    className={`p-2 rounded-lg shrink-0 flex items-center justify-center ${
                                      isMe
                                        ? "bg-white/20 text-white"
                                        : "bg-main/10 text-main"
                                    }`}
                                  >
                                    <FileIcon className="h-5 w-5" />
                                  </div>

                                  <div className="flex flex-col min-w-0">
                                    <span className="text-xs font-semibold truncate leading-tight">
                                      مستند مرفق {attIdx + 1}
                                    </span>
                                    <span
                                      className={`text-[10px] uppercase font-bold tracking-wider mt-0.5 ${
                                        isMe ? "text-white/70" : "text-ft/60"
                                      }`}
                                    >
                                      {fileExtension || "DOCUMENT"}
                                    </span>
                                  </div>
                                </div>

                                <div
                                  className={`p-1.5 rounded-full shrink-0 transition-transform group-hover:translate-y-0.5 ${
                                    isMe
                                      ? "bg-white/10 text-white"
                                      : "bg-main/5 text-main"
                                  }`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 3a1 1 0 011 1v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 11.586V4a1 1 0 011-1z"
                                      clipRule="evenodd"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      d="M3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </a>
                            );
                          },
                        )}
                      </div>
                    )}

                    {msg.content && <p>{msg.content}</p>}
                  </div>
                </motion.div>
              );
            })}

            {/* عنصر غير مرئي لنهاية قائمة الرسائل يتم الوصول إليه برمجياً */}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* 3. Input Text Section */}
      <div className="p-4 bg-bg border-t border-secondary/60 flex flex-col gap-2.5">
        <AnimatePresence>
          {attachments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 overflow-x-auto pb-2"
            >
              {attachments.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-secondary/60 border border-secondary text-ft text-xs px-3 py-1.5 rounded-xl shrink-0 shadow-xs"
                >
                  <FileIcon className="h-3.5 w-3.5 text-main shrink-0" />
                  <span className="max-w-[120px] truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(idx)}
                    className="text-ft2 hover:text-red-500 transition-colors p-0.5 rounded-full"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2.5 items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-xl p-3 text-ft2 bg-secondary/50 hover:bg-secondary hover:text-ft active:scale-95 transition-all border border-secondary/80 shadow-sm"
            aria-label="upload attachment"
          >
            <Paperclip className="h-5 w-5" />
          </button>

          <input
            type="text"
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 text-start border border-secondary/80 rounded-xl bg-bg px-4 py-3 text-sm text-ft placeholder:text-ft2/60 focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition-all shadow-inner"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && canSend && onSendMessage()}
          />

          <button
            className="rounded-xl p-3 text-white bg-main hover:bg-mainLight active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onSendMessage}
            disabled={!canSend}
            aria-label="send message"
          >
            <Send className="h-5 w-5 rtl:-rotate-90" />
          </button>
        </div>
      </div>

      {/* 4. Image Preview Lightbox Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            >
              <div className="absolute -top-12 end-0 flex items-center gap-2">
                <a
                  href={previewImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="فتح في تبويب جديد"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="إغلاق"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <img
                src={previewImage}
                alt="معاينة المكبرة"
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Video Call Modal */}
      <VideoCallModal
        isOpen={isVideoCallOpen}
        onClose={() => setIsVideoCallOpen(false)}
        receiver={selectedReceiver}
      />
      <IncomingVideoCall
        isOpen={isIncomingCall}
        callerName={selectedReceiver.username}
        callerAvatar={selectedReceiver.picture}
        onAccept={() => {
          setIsIncomingCall(false);
          setIsVideoCallOpen(true);
        }}
        onDecline={() => setIsIncomingCall(false)}
      />
    </div>
  );
};
