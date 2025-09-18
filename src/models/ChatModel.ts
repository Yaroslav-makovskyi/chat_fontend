import { v4 as uuidv4 } from "uuid";

export interface Message {
  id: string;
  username: string;
  message: string;
}

export class ChatModel {
  private messages: Message[] = [];
  private myIds: string[] = [];
  private readonly API_BASE_URL = "http://46.101.114.148:3000/chat";

  constructor() {
    this.loadMyIds();
  }

  private loadMyIds(): void {
    const myIdsStr = localStorage.getItem("myIds");
    this.myIds = myIdsStr ? JSON.parse(myIdsStr) : [];
  }

  private saveMyIds(): void {
    localStorage.setItem("myIds", JSON.stringify(this.myIds));
  }

  async fetchMessages(): Promise<Message[]> {
    try {
      const res = await fetch(`${this.API_BASE_URL}/messages`);
      const json = await res.json();
      this.messages = json;
      return json;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return this.messages;
    }
  }

  async sendMessage(username: string, message: string): Promise<boolean> {
    if (!username || !message) {
      return false;
    }

    try {
      const id = uuidv4();
      this.myIds.push(id);
      this.saveMyIds();

      const response = await fetch(`${this.API_BASE_URL}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          username,
          message,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Error sending message:", error);
      return false;
    }
  }

  isOwnMessage(message: Message): boolean {
    return this.myIds.includes(message.id);
  }

  getMessages(): Message[] {
    return this.messages;
  }
}
