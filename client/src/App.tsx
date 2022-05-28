import { useState } from "react";
import { io } from "socket.io-client";
import Chat from "./components/Chat";

const socket = io('http://localhost:3001');

function App() {
  const [isJoin, setIsJoin] = useState(true);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  /**
   * If the username and room are not empty, emit a join_room event to the server and set the isJoin
   * state to true
   */
  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setIsJoin(!isJoin);
    }
  }

  return (
    <div className="min-h-screen grid place-content-center gap-16">
      {
        isJoin 
        ? (
          <div className="flex flex-col">
            <h3 className="text-4xl mx-auto font-bold">Join A Chat</h3>
            <input 
              className="rounded-md py-2 px-3 border mt-6 shadow focus:outline-none focus:ring-2 focus:ring-teal-500 duration-150"
              type="text" 
              placeholder="Username..." 
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input 
              className="rounded-md py-2 px-3 border mt-3 shadow focus:outline-none focus:ring-2 focus:ring-teal-500 duration-150"
              type="text" 
              placeholder="Room ID..." 
              value={room}
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button
              className="bg-teal-400 text-white font-bold mt-6 rounded py-2 px-4 hover:bg-teal-500 duration-300"
              type="button" 
              onClick={joinRoom}
            >
              Join A Room
            </button>
          </div>
        )
        : (
          <Chat socket={socket} username={username} room={room}/>
        )
      }
    </div>
  );
}

export default App;
