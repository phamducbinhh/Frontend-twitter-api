/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface Conversation {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

interface ConversationListProps {
  listReceiver: Conversation[] | any;
}

export function ConversationList({ listReceiver }: ConversationListProps) {
  return (
    <div className="w-1/3 border-r border-zinc-800 hidden md:block">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-60px)]">
        {listReceiver.map((item: any) => (
          <Link
            href={{
              pathname: `/messenger/${item.name}`,
              query: { receiver_id: item.id },
            }}
            key={item.id}
            className="flex items-center p-4 border-b border-zinc-800 hover:bg-zinc-900 cursor-pointer"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={item.avatar} />
              <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{item.name}</h3>
                {/* <span className="text-sm text-zinc-400">{2}</span> */}
              </div>
              {/* <p className="text-sm text-zinc-400 truncate">{0}</p> */}
            </div>
          </Link>
        ))}
      </ScrollArea>
    </div>
  );
}
