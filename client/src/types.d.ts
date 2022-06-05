interface Message {
  server: string;
  username: string;
  message: string;
  time: string;
}

interface Server {
  id: string;
  displayName: string;
}