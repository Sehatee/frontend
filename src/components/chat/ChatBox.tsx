"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { Doctor } from "@/types/Chat";

interface ChatBoxProps {
  selectedDoctor: Doctor | null;
  messages: any[];
  isLoadingMessages: boolean;
  message: string;
  setMessage: (val: string) => void;
  onSendMessage: () => void;
  patientId: string;

}

export const ChatBox: React.FC<ChatBoxProps> = ({
  selectedDoctor,
  messages,
  isLoadingMessages,
  message,
  setMessage,
  onSendMessage,
  patientId,
}) => {
  if (!selectedDoctor) {
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

  // if (participants.includes(doctorId) && participants.includes(patientId)) {
  //   return (
  //     <div className="fixed bg-red-400 w-full h-full flex justify-center items-center z">
  //       <p className="text-center">لا توجد أي رسائل قم بتواصل مع طبيبك </p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col flex-1 rounded-e-2xl overflow-hidden bg-bg/50 backdrop-blur-sm border-s border-secondary/40">
      {/* 1. Receiver Information Header */}

      <div className="bg-main text-white px-6 py-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <Image
              src={selectedDoctor.picture}
              alt={selectedDoctor.username}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover object-top ring-2 ring-white/20 shadow-inner"
            />
            <span className="absolute bottom-0 end-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-main" />
          </div>
          <div className="text-start">
            <h3 className="font-bold text-base leading-tight">
              {selectedDoctor.username}
            </h3>
            <p className="text-xs text-white/80 flex items-center gap-1.5 mt-0.5">
              <span>{selectedDoctor.specialization}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Chat Area (Messages Container) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-bg to-bg/30">
        {isLoadingMessages ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-main">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="text-sm font-medium">جاري تحميل الرسائل...</span>
          </div>
        ) : (
          messages.map((msg, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`flex items-end gap-2.5 ${
                  msg.sender._id === patientId ? "flex-row-reverse" : "flex-row"
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
                  className={`text-start px-4 py-2.5 max-w-[70%] sm:max-w-md text-sm leading-relaxed shadow-sm transition-all ${
                    msg.sender._id === patientId
                      ? "bg-main text-white rounded-2xl rounded-br-xs"
                      : "bg-secondary/80 border border-secondary text-ft rounded-2xl rounded-bl-xs"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* 3. Input Text Section */}
      <div className="p-4 bg-bg border-t border-secondary/60 flex gap-2.5 items-center">
        <input
          type="text"
          placeholder="اكتب رسالتك هنا..."
          className="flex-1 text-start border border-secondary/80 rounded-xl bg-bg px-4 py-3 text-sm text-ft placeholder:text-ft2/60 focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition-all shadow-inner"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
        />
        <button
          className="rounded-xl p-3 text-white bg-main hover:bg-mainLight active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onSendMessage}
          disabled={!message.trim()}
          aria-label="send message"
        >
          <Send className="h-5 w-5 rtl:-rotate-90" />
        </button>
      </div>
    </div>
  );
};
