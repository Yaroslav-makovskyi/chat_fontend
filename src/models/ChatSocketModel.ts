import { io } from "socket.io-client";
import { MessageObject, ChatModel } from "./ChatModel";

export class ChatSocketModel extends ChatModel {
  private socket;

  constructor(host: string) {
    super(host);
    this.socket = io(this.host);
  }

  onNewMessage = (func: (message: MessageObject) => void) => {
    this.socket.on("newMessage", (message) => {
      func(message);
    });
  };

  sendMessage = async (message: MessageObject) => {
    if (!message.username || !message.message) {
      return;
    }

    this.socket.emit("sendMessage", {
      id: this.generateId(),
      username: message.username,
      message: message.message,
    });
  };
}
