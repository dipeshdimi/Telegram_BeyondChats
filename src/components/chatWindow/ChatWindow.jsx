import './ChatWindow.css';
import ChatTop from './chatTop/ChatTop';
import Messages from './messages/Messages';
import MessageInput from './messageInput/MessageInput';

const ChatWindow = ({ chatId, messages, onSendMessage, chatVisibility, setChatVisibility }) => {
  return (
    <div className="chat-window" style={{ display: chatVisibility ? 'block' : 'none' }}>
      {
        chatId &&
        <div className='chat-window-content'>
          <ChatTop chatVisibility={chatVisibility} setChatVisibility={setChatVisibility} />
          <Messages chatId={chatId} messages={messages} />
          <MessageInput onSendMessage={onSendMessage} />
        </div>
      }
    </div>
  );
};

export default ChatWindow;
