import userAction from "@/lib/action/user.action";
import { ConversationList } from "@/modules/chat/ConversationList";

async function fetchListReceiver<T>(): Promise<T | null> {
  return (await userAction.getReceiverList()) as Promise<T>;
}

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const listReceiver = await fetchListReceiver();

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Conversation List */}
      <ConversationList listReceiver={listReceiver} />
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
