import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import Link from "next/link";

export function ChatHeader({ profiles }: { profiles: any }) {
  return (
    <div className="bg-black p-4 border-b border-zinc-800 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="md:hidden">
          <Button variant="ghost" size="icon" className="mr-2" type="button">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profiles?.data?.avatar} />
            <AvatarFallback>{profiles?.data?.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-black"></span>
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{profiles?.data?.name}</h2>
          <p className="text-sm text-zinc-400">Online</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
