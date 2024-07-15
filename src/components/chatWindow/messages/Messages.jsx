import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Messages.css';

const Messages = ({ chatId, messages }) => {
  const [apiMessages, setApiMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [apiMessages, messages]);

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

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={messagesEndRef} className='messages'>
      {[...apiMessages, ...messages].map((message) => (
        <div key={message.id} className={`message ${message.sender_id === 1 ? 'own' : ''}`}>
          <p className='message-text'>{message.message}</p>
          <span className="message-timestamp">{new Date(message.created_at).toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  );
};

Messages.propTypes = {
  chatId: PropTypes.number,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      sender_id: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Messages;
