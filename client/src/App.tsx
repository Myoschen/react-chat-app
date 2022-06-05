import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ChatIcon, PlusIcon } from '@heroicons/react/solid';
import useToggle from './hooks/useToggle';
import Chat from './components/Chat';
import Modal from './components/Modal';

const socket = io('http://localhost:3001');

function App() {
  // 使用者名稱
  const [username, setUsername] = useState('');
  
  // 控制 Modal
  const [isOpen, setIsOpen] = useToggle(true);
  
  // 目前的伺服器
  const [server, setServer] = useState<Server | null>(null);
  
  // 伺服器清單
  const [serverList, setServerList] = useState<Array<Server>>([
    {
      id: '1',
      displayName: "Myos's Server",
    },
  ]);

  const handleModal = () => {
    if (username !== '') {
      setIsOpen();
    }
  }

  useEffect(() => {
    if (server) {
      socket.emit('join', server.id);
    }
  }, [server]);

  return (
    <div className='relative flex w-full h-full overflow-hidden'>
      {/* Modal: Join a chat room */}
      {
        isOpen 
          && (
          <Modal isOpen={isOpen} close={setIsOpen}>
            <div className="flex flex-col">
              <h3 className="mx-auto text-4xl font-bold">Take a Username</h3>
              <input
                className="px-3 py-2 mt-6 duration-150 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-teal-500"
                type="text"
                placeholder="Username..."
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              {/* <input
                className="px-3 py-2 mt-3 duration-150 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-teal-500"
                type="text"
                placeholder="Room ID..."
                value={room}
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              /> */}
              <button
                className="px-4 py-2 mt-6 font-bold text-white duration-300 bg-blue-400 rounded hover:bg-blue-500"
                type="button"
                onClick={handleModal}
              >
                Confirm
              </button>
            </div>
          </Modal>
        )
      }
      {/* TODO:Sidebar */}
      <div className='z-10 w-64 h-screen text-white border-r shrink-0 border-r-gray-500 bg-custom-dark'>
        <div className='flex flex-col justify-between h-full p-8'>
          <div>
            <span className='flex text-2xl'>
              <ChatIcon width={30}/>
              <span className='mx-auto font-bold'>Chat App</span>
            </span>
            <div className='w-full h-[1px] bg-white my-8'/>
            <ul className='flex flex-col gap-2'>
              {
                serverList.map((server) => {
                  return (
                    <li key={server.id}>
                      <button 
                        className="w-full px-4 py-2 font-bold text-white duration-300 rounded bg-custom-dark hover:bg-blue-600"
                        type='button' 
                        onClick={() => setServer(server)}
                      >
                        {server.displayName}
                      </button>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <button 
            className='flex items-center w-full px-4 py-2 font-bold text-white duration-300 rounded justify-evenly bg-custom-dark hover:bg-blue-600'
            type='button'
            onClick={()=>{
              setServerList([...serverList, {
                id: `server-${serverList.length}`,
                displayName: `Test ${serverList.length}`
              }]);
            }}
          >
            <PlusIcon width={20}/>
            Create Server
          </button>
        </div>
      </div>
      <Chat socket={socket} username={username} server={server} />
    </div>
  );
}

export default App;
