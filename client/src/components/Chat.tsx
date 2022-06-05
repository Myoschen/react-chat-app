import moment from "moment";
import {ChevronRightIcon} from '@heroicons/react/outline';
import { useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client"

interface ChatProps {
  socket: Socket;
  username: string;
  server: Server | null;
}

function Chat({ socket, username, server }: ChatProps) {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');  
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.on('receive_message', (data: Message) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    setMessageList([]);
  }, [server]);

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
    if (currentMessage !== '' && server) {
      const messageData: Message = {
        server: server.id,
        username: username,
        message: currentMessage,
        time: moment().format('h:mm'),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  }

  return (
    <div className="flex flex-col grow">
      <div className="py-8 text-white bg-custom-dark">
        <p className="text-2xl font-bold text-center">
          {
            server?.displayName !== '' ? server?.displayName : 'You have to join room!' 
          }
        </p>
      </div>
      <div className="flex flex-col gap-4 p-4 overflow-y-scroll bg-gray-200 grow">
        {
          messageList.map((message, index) => {
            return message.username !== username 
              ? (
                <div key={index} className="flex flex-col self-start">
                  <span className="font-bold">{message.username}</span>
                  <span className="px-3 py-2 my-2 break-all bg-white rounded-md">{message.message}</span>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
              )
              : (
                <div key={index} className="flex flex-col items-end self-end">
                  <span className="font-bold">{message.username}</span>
                  <span className="px-3 py-2 my-2 break-all bg-white rounded-md">{message.message}</span>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
              );
          })
        }
        <div ref={messageEndRef}/>
      </div>
      <div className="flex overflow-hidden rounded-b-md">
        <input 
          className="w-full px-4 text-xl focus:outline-none"
          type="text" 
          placeholder="text..."
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button 
          className="p-4 font-black duration-300 hover:bg-gray-200"
          type="button" 
          onClick={sendMessage}
        >
          <ChevronRightIcon width={20}/>
        </button>
      </div>
    </div>
  )
}

export default Chat;