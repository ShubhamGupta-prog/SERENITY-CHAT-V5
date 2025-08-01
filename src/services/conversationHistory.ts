import { MessageType } from "@/components/chat/ChatMessage";
import { AuthUser } from "./auth";

export interface Conversation {
  id: string;
  title: string;
  messages: MessageType[];
  createdAt: Date;
  updatedAt: Date;
}

export class ConversationHistoryService {
  private readonly BASE_STORAGE_KEY = 'serenity-chat-conversations';
  private user: AuthUser | null = null;

  // Set the current user for the service
  setUser(user: AuthUser | null) {
    this.user = user;
  }

  // Get the storage key specific to the current user
  private getStorageKey(): string {
    if (this.user) {
      return `${this.BASE_STORAGE_KEY}-${this.user.uid}`;
    }
    return this.BASE_STORAGE_KEY;
  }

  // Get all conversations for the current user
  getConversations(): Conversation[] {
    try {
      const storageKey = this.getStorageKey();
      const data = localStorage.getItem(storageKey);
      
      if (!data) {
        // Initialize empty storage if not exists
        localStorage.setItem(storageKey, JSON.stringify([]));
        return [];
      }
      
      // Parse the raw data first
      const rawConversations = JSON.parse(data);
      
      // Convert the date strings back to Date objects
      const conversations = rawConversations.map((conv: any) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      })) as Conversation[];
      
      // Sort by updatedAt (most recent first)
      return conversations.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    } catch (error) {
      console.error('Failed to get conversations:', error);
      return [];
    }
  }

  // Get a specific conversation by ID
  getConversation(id: string): Conversation | null {
    const conversations = this.getConversations();
    return conversations.find(conv => conv.id === id) || null;
  }

  // Create a new conversation
  createConversation(initialMessage: MessageType): Conversation {
    const conversations = this.getConversations();
    
    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      title: this.generateTitle(initialMessage.content),
      messages: [initialMessage],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    conversations.unshift(newConversation);
    this.saveConversations(conversations);
    
    return newConversation;
  }

  // Update an existing conversation
  updateConversation(id: string, updates: Partial<Conversation>): Conversation | null {
    const conversations = this.getConversations();
    const index = conversations.findIndex(conv => conv.id === id);
    
    if (index === -1) return null;
    
    const updatedConversation = {
      ...conversations[index],
      ...updates,
      updatedAt: new Date()
    };
    
    conversations[index] = updatedConversation;
    this.saveConversations(conversations);
    
    return updatedConversation;
  }

  // Add a message to a conversation
  addMessageToConversation(conversationId: string, message: MessageType): Conversation | null {
    const conversation = this.getConversation(conversationId);
    if (!conversation) return null;
    
    conversation.messages.push(message);
    conversation.updatedAt = new Date();
    
    return this.updateConversation(conversationId, {
      messages: conversation.messages,
      updatedAt: new Date()
    });
  }

  // Delete a conversation
  deleteConversation(id: string): boolean {
    const conversations = this.getConversations();
    const filteredConversations = conversations.filter(conv => conv.id !== id);
    
    if (filteredConversations.length === conversations.length) {
      return false; // No conversation was deleted
    }
    
    this.saveConversations(filteredConversations);
    return true;
  }

  // Helper method to save conversations to localStorage
  private saveConversations(conversations: Conversation[]): void {
    const storageKey = this.getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(conversations));
  }

  // Helper method to generate a conversation title based on first message
  private generateTitle(content: string): string {
    // Extract first 30 characters from user message
    const titlePreview = content.slice(0, 30).trim();
    return titlePreview + (content.length > 30 ? '...' : '');
  }
}

export const conversationHistoryService = new ConversationHistoryService(); 