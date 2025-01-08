"use client";

import { useVerifiedUserValidator } from "@/queries/useAuth";
import { useQueryConversation, useQueryProfiles } from "@/queries/useUsers";
import socket from "@/utils/socket";
import { useCallback, useEffect, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

export default function MessengerModule({
  slug,
  receiver_id,
}: {
  slug: string;
  receiver_id: string | any;
}) {
  const { data: account } = useVerifiedUserValidator();
  const { id: user_id } = account?.data || {};
  const [messages, setMessages] = useState<any[]>([]);
  const [value, setValue] = useState("");

  const { data: profiles } = useQueryProfiles(
    { name: slug },
    { enabled: Boolean(slug) }
  );

  // Lấy dữ liệu tin nhắn từ API khi receiverId thay đổi
  const { data: conversation } = useQueryConversation(
    { receiver_id },
    { enabled: Boolean(receiver_id) }
  );

  // Cập nhật tin nhắn khi nhận được tin nhắn mới từ server
  const handleMessage = useCallback((data: any) => {
    const { payload } = data;
    setMessages((prev) => [...prev, payload]);
  }, []);

  // Thiết lập socket và lắng nghe sự kiện nhận tin nhắn
  useEffect(() => {
    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
      setMessages([]);
    };
  }, [handleMessage]);

  // Cập nhật tin nhắn từ API khi conversation thay đổi
  useEffect(() => {
    if (conversation?.data) {
      setMessages(conversation?.data.conversations);
    }
  }, [conversation]);

  // Xử lý gửi tin nhắn
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = value.trim();

    // Kiểm tra điều kiện gửi tin nhắn
    if (!trimmedValue || !profiles?.data?.id) return;

    const newMessage = {
      content: trimmedValue,
      sender_id: user_id,
      receiver_id: profiles.data.id,
      createdAt: new Date().toISOString(),
    };

    // Cập nhật tin nhắn vào state
    setMessages((prev) => [...prev, newMessage]);

    // Gửi tin nhắn qua socket
    socket.emit("send_message", { payload: newMessage });
    setValue(""); // Reset input sau khi gửi
  };
  return (
    <>
      <ChatHeader profiles={profiles} receiver_id={receiver_id} />
      <MessageList messages={messages} user_id={user_id} />
      <MessageInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
