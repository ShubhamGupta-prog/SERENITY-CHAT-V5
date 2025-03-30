
import React from "react";
import { ChatContainer } from "@/components/chat/ChatContainer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto h-16 flex items-center justify-between px-4">
          <div className="flex items-center">
            <h1 className="text-xl font-display font-medium tracking-tight">
              Serenity<span className="font-semibold">Chat</span>
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              A beautiful, minimalist chat experience
            </span>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatContainer />
      </main>
    </div>
  );
};

export default Index;
