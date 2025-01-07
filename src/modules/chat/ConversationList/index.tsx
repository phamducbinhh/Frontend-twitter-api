/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
}

interface ConversationListProps {
  user: Conversation[];
  getProfile: (item: any) => void;
}

export function ConversationList({ user, getProfile }: ConversationListProps) {
  return (
    <div className="w-1/3 border-r border-zinc-800 hidden md:block">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-60px)]">
        {user.map((item) => (
          <div
            key={item.id}
            onClick={() => getProfile(item)}
            className="flex items-center p-4 border-b border-zinc-800 hover:bg-zinc-900 cursor-pointer"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${item.name}`}
              />
              <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{item.name}</h3>
                <span className="text-sm text-zinc-400">{item.time}</span>
              </div>
              <p className="text-sm text-zinc-400 truncate">
                {item.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
