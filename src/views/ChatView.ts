import { MessageObject } from "../models/ChatModel";

export class ChatView {
  private chatContainer;
  private usernameInput;
  private messageInput;
  private sendBtn;

  constructor() {
    this.chatContainer = document.getElementById(
      "chatContainer"
    ) as HTMLElement;
    this.usernameInput = document.getElementById(
      "usernameInput"
    ) as HTMLInputElement;
    this.messageInput = document.getElementById(
      "messageInput"
    ) as HTMLInputElement;
    this.sendBtn = document.getElementById("sendBtn") as HTMLElement;
  }

  onReady = (func: () => void) => {
    document.addEventListener("DOMContentLoaded", func);
  };

  hideChatContainer = async () => {
    this.chatContainer.style.visibility = "hidden";
  };

  showChatContainer = async () => {
    this.chatContainer.style.visibility = "visible";
  };

  isAtDown = () =>
    Math.round(this.chatContainer.scrollTop) +
      this.chatContainer.clientHeight ===
    this.chatContainer.scrollHeight;

  scrollToDown = async () => {
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  };

  private sendMessage = async (func: (message: MessageObject) => void) => {
    if (!this.usernameInput.value || !this.messageInput.value) {
      return;
    }

    func({
      username: this.usernameInput.value,
      message: this.messageInput.value,
    });

    this.messageInput.value = "";
    this.messageInput.focus();
  };

  onSendMessage = (func: (message: MessageObject) => void) => {
    this.sendBtn.addEventListener("click", () => {
      this.sendMessage(func);
    });

    this.messageInput.addEventListener("keyup", async (e) => {
      if (e.key === "Enter") {
        this.sendMessage(func);
      }
    });

    this.usernameInput.addEventListener("keyup", async (e) => {
      if (e.key === "Enter") {
        this.sendMessage(func);
      }
    });
  };

  clearMessages = () => {
    this.chatContainer.innerHTML = "";
  };

  displayOwnMessage = (mesObj: MessageObject) => {
    this.chatContainer.innerHTML += `
      <div class="flex items-start space-x-3 justify-end">
          <div class="flex-1 flex flex-col items-end">
              <div class="flex items-center space-x-2 mb-1">
                  <span class="text-xs text-gray-500"></span>
                  <span class="font-medium text-gray-800">${mesObj.username}</span>
              </div>
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl rounded-tr-md px-4 py-2 max-w-md">
                  <p class="text-white">${mesObj.message}</p>
              </div>
          </div>
      </div>`;
  };

  displayOtherMessage = (mesObj: MessageObject) => {
    this.chatContainer.innerHTML += `
      <div class="flex items-start space-x-3">
          <div class="flex-1">
              <div class="flex items-center space-x-2 mb-1">
                  <span class="font-medium text-gray-800">${mesObj.username}</span>
                  <span class="text-xs text-gray-500"></span>
              </div>
              <div class="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2 max-w-md">
                  <p class="text-gray-800">${mesObj.message}</p>
              </div>
          </div>
      </div>`;
  };

  waitAnimationFrame = async () => {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  };
}
