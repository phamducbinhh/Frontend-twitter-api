"use client";
import { useVerifiedUserValidator } from "@/queries/useAuth";
import { useQueryConversation, useQueryProfiles } from "@/queries/useUsers";
import socket from "@/utils/socket";
import { useCallback, useEffect, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ConversationList } from "./ConversationList";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

export default function MessengerModule() {
  const user = [
    {
      id: 1,
      name: "phamducbinh",
      lastMessage: "Hey, how's it going?",
      time: "2m",
    },
    {
      id: 29,
      name: "binhboong171",
      lastMessage: "Hey, how's it going?",
      time: "2m",
    },
  ];

  const { data: account } = useVerifiedUserValidator();
  const { id } = account?.data || {};
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [receiverId, setReceiverId] = useState<number | any>(null);

  const { data: profiles } = useQueryProfiles(
    { name },
    { enabled: Boolean(name) }
  );

  // Lấy dữ liệu tin nhắn từ API khi receiverId thay đổi
  const { data: conversation } = useQueryConversation(
    { receiver_id: receiverId },
    { enabled: Boolean(receiverId) }
  );

  const getProfile = useCallback(
    (item: any) => {
      if (item?.name?.trim()) {
        setName(item?.name);
        setReceiverId(item?.id);
      }
    },
    [setName, setReceiverId]
  );

  // Hàm xử lý khi nhận tin nhắn từ server.
  const handleMessage = (data: any) => {
    const { payload } = data;
    setMessages((prev) => [...prev, payload]);
  };

  useEffect(() => {
    setMessages([]);
    // Cấu hình thông tin xác thực cho socket, gửi id người dùng.
    socket.auth = { id };
    socket.connect();

    // Lắng nghe sự kiện 'receive_message' từ server, gọi `handleMessage` khi nhận tin nhắn.
    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
      socket.disconnect();
    };
  }, [id, name]);

  // Cập nhật messages với tin nhắn từ API khi conversation thay đổi
  useEffect(() => {
    if (conversation?.data) {
      setMessages((prev) => [...prev, ...conversation?.data.conversations]);
    }
  }, [conversation]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = value.trim();

    if (!trimmedValue || !profiles?.data?.id) return;

    const conversation = {
      content: value,
      sender_id: id,
      receiver_id: profiles.data.id,
    };
    setMessages((prev) => [...prev, conversation]);

    // Gửi tin nhắn qua socket đến server với dữ liệu bao gồm nội dung và người nhận (profile).
    socket.emit("send_message", {
      payload: conversation,
    });
    setValue("");
  };
  return (
    <div className="flex h-screen bg-black text-white">
      <ConversationList user={user} getProfile={getProfile} />
      <div className="flex-1 flex flex-col">
        {!profiles ? (
          <div className="flex items-center justify-center flex-1">
            <p className="text-zinc-400">
              Chọn một cuộc trò chuyện để bắt đầu nhắn tin
            </p>
          </div>
        ) : (
          <>
            <ChatHeader profiles={profiles} />
            <MessageList messages={messages} user_id={id} />
            <MessageInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </div>
    </div>
  );
}
