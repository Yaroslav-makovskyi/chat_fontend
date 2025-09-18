import { v4 as uuidv4 } from "uuid";

type MeessageObject = {
  id: string;
  username: string;
  message: string;
};

document.addEventListener("DOMContentLoaded", async () => {
  const chatContainer = document.getElementById("chatContainer");
  const usernameInput = document.getElementById(
    "usernameInput",
  ) as HTMLInputElement;
  const messageInput = document.getElementById(
    "messageInput",
  ) as HTMLInputElement;
  const sendBtn = document.getElementById("sendBtn");

  if (chatContainer && usernameInput && messageInput && sendBtn) {
    const isOwnMessage = (mesObj: MeessageObject) => {
      const myIdsStr = localStorage.getItem("myIds");
      const myIds = myIdsStr ? JSON.parse(myIdsStr) : [];
      return myIds.includes(mesObj.id);
    };

    const hideChatContainer = async () => {
      chatContainer.style.visibility = "hidden";
    };

    const showChatContainer = async () => {
      chatContainer.style.visibility = "visible";
    };

    const isAtDown = () =>
      chatContainer.scrollTop === chatContainer.scrollHeight;

    const scrollToDown = async () => {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const loadChat = async () => {
      const res = await fetch("http://46.101.114.148:3000/chat/messages");
      const json = await res.json();
      chatContainer.innerHTML = json
        .map((mesObj: MeessageObject) => {
          return isOwnMessage(mesObj)
            ? `<div class="flex items-start space-x-3 justify-end">
                  <div class="flex-1 flex flex-col items-end">
                      <div class="flex items-center space-x-2 mb-1">
                          <span class="text-xs text-gray-500"></span>
                          <span class="font-medium text-gray-800">${mesObj.username}</span>
                      </div>
                      <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl rounded-tr-md px-4 py-2 max-w-md">
                          <p class="text-white">${mesObj.message}</p>
                      </div>
                  </div>
              </div>`
            : `<div class="flex items-start space-x-3">
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
        })
        .join("\n");

      await new Promise((resolve) => requestAnimationFrame(resolve));

      if (isAtDown()) {
        scrollToDown();
      }
    };

    await hideChatContainer();
    await loadChat();
    await scrollToDown();
    await showChatContainer();

    setInterval(loadChat, 1000);

    const sendMessage = async () => {
      if (!usernameInput.value || !messageInput.value) {
        return;
      }

      const id = uuidv4();
      const myIdsStr = localStorage.getItem("myIds");
      const myIds = myIdsStr ? JSON.parse(myIdsStr) : [];
      myIds.push(id);
      localStorage.setItem("myIds", JSON.stringify(myIds));

      await fetch("http://46.101.114.148:3000/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          username: usernameInput.value,
          message: messageInput.value,
        }),
      });
      messageInput.value = "";
      messageInput.focus();
    };

    sendBtn.addEventListener("click", sendMessage);
    messageInput.addEventListener("keyup", async (e) => {
      if (e.key === "Enter") {
        await sendMessage();
      }
    });
    usernameInput.addEventListener("keyup", async (e) => {
      if (e.key === "Enter") {
        await sendMessage();
      }
    });
  }
});

/*
    мое сообщение
<div class="flex items-start space-x-3 justify-end">
    <div class="flex-1 flex flex-col items-end">
        <div class="flex items-center space-x-2 mb-1">
            <span class="text-xs text-gray-500">14:36</span>
            <span class="font-medium text-gray-800">Вы</span>
        </div>
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl rounded-tr-md px-4 py-2 max-w-md">
            <p class="text-white">Разрабатываю веб-приложение для управления задачами. Использую современные технологии ⚡</p>
        </div>
    </div>
    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
        <span class="text-white text-sm font-medium">Я</span>
    </div>
</div>
*/

/*
<!-- Сообщение от другого пользователя -->
            <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-white text-sm font-medium">М</span>
                </div>
                <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-1">
                        <span class="font-medium text-gray-800">Максим</span>
                        <span class="text-xs text-gray-500">14:35</span>
                    </div>
                    <div class="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2 max-w-md">
                        <p class="text-gray-800">Круто! А что за проект? Можешь рассказать подробнее?</p>
                    </div>
                </div>
            </div>
*/
