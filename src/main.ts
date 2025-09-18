import { ChatController } from "./controllers/ChatController";

document.addEventListener("DOMContentLoaded", async () => {
  if (ChatController.isReady()) {
    const controller = new ChatController();
    await controller.initialize();
  }
});