import LeftBar from "@/components/LeftBar";
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
    <div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between">
      <div className="px-2 xsm:px-4 xxl:px-8 ">
        <LeftBar />
      </div>
      {/* Conversation List */}
      <ConversationList listReceiver={listReceiver} />
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
