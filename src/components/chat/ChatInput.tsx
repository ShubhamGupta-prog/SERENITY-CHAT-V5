import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { SpeechRecognitionButton } from "./SpeechRecognition";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSpeechTranscript = (transcript: string) => {
    // Append the transcript to the current message
    setMessage((prev) => {
      const newMessage = prev.trim() ? `${prev} ${transcript}` : transcript;
      return newMessage;
    });
    // Focus the textarea
    document.querySelector('textarea')?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative p-4 transition-all duration-300 ease-out",
        isFocused ? "glass-panel rounded-2xl dark:bg-gray-800/30 dark:border-gray-700/30" : ""
      )}
    >
      <div className="relative flex items-end">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask about mental health, stress, emotions, or coping strategies..."
          className={cn(
            "min-h-[60px] w-full resize-none border bg-background dark:bg-gray-800 dark:border-gray-700 py-3 pr-12 pl-12 shadow-sm transition-all duration-200",
            isFocused ? "focus-ring" : ""
          )}
          disabled={disabled}
        />
        <div className="absolute bottom-3 left-3 z-10">
          <SpeechRecognitionButton onTranscript={handleSpeechTranscript} disabled={disabled} />
        </div>
        <Button
          type="submit"
          size="icon"
          className="absolute bottom-3 right-3 h-8 w-8 rounded-full p-0 bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground z-10"
          disabled={!message.trim() || disabled}
        >
          <ArrowUp size={14} />
        </Button>
      </div>
    </form>
  );
}
