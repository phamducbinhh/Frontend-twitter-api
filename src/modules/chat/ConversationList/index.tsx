"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { formatLastChangedTime } from "@/helpers";
import { useVerifiedUserValidator } from "@/queries/useAuth";
import { useQueryGetRecharts } from "@/queries/useUsers";
import { useGlobalStore } from "@/stores/state";
import socket from "@/utils/socket";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

export function ConversationList() {
  const pathname = usePathname();
  const { data: recentChats, isLoading, refetch } = useQueryGetRecharts();
  const { data: account } = useVerifiedUserValidator();
  const { id: user_id } = account?.data || {};
  const onlineUsers = useGlobalStore((state) => state.onlineUsers);
  const setOnlineUsers = useGlobalStore((state) => state.setOnlineUsers);

  useEffect(() => {
    socket.on("update_recent_chats", () => {
      refetch();
    });
  }, [refetch]);

  useEffect(() => {
    socket.on("getOnlineUsers", (data) => {
      setOnlineUsers(data.map(Number));
    });
  }, [setOnlineUsers]);

  const filterOnlineUsers = useMemo(() => {
    return onlineUsers.filter((user) => user !== Number(user_id));
  }, [onlineUsers, user_id]);

  return (
    <div className="w-64 xl:w-80 border-r border-zinc-800 hidden md:block border-l">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>

      <ScrollArea className="h-[calc(100vh-60px)]">
        {recentChats && recentChats.data.length <= 0 ? (
          <div className="flex p-3 justify-center">
            <p className="text-sm font-semibold text-zinc-400">
              There have been no conversations yet
            </p>
          </div>
        ) : isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center p-4 border-b border-zinc-800"
            >
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="ml-4 flex-1">
                <Skeleton className="h-4 w-3/5 mb-2" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          ))
        ) : (
          recentChats?.data.map((item: any) => (
            <Link
              href={{
                pathname: `/messenger/${item.name}`,
                query: { receiver_id: item.id },
              }}
              key={item.id}
            >
              <div
                className={`flex items-center p-4 border-b border-zinc-800 hover:bg-zinc-900 cursor-pointer ${
                  pathname === `/messenger/${item.name}` ? "bg-zinc-800" : ""
                }`}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {filterOnlineUsers.includes(item.id) && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-black"></span>
                  )}
                </div>

                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">{item.name}</h3>
                    <span className="text-sm text-zinc-400">
                      {formatLastChangedTime(item.updatedAt)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-zinc-400 truncate">
                      {item.lastContent}
                    </p>
                    {/* <span className="bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                        {"1"}
                      </span> */}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </ScrollArea>
    </div>
  );
}
