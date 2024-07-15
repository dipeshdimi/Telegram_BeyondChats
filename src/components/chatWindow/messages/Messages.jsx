import './Messages.css';
import { useState, useEffect } from 'react';

export default function Messages({ chatId, messages }) {
  const [apiMessages, setApiMessages] = useState([]);

  useEffect(() => {
    if (chatId) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`);
          const data = await response.json();
          setApiMessages(data.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
    }
  }, [chatId]);

  return (
    <div className='messages'>
      {[...apiMessages, ...messages].map((message) => (
        <div key={message.id} className={`message ${message.sender_id === 1 ? 'own' : ''}`}>
          <p className='message-text'>{message.message} </p>
          <span className="message-timestamp">{new Date(message.created_at).toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  );
}
