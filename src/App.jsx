import { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import ChatWindow from './components/chatWindow/ChatWindow';
import './App.css';

const App = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [chatVisibility, setChatVisibility] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 850);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
    setChatVisibility(true);
  };

  const handleSendMessage = (chatId, message) => {
    const newMessage = {
      id: Date.now(),
      sender_id: 1,
      sender: { name: 'You' },
      message,
      created_at: new Date().toISOString(),
    };

    setChatMessages(prevMessages => ({
      ...prevMessages,
      [chatId]: [...(prevMessages[chatId] || []), newMessage]
    }));
  };

  const handleBackClick = () => {
    setSelectedChatId(null);
    setChatVisibility(false);
  };

  return (
    <div className='telegram'>
      {(!selectedChatId || !isMobile || !(isMobile && chatVisibility)) && (
        <Sidebar 
          onChatSelect={handleChatSelect} 
          chatMessages={chatMessages}
        />
      )}
      {selectedChatId ? (
        <ChatWindow 
          chatId={selectedChatId} 
          messages={chatMessages[selectedChatId] || []} 
          onSendMessage={(message) => handleSendMessage(selectedChatId, message)}
          chatVisibility={chatVisibility}
          onBackClick={handleBackClick}
        />
      ) :
      <div className='chat-window bg'></div>
      }
    </div>
  );
};

export default App;
