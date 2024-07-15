import './ChatWindow.css';
import ChatTop from './chatTop/ChatTop';
import Messages from './messages/Messages';
import MessageInput from './messageInput/MessageInput';
import PropTypes from 'prop-types';

const ChatWindow = ({ chatId, messages, onSendMessage, chatVisibility, onBackClick }) => {
  return (
    <div className="chat-window" style={{ display: chatVisibility ? 'block' : 'none' }}>
      <div className='chat-window-content'>
        <ChatTop onBackClick={onBackClick} />
        <Messages chatId={chatId} messages={messages} />
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

ChatWindow.propTypes = {
  chatId: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  chatVisibility: PropTypes.bool.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default ChatWindow;
