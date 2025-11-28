
import { ChatMessage } from "../types";

// Mock implementation simulating Firestore/WebSocket behavior
class ChatService {
  private listeners: Map<string, (msgs: ChatMessage[]) => void> = new Map();
  private messages: Map<string, ChatMessage[]> = new Map();

  constructor() {
    // Initialize with some dummy data
    this.messages.set('demo-chat', [
      {
        id: 'm1',
        senderId: 'doc-1',
        text: 'Hello! I see you requested a consultation. How can I help you today?',
        timestamp: Date.now() - 100000,
        status: 'read'
      }
    ]);
  }

  subscribe(consultationId: string, callback: (msgs: ChatMessage[]) => void) {
    this.listeners.set(consultationId, callback);
    
    // Send initial data
    const currentMsgs = this.messages.get(consultationId) || [];
    callback(currentMsgs);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(consultationId);
    };
  }

  async sendMessage(consultationId: string, senderId: string, text: string) {
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      senderId,
      text,
      timestamp: Date.now(),
      status: 'sent'
    };

    // Update local state
    const currentMsgs = this.messages.get(consultationId) || [];
    const updatedMsgs = [...currentMsgs, newMessage];
    this.messages.set(consultationId, updatedMsgs);

    // Notify listener
    const listener = this.listeners.get(consultationId);
    if (listener) listener(updatedMsgs);

    // Simulate "Delivered" then "Read" status updates
    setTimeout(() => {
        newMessage.status = 'delivered';
        if (listener) listener([...this.messages.get(consultationId)!]);
    }, 1000);

    // Simulate Doctor Reply if user sends message
    if (!senderId.startsWith('doc')) {
        this.simulateDoctorReply(consultationId);
    }
  }

  private simulateDoctorReply(consultationId: string) {
    setTimeout(() => {
        const reply: ChatMessage = {
            id: Math.random().toString(36).substr(2, 9),
            senderId: 'doc-1',
            text: 'I understand. Could you tell me if you have any drug allergies?',
            timestamp: Date.now(),
            status: 'sent'
        };
        const currentMsgs = this.messages.get(consultationId) || [];
        const updatedMsgs = [...currentMsgs, reply];
        this.messages.set(consultationId, updatedMsgs);
        
        const listener = this.listeners.get(consultationId);
        if (listener) listener(updatedMsgs);
    }, 3000);
  }
}

export const chatService = new ChatService();
