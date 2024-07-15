import './ChatTop.css';
import { MdOutlineCall } from "react-icons/md";
import { IoIosSearch, IoMdArrowRoundBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import PropTypes from 'prop-types';

const ChatTop = ({ onBackClick }) => {
  return (
    <div className='chat-window-top'>
      <div className='left-content'>
        <button 
          className='desktop-disappear' 
          onClick={onBackClick}
        >
          <IoMdArrowRoundBack color='gray' size={32} />
        </button>
        <div className='active-contact-info'>
          <img src="/static/sample_pfp.jpg" alt="Profile Picture" className='active-contact-picture' />
          <div className='active-contact-text'>
            <p className='active-contact-name'>Name not present in API 2</p>
            <p className='last-seen'>last seen recently</p>
          </div>
        </div>
      </div>
      <div className='actions'>
        <IoIosSearch className='mobile-disappear' size={32} />
        <MdOutlineCall className='mobile-disappear' size={32} />
        <SlOptionsVertical size={26} />
      </div>
    </div>
  );
};

ChatTop.propTypes = {
  chatVisibility: PropTypes.bool.isRequired,
  setChatVisibility: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default ChatTop;
