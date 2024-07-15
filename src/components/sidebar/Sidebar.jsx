import { useEffect, useState } from 'react';
import './Sidebar.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

const Sidebar = ({ onChatSelect, chatMessages }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('https://devapi.beyondchats.com/api/get_all_chats?page=1');
        const data = await response.json();
        setChats(data.data.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  function getFormattedDateTime(createdAt) {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = currentDate.getTime() - createdDate.getTime();
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    if (minutesDifference < 1440) {
      return createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return createdDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  return (
    <div className='sidebar'>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor: 'rgb(33, 33, 33)' }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <GiHamburgerMenu color='gray' />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1, color: 'gray', background: 'rgb(55,55, 55);', borderRadius: '15px', padding: '0 5%' }}
          placeholder="Search Telegram"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <IoIosSearch color='gray' />
        </IconButton>
      </Paper>

      <div className='contacts-container'>
        {chats.map((chat) => {
          const lastMessage = chatMessages[chat.id]?.slice(-1)[0]?.message || 'No new messages yet';
          return (
            <div key={chat.id} onClick={() => onChatSelect(chat.id)} className="contact-card">
              <img src="/static/sample_pfp.jpg" alt="Profile Picture" className='profile-picture' />
              <div className='contact-card-text'>
                <div className='contact-card-info'>
                  <p className='contact-name'>{chat.creator.name ? chat.creator.name : 'Unknown'}</p>
                  <p className='time'>{getFormattedDateTime(chat.creator.created_at)}</p>
                </div>
                <div className='last-message-info'>
                  <p className='last-message'>{lastMessage}</p>
                  <p className='unread'>1</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  onChatSelect: PropTypes.func.isRequired,
  chatMessages: PropTypes.object.isRequired,
};

export default Sidebar;
