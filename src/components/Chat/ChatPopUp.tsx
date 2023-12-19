import React, { useEffect, useState } from "react";
import "../../styles/Chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faNoteSticky, faPaperPlane, faPaperclip, faTimes } from "@fortawesome/free-solid-svg-icons";

export const ChatPopUp: React.FC = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [isOpen, setIsOpen] = React.useState(false);

    const togglePopup = () => {
       setIsOpen(!isOpen);
    };

    const handleSendMessage = () => {
        setMessages([...messages, message]);
        setMessage('');
    };

    useEffect(() => {
        setMessages(['Hello girls, Welcome to BeautyBestie !', 
        'Here we sell some kind of skincare products']);
    }, []);

    return (
        <div>
            {isOpen && (
                <div className="chatPopUp__container">
                    <div className='chatPopUp__header-container'>
                        <div className='chatPopUp__title-container'>
                            <img src={'images/logo.png'} className='chatPopUp__logo-image' alt='logo'/>
                            <span className="chatPopUp__title">eautyBestie</span>
                        </div>
                        <button className="chatPopUp__close-button" onClick={togglePopup}>
                            <FontAwesomeIcon icon={faTimes} className="chatPopUp__times-icon"/>
                        </button>
                    </div>
                    <button className="chatPopUp__btn-today">Today</button>
                    <div className="chatPopUp__chat-msg">
                        {messages.map((msg, index) => (
                            <p key={index} className="chatPopUp__message">
                                {msg}
                            </p>
                        ))}
                        <p className="chat-msg__clock">21.56</p>
                    </div>
                    <div className="chatPopUp__send-msg-btn">
                        <FontAwesomeIcon icon={faNoteSticky} className="send-msg__icons"/>
                        <FontAwesomeIcon icon={faPaperclip} className="send-msg__icons"/>
                        <input
                            className="chatPopUp__input"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..." />
                        <button className="chatPopUp__btn-send-msg" onClick={handleSendMessage}>
                            <FontAwesomeIcon icon={faPaperPlane}/>
                        </button>
                    </div>
                </div>
            )}
            <button onClick={togglePopup} className="chatPopUp__chat-icon">
                <FontAwesomeIcon icon={faCommentDots}/>
            </button>
        </div>
    );
};
