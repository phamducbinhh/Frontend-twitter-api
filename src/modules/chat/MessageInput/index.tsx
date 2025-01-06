/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function MessageInput({ value, onChange, onSubmit }: MessageInputProps) {
  return (
    <div className="bg-black p-4 border-t border-zinc-800">
      <form onSubmit={onSubmit} className="flex items-center space-x-2">
        <Input
          placeholder="Type a message..."
          className="flex-1 bg-zinc-900 border-zinc-700 text-white placeholder-zinc-400"
          value={value}
          onChange={onChange}
        />
        <Button
          size="icon"
          className="bg-blue-600 hover:bg-blue-700"
          type="submit"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
