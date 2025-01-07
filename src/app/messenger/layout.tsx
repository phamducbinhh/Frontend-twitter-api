import { ConversationList } from "@/modules/chat/ConversationList";
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Conversation List */}
      <ConversationList user={user} />
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
