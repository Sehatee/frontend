"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { io, Socket } from "socket.io-client";

import { useUserStore } from "@/stores/user";
import { ChatBox } from "@/components/chat/ChatBox";
import { Conversation, Doctor, Message } from "@/types/Chat";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

const socket = io(process.env.NEXT_PUBLIC_BASE_API_URL as string, {
  transports: ["websocket"],
});
const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedReceiver, setSelectedReceiver] = useState<Doctor | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>();
  const [currentConv, setCurrentConv] = useState<string>("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const { user } = useUserStore();
  const token = Cookies.get("token");
  const socketRef = useRef<Socket | null>(null);

  // only if the first time conversation
  const searchParam = useSearchParams();
  const doctorId = searchParam.get("doctorId") || null;

  // connect with server using socket.io
  const fetchAllConversation = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/conversations`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();

      setConversations([...(conversations || []), data]);
    } catch (error) {
      console.error("Failed to fetch conversation:", error);
    }
  };
  const createConversation = async (doctorId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/conversations/${doctorId}`,
        {
          method: "POST",
          body: JSON.stringify({
            doctorId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();

      setConversations([...(conversations || []), data]);
    } catch (error) {
      console.error("Failed to fetch create conversation:", error);
    }
  };
  useEffect(() => {
    // console.log(doctorId);
    if (doctorId) {
      createConversation(doctorId);
    } else {
      fetchAllConversation();
    }
  }, [doctorId]);

  const fetchOldMessages = async (convId: string) => {
    setIsLoadingMessages(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/${convId}/messages`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();

      if (data && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Failed to fetch old messages:", error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleSelectReceiver = (receiver: Doctor) => {
    setSelectedReceiver(receiver);
    setCurrentConv(receiver.conversationId!);
    fetchOldMessages(receiver.conversationId!);
  };

  useEffect(() => {
    if (!user || !selectedReceiver) return;

    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinRoom", {
        conversationId: currentConv,
      });
      socket.emit("markAsRead", {
        conversationId: currentConv,
        userId: user._id,
        role: user.role,
      });
    });

    socket.on("newMessage", (savedMessage: Message) => {
      console.log("newMessage envet data", savedMessage);
      setMessages([...messages, savedMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedReceiver, user, messages]);

  const handleSendMessage = () => {
    if (!selectedReceiver || !user) return;

    // if the patient is the sender
    const payload =
      user.role === "patient"
        ? {
            senderId: user._id,
            receiverId: selectedReceiver._id, // as doctor
            doctorId: selectedReceiver._id, // as doctor
            patientId: user._id,
            content: message,
            attachments: attachments,
          }
        : {
            senderId: user._id,
            receiverId: selectedReceiver._id, // patientId from conversations
            doctorId: user._id,
            patientId: selectedReceiver._id, // patientId from conversations
            content: message,
            attachments: attachments,
          };

    console.log("the payload before sending", payload);
    // if the doctor is the sender
    if (socketRef.current?.connected) {
      socketRef.current.emit(
        "sendMessage",
        payload,
        (data: { status: string; data: Message }) => {
          setMessages([...messages, data.data]);
        },
      );
    }

    setMessage("");
    setAttachments([]);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-ft2">يرجى تسجيل الدخول لعرض المحادثات</p>
      </div>
    );
  }

  return (
    <div className="flex h-[90vh] bg-bg p-4 ">
      {/* Last Conversations Sidebar */}
      <div className="w-1/4 bg-bg border-e border-secondary rounded-s-2xl overflow-hidden">
        <h2 className="md:text-xl text-base font-bold p-4 border-b border-secondary text-start text-main">
          محادثاتي
        </h2>
        {/* if the user is patient */}
        {conversations ? (
          conversations.map((conv) => (
            <div
              key={conv._id}
              onClick={() =>
                handleSelectReceiver(
                  user.role === "patient"
                    ? {
                        ...conv.doctor,
                        conversationId: conv._id,
                      }
                    : {
                        ...conv.patient,
                        conversationId: conv._id,
                      },
                )
              }
              className={`group relative flex items-center gap-4 p-4 hover:bg-secondary transition-all duration-300 ease-in-out cursor-pointer border-b-[1px] border-secondary ${
                user.role === "patient"
                  ? selectedReceiver?._id === conv.doctor._id
                    ? "bg-secondary"
                    : ""
                  : selectedReceiver?._id === conv.patient._id
                    ? "bg-secondary"
                    : ""
              }`}
            >
              <div className="flex items-center gap-4 w-full">
                <Image
                  src={
                    user.role === "patient"
                      ? conv.doctor.picture
                      : conv.patient.picture
                  }
                  alt={
                    user.role === "patient"
                      ? conv.doctor.username
                      : conv.patient.username
                  }
                  width={40}
                  height={40}
                  className="h-12 w-12 rounded-full object-cover object-top shadow-sm shadow-main/20"
                />
                <div className="flex flex-col space-y-1">
                  <p className="font-bold md:text-sm text-xs sm:block hidden text-ft">
                    {user.role === "patient"
                      ? conv.doctor.username
                      : conv.patient.username}
                  </p>
                  <p className="text-xs text-main md:block hidden">
                    {user.role === "patient" && conv.doctor.specialization}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

      {/* ChatBox Component */}
      <ChatBox
        selectedReceiver={selectedReceiver}
        messages={messages}
        isLoadingMessages={isLoadingMessages}
        message={message}
        setMessage={setMessage}
        onSendMessage={handleSendMessage}
        patientId={user._id}
        attachments={attachments}
        setAttachments={setAttachments}
      />
    </div>
  );
};

export default ChatPage;
