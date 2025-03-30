
import React from "react";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

export type MessageType = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
  isLast?: boolean;
}

export function ChatMessage({ message, isLast = false }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "group relative px-4 md:px-8 py-6 flex animate-slide-in",
        isUser ? "bg-background" : "bg-muted/30",
        isLast && "border-l-2 border-primary/10"
      )}
    >
      <div className="container max-w-4xl mx-auto flex items-start gap-4 md:gap-6">
        <div className="flex-shrink-0 mt-1">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md",
              isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
            )}
          >
            {isUser ? <User size={16} /> : <Bot size={16} />}
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-sm font-medium leading-none">
            {isUser ? "You" : "SerenityChat"}
          </p>
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground/90 whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
