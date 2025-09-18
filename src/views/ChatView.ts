import { Message } from "../models/ChatModel";

export class ChatView {
  private chatContainer: HTMLElement;
  private usernameInput: HTMLInputElement;
  private messageInput: HTMLInputElement;
  private sendBtn: HTMLElement;

  constructor() {
    this.chatContainer = document.getElementById("chatContainer")!;
    this.usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
    this.messageInput = document.getElementById("messageInput") as HTMLInputElement;
    this.sendBtn = document.getElementById("sendBtn")!;
  }

  renderMessages(messages: Message[], isOwnMessage: (message: Message) => boolean): void {
    this.chatContainer.innerHTML = messages
      .map((message) => this.createMessageHTML(message, isOwnMessage(message)))
      .join("\n");
  }

  private createMessageHTML(message: Message, isOwn: boolean): string {
    if (isOwn) {
      return `<div class="flex items-start space-x-3 justify-end">
                  <div class="flex-1 flex flex-col items-end">
                      <div class="flex items-center space-x-2 mb-1">
                          <span class="text-xs text-gray-500"></span>
                          <span class="font-medium text-gray-800">${message.username}</span>
                      </div>
                      <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl rounded-tr-md px-4 py-2 max-w-md">
                          <p class="text-white">${message.message}</p>
                      </div>
                  </div>
              </div>`;
    } else {
      return `<div class="flex items-start space-x-3">
                  <div class="flex-1">
                      <div class="flex items-center space-x-2 mb-1">
                          <span class="font-medium text-gray-800">${message.username}</span>
                          <span class="text-xs text-gray-500"></span>
                      </div>
                      <div class="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2 max-w-md">
                          <p class="text-gray-800">${message.message}</p>
                      </div>
                  </div>
              </div>`;
    }
  }

  hideChatContainer(): void {
    this.chatContainer.style.visibility = "hidden";
  }

  showChatContainer(): void {
    this.chatContainer.style.visibility = "visible";
  }

  isAtBottom(): boolean {
    return this.chatContainer.scrollTop === this.chatContainer.scrollHeight;
  }

  scrollToBottom(): void {
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }

  clearMessageInput(): void {
    this.messageInput.value = "";
    this.messageInput.focus();
  }

  getUsername(): string {
    return this.usernameInput.value;
  }

  getMessage(): string {
    return this.messageInput.value;
  }

  bindSendMessage(handler: () => void): void {
    this.sendBtn.addEventListener("click", handler);
  }

  bindKeyPress(handler: (event: KeyboardEvent) => void): void {
    this.messageInput.addEventListener("keyup", handler);
    this.usernameInput.addEventListener("keyup", handler);
  }
}
