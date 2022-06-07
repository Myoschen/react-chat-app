const onlineUsers: User[] = [];

function joinServer(user: User) {
  onlineUsers.push(user);
}

function leaveServer(username: string) {
  const index = onlineUsers.findIndex(user => user.username === username);
  if (index !== -1) {
    onlineUsers.splice(index, 1)[0];
  }
}

export {onlineUsers, joinServer, leaveServer};