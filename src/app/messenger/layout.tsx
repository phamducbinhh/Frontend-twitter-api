"use client";
import LeftBar from "@/components/LeftBar";
import { ConversationList } from "@/modules/chat/ConversationList";
import { useVerifiedUserValidator } from "@/queries/useAuth";
import socket from "@/utils/socket";
import { useEffect } from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: account } = useVerifiedUserValidator();
  const { id: user_id, verify_status } = account?.data || {};

  useEffect(() => {
    if (!user_id) return;

    socket.auth = { user_id, verify_status };
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [user_id, verify_status]);

  return (
    <div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between">
      <div className="px-2 xsm:px-4 xxl:px-8 ">
        <LeftBar />
      </div>
      {/* Conversation List */}
      <ConversationList />
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
