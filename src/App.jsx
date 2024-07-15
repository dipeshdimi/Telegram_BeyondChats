import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import ChatWindow from './components/chatWindow/ChatWindow';
import './App.css';

const App = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [chatVisibility, setChatVisibility] = useState(true);

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

  return (
    <div className='telegram'>
      <Sidebar 
        onChatSelect={handleChatSelect} 
        chatMessages={chatMessages}
        chatVisibility={chatVisibility}
        setChatVisibility={setChatVisibility} 
      />
      <ChatWindow
        chatId={selectedChatId}
        messages={chatMessages[selectedChatId] || []}
        onSendMessage={(message) => handleSendMessage(selectedChatId, message)}
        chatVisibility={chatVisibility}
        setChatVisibility={setChatVisibility}
        style={{ display: chatVisibility ? 'block' : 'none' }}
      />
    </div>
  );
};

export default App;
