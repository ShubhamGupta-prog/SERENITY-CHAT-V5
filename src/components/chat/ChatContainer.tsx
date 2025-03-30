import React, { useEffect, useRef, useState } from "react";
import { ChatMessage, MessageType } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import { GeminiService } from '../../services/gemini';
import { AlertCircle, Info } from "lucide-react";

const geminiService = new GeminiService(import.meta.env.VITE_GEMINI_API_KEY);

// Keywords that might indicate non-mental health queries
const nonMentalHealthKeywords = [
  'code', 'program', 'javascript', 'python', 'java', 'programming', 'algorithm', 'function',
  'math', 'calculate', 'equation', 'solve', 'formula', 'mathematics',
  'history', 'war', 'politics', 'government', 'president', 'election',
  'recipe', 'cook', 'food', 'bake', 'ingredient',
  'physics', 'chemistry', 'biology', 'science', 'experiment',
  'translate', 'language', 'grammar', 'dictionary', 'definition'
];

export function ChatContainer() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      content: "Hello! I'm SerenityChat, your mental health companion. I'm here to support your emotional wellbeing and help with stress, anxiety, and other mental health concerns. How can I assist you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  // Function to check if message might be non-mental health related
  const isPotentiallyNonMentalHealth = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    return nonMentalHealthKeywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()));
  };

  const handleConfirmSend = () => {
    if (pendingMessage) {
      sendMessageToAI(pendingMessage);
      setPendingMessage(null);
      setWarningMessage(null);
    }
  };

  const handleCancelSend = () => {
    setPendingMessage(null);
    setWarningMessage(null);
  };

  const sendMessageToAI = async (content: string) => {
    try {
      setError(null);
      setIsLoading(true);
      
      // Add user message
      const userMessage: MessageType = {
        id: uuidv4(),
        content,
        role: "user",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Get response from Gemini
      const response = await geminiService.chat(content);
      console.log("Received response:", response);

      // Add assistant response
      const assistantMessage: MessageType = {
        id: uuidv4(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Failed to get response:', error);
      setError(error instanceof Error ? error.message : "Failed to get response from AI");
      
      // Add error message to chat
      const errorMessage: MessageType = {
        id: uuidv4(),
        content: "Sorry, I encountered an error. Please try again with a question about mental health or emotional wellbeing.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (isPotentiallyNonMentalHealth(content)) {
      setWarningMessage("Your question appears to be unrelated to mental health. SerenityChat is designed specifically for mental health support and can only respond to questions about emotional wellbeing, mental health, and self-care.");
      setPendingMessage(content);
    } else {
      await sendMessageToAI(content);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-2 text-sm">
          {error}
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        <div className="pb-20 pt-4 md:pt-10">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLast={index === messages.length - 1 && message.role === "assistant"}
            />
          ))}
          {isLoading && (
            <div className="px-4 md:px-8 py-6">
              <div className="container max-w-4xl mx-auto">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse-subtle"></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse-subtle delay-150"></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse-subtle delay-300"></div>
                </div>
              </div>
            </div>
          )}
          {messages.length === 1 && (
            <div className="container max-w-4xl mx-auto px-4 md:px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <h3 className="text-md font-medium col-span-full mb-1 text-blue-700 dark:text-blue-400">Try asking about:</h3>
                {[
                  "How can I manage anxiety before a presentation?",
                  "What are some mindfulness exercises for stress?",
                  "How can I improve my sleep quality?",
                  "What are signs of burnout I should watch for?",
                  "How can I support a friend who's feeling depressed?",
                  "What are healthy ways to cope with grief?",
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    className="text-left p-3 rounded-lg border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-colors text-sm"
                    onClick={() => handleSendMessage(suggestion)}
                    disabled={isLoading || !!warningMessage}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {warningMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border rounded-lg shadow-lg max-w-md w-full p-6 mx-4">
            <div className="flex items-start mb-4">
              <AlertCircle className="text-amber-500 mr-3 mt-0.5 h-5 w-5" />
              <div>
                <h3 className="font-medium mb-2">Mental Health Focus</h3>
                <p className="text-sm text-muted-foreground">{warningMessage}</p>
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button 
                onClick={handleCancelSend}
                className="px-4 py-2 border rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Ask something else
              </button>
              <button 
                onClick={handleConfirmSend}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium transition-colors hover:bg-blue-700"
              >
                Continue anyway
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="border-t bg-background/80 backdrop-blur-sm fixed bottom-0 left-0 right-0">
        <div className="container max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading || !!warningMessage} />
        </div>
      </div>
    </div>
  );
}
