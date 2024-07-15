import { useState } from 'react';
import './MessageInput.css';
import { GrAttachment } from "react-icons/gr";
import { MdOutlineEmojiEmotions, MdSend } from "react-icons/md";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="message-input-wrapper">
      <div className='input-wrapper'>
        <button className="menu-button">
          <MdOutlineEmojiEmotions color='gray' size={28} />
        </button>
        <input
          type="text"
          className="message-input"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="menu-button attach-button">
          <GrAttachment color='gray' size={28} />
        </button>
      </div>
      <button className="send-button" onClick={handleSendMessage}><MdSend color='rgb(118,106,200)' size={40} /></button>
    </div>
  );
}

export default MessageInput;
