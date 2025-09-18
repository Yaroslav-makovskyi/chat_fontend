import { ChatModel, Message } from "../models/ChatModel";
import { ChatView } from "../views/ChatView";

export class ChatController {
  private model: ChatModel;
  private view: ChatView;

  constructor() {
    this.model = new ChatModel();
    this.view = new ChatView();
    this.initializeEventListeners();
  }

  static isReady(): boolean {
    const chatContainer = document.getElementById("chatContainer");
    const usernameInput = document.getElementById("usernameInput");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    
    return !!(chatContainer && usernameInput && messageInput && sendBtn);
  }

  private initializeEventListeners(): void {
    this.view.bindSendMessage(() => this.handleSendMessage());
    this.view.bindKeyPress((event: KeyboardEvent) => {
      if (event.key === "Enter") {
        this.handleSendMessage();
      }
    });
  }

  async initialize(): Promise<void> {
    this.view.hideChatContainer();
    await this.loadChat();
    this.view.showChatContainer();
    this.startAutoRefresh();
  }

  private async loadChat(): Promise<void> {
    const messages = await this.model.fetchMessages();
    this.view.renderMessages(messages, (message) => this.model.isOwnMessage(message));
    
    await this.waitForNextFrame();
    if (this.view.isAtBottom()) {
      this.view.scrollToBottom();
    }
  }

  private async handleSendMessage(): Promise<void> {
    const username = this.view.getUsername();
    const message = this.view.getMessage();

    if (!username || !message) {
      return;
    }

    const success = await this.model.sendMessage(username, message);
    if (success) {
      this.view.clearMessageInput();
      await this.loadChat();
    }
  }

  private startAutoRefresh(): void {
    setInterval(() => {
      this.loadChat();
    }, 1000);
  }

  private waitForNextFrame(): Promise<void> {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
  }
}
