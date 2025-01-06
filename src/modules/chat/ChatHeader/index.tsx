import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ChatHeader() {
  return (
    <div className="bg-black p-4 border-b border-zinc-800 flex items-center">
      <Link href={"/"}>
        <Button variant="ghost" size="icon" className="mr-2" type="button">
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </Link>
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://api.dicebear.com/6.x/avataaars/svg?seed=John%20Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <h2 className="ml-4 text-xl font-semibold">John Doe</h2>
    </div>
  );
}
