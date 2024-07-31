import React from "react";
import "../chat/chat.scss";
import chatimage from "../../assets/Icons/ footer-logo.png";
import send_message from "../../assets/Icons/ send-message.png";

const Chat = () => {
  return (
    <div className="chat-container">
      <div className="chat-top-container">
        <div className="logo-name-container">
          <div className="logo-part">
            <img src={chatimage}></img>
          </div>
          <div className="name-part">
            <p>PetCare Chat</p>
          </div>
        </div>
        <div className="current-user-container">
          <p>Elgun Wet</p>
        </div>
      </div>
      <div className="chat-mid-container">
        <div className="users-container">
            <div className="user-container">
                <button>
                    <div className="button-text-container">
                        Elgun Wet
                    </div>
                </button>
            </div>
            <div className="user-container">
                <button>
                    <div className="button-text-container">
                        Emil Wet
                    </div>
                </button>
            </div>
            <div className="user-container">
                <button>
                    <div className="button-text-container">
                        Cavid Wet
                    </div>
                </button>
            </div>
        </div>
        <div className="message-container">
            <div className="message-content">

            </div>
            <div className="send-message-container">
                <div className="input-container">
                    <input></input>
                </div>
                <div className="send-button-container">
                    <button>
                        <img src={send_message}></img>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
