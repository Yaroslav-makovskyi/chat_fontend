// Простой пример TypeScript кода
interface User {
  name: string;
  age: number;
  email: string;
}

class ChatApp {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
    console.log(`Пользователь ${user.name} добавлен в чат`);
  }

  getUsers(): User[] {
    return this.users;
  }

  sendMessage(from: string, message: string): void {
    console.log(`${from}: ${message}`);
  }
}

// Пример использования
const chat = new ChatApp();

chat.addUser({
  name: "Алексей",
  age: 25,
  email: "alex@example.com"
});

chat.addUser({
  name: "Мария",
  age: 30,
  email: "maria@example.com"
});

chat.sendMessage("Алексей", "Привет! Как дела?");
chat.sendMessage("Мария", "Привет! Всё хорошо, спасибо!");

console.log("Все пользователи:", chat.getUsers());
