interface User {
  id: string;
  username: string;
  server: string;
}

interface JoinEvent {
  username: string;
  server: string;
}

type MessageType = 'text' | 'image';

interface Message {
  server: string;
  username: string;
  message: string;
  type: MessageType;
  time: string;
}