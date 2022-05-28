import moment from "moment";
import { useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client"

interface ChatProps {
  socket: Socket;
  username: string;
  room: string;
}

function Chat({ socket, username, room }: ChatProps) {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');  
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.on('receive_message', (data: Message) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  })

  /**
   * It scrolls to the bottom of the page.
   */
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' , block: "end", inline: "nearest"});
  }

  /**
   * When the user clicks the send button, if the current message is not empty, then send the message
   * to the server and add it to the message list.
   */
  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData: Message = {
        room: room,
        author: username,
        message: currentMessage,
        time: moment().format('h:mm'),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  }

  return (
    <div className="w-80 shadow-lg">
      <div className="bg-custom-dark text-white py-4 rounded-t-md">
        <p className="text-2xl text-center font-bold">Live Chat</p>
      </div>
      <div className="h-80 flex flex-col gap-4 p-4 bg-gray-200 overflow-y-scroll">
        {
          messageList.map((message) => {
            return message.author !== username 
              ? (
                <div key={message.time} className="self-start flex flex-col">
                  <span className="font-bold">{message.author}</span>
                  <span className="bg-white py-2 px-3 rounded-md my-2 break-all">{message.message}</span>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
              )
              : (
                <div key={message.time} className="self-end flex flex-col items-end">
                  <span className="font-bold">{message.author}</span>
                  <span className="bg-white py-2 px-3 rounded-md my-2 break-all">{message.message}</span>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
              );
          })
        }
        <div ref={messageEndRef}/>
      </div>
      <div className="flex rounded-b-md">
        <input 
          className="w-full text-xl px-4 focus:outline-none"
          type="text" 
          placeholder="text..."
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button 
          className="p-4 hover:bg-gray-200 duration-300 font-black"
          type="button" 
          onClick={sendMessage}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

export default Chat