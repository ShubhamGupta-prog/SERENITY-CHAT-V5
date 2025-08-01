import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MessageCirclePlus, ChevronLeft, ChevronRight, Trash2, MessageCircle, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Conversation, conversationHistoryService } from "@/services/conversationHistory";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

interface ChatSidebarProps {
  activeConversationId: string | null;
  onConversationSelect: (conversation: Conversation) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

// Save sidebar state to localStorage
const saveSidebarState = (isOpen: boolean) => {
  localStorage.setItem('chat-sidebar-state', JSON.stringify({ isOpen }));
};

// Get sidebar state from localStorage
const getSidebarState = (): boolean => {
  const savedState = localStorage.getItem('chat-sidebar-state');
  if (savedState) {
    try {
      const { isOpen } = JSON.parse(savedState);
      return Boolean(isOpen);
    } catch (e) {
      return true; // Default to open if error parsing
    }
  }
  return true; // Default to open if no saved state
};

export function ChatSidebar({
  activeConversationId,
  onConversationSelect,
  onNewConversation,
  onDeleteConversation
}: ChatSidebarProps) {
  const [isOpen, setIsOpen] = useState(getSidebarState());
  const [conversations, setConversations] = useState<Conversation[]>([]);
  
  useEffect(() => {
    // Load conversations on mount
    const loadedConversations = conversationHistoryService.getConversations();
    setConversations(loadedConversations);
  }, []);

  // Save sidebar state when it changes
  useEffect(() => {
    saveSidebarState(isOpen);
  }, [isOpen]);

  // Format the conversation date for display
  const formatConversationDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const handleDeleteConversation = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this conversation?")) {
      const success = conversationHistoryService.deleteConversation(id);
      if (success) {
        setConversations(conversationHistoryService.getConversations());
        onDeleteConversation(id);
      }
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Overlay backdrop when sidebar is open on mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className={cn(
        "fixed left-0 top-16 bottom-0 z-30 transition-all duration-300 ease-in-out",
        isOpen ? "translate-x-0 animate-sidebar-slide-in" : "-translate-x-full"
      )}>
        {/* Main sidebar content */}
        <div className={cn(
          "h-full w-72 bg-background border-r flex flex-col",
          "shadow-lg dark:bg-gray-900 dark:border-gray-800"
        )}>
          {/* New Chat button with Sidebar Toggle */}
          <div className="p-3 border-b dark:border-gray-800 flex items-center gap-2">
            <Button 
              onClick={onNewConversation} 
              className="flex-1 justify-start gap-2 bg-primary/90 hover:bg-primary"
            >
              <MessageCirclePlus size={16} />
              <span>New Chat</span>
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden" // Only show on mobile
              title="Close Sidebar"
            >
              <ChevronLeft size={16} />
            </Button>
          </div>
          
          {/* Conversation list */}
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {conversations.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  No conversation history
                </div>
              ) : (
                conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => onConversationSelect(conversation)}
                    className={cn(
                      "flex items-start gap-2 p-2 rounded-md cursor-pointer group transition-colors",
                      "hover:bg-muted/50 dark:hover:bg-gray-800/50",
                      activeConversationId === conversation.id && "bg-muted dark:bg-gray-800"
                    )}
                  >
                    <MessageCircle size={16} className="mt-1 flex-shrink-0 text-muted-foreground" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate text-sm">
                        {conversation.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatConversationDate(conversation.updatedAt)}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleDeleteConversation(e, conversation.id)}
                    >
                      <Trash2 size={14} className="text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
      
      {/* Toggle button - fixed to the side of the screen */}
      <Button
        variant="secondary"
        size="icon"
        className="fixed left-0 top-20 z-40 rounded-r-lg rounded-l-none shadow-md border-l-0 h-10 w-10 sidebar-toggle-button"
        onClick={toggleSidebar}
        title={isOpen ? "Hide Sidebar" : "Show Sidebar"}
      >
        {isOpen ? (
          <PanelLeftClose size={18} />
        ) : (
          <PanelLeftOpen size={18} className="pulse-attention" />
        )}
      </Button>
    </>
  );
} 