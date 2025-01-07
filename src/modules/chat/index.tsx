"use client";
import { useVerifiedUserValidator } from "@/queries/useAuth";
import { useQueryProfiles } from "@/queries/useUsers";
import socket from "@/utils/socket";
import { useCallback, useEffect, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ConversationList } from "./ConversationList";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

export default function MessengerModule() {
  const conversations = [
    {
      id: 1,
      name: "phamducbinh",
      lastMessage: "Hey, how's it going?",
      time: "2m",
    },
    {
      id: 2,
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

  const { data: profiles } = useQueryProfiles(
    { name },
    { enabled: Boolean(name) }
  );

  const getProfile = useCallback((name: string) => {
    if (name.trim()) {
      setName(name);
    }
  }, []);

  useEffect(() => {
    // Cấu hình thông tin xác thực cho socket, gửi id người dùng.
    socket.auth = { id };
    socket.connect();

    // Hàm xử lý khi nhận tin nhắn từ server.
    const handleMessage = (data: any) => {
      // Kiểm tra nếu người gửi là chính mình (so sánh với `id`), gán "You" nếu đúng, ngược lại là "Other".
      setMessages((prev) => [
        ...prev,
        { ...data, sender: data.sender === id ? "You" : "Other" },
      ]);
    };

    // Lắng nghe sự kiện 'receive private message' từ server, gọi `handleMessage` khi nhận tin nhắn.
    socket.on("receive private message", handleMessage);

    // Cleanup: khi component unmount hoặc `id` thay đổi, hủy đăng ký sự kiện và ngắt kết nối socket.
    return () => {
      socket.off("receive private message", handleMessage);
      socket.disconnect();
    };
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = value.trim();

    if (!trimmedValue || !profiles?.data?.id) return;

    // Tạo đối tượng tin nhắn với nội dung và người gửi là "You".
    const message = {
      content: trimmedValue,
      sender: "You",
    };

    // Cập nhật danh sách tin nhắn với tin nhắn vừa gửi.
    setMessages((prev) => [...prev, message]);

    // Gửi tin nhắn qua socket đến server với dữ liệu bao gồm nội dung và người nhận (profile).
    socket.emit("private message", {
      content: trimmedValue,
      to: profiles.data.id,
    });
    setValue("");
  };
  return (
    <div className="flex h-screen bg-black text-white">
      <ConversationList conversations={conversations} getProfile={getProfile} />
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
            <MessageList messages={messages} />
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
