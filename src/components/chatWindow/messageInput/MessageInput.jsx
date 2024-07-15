import { useState } from 'react';
import PropTypes from 'prop-types';
import './MessageInput.css';
import { GrAttachment } from "react-icons/gr";
import { MdOutlineEmojiEmotions, MdSend } from "react-icons/md";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleSendMessage = () => {
    if (message.trim() || attachment) {
      onSendMessage(message, attachment);
      setMessage('');
      setAttachment(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
          onKeyDown={handleKeyDown}
        />
        <label className="attach-button">
          <GrAttachment color='gray' size={28} />
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .gif, .pdf"
            className="file-input"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <button className="send-button" onClick={handleSendMessage}>
        <MdSend color='rgb(118,106,200)' size={40} />
      </button>
    </div>
  );
}

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default MessageInput;
