import React from "react";
import "../chat/chat.scss";
import { GetChats } from "../../AxiosFetchs/AuthFetchs/UsersChats";
import { useEffect, useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import chatimage from "../../assets/Icons/ footer-logo.png";
import send_message from "../../assets/Icons/ send-message.png";
import useChatConnection from "../../Hooks/useChatConnection";

const Chat = () => {

  //States
  const [currentChattingUser, setCurrentChattingUser] = useState("");
  const [displayChats, setDisplayChats] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentChatName, setCurrentChatName] = useState("");

  
  //Hooks
  const { user } = useAuth();
  const { sendMessage, messages } = useChatConnection(
    user.username,
    currentChatName
  );

  useEffect(() => {
    const fetchChats = async () => {
      if (user) {
        try {
          const chats = await GetChats(user.username);
          setDisplayChats(chats);
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      }
    };

    fetchChats();
  }, [user]);

  return (
    <div className="chat-container">
      <div className="chat-top-container">
        <div className="logo-name-container">
          <div className="logo-part">
            <img src={chatimage} alt="Chat Logo" />
          </div>
          <div className="name-part">
            <p>PetCare Chat</p>
          </div>
        </div>
        <div className="current-user-container">
          <p>{currentChattingUser}</p>
        </div>
      </div>
      <div className="chat-mid-container">
        <div className="users-container">
          <div className="user-container">
            {displayChats &&
              displayChats.map((chat, index) => (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentChatName(chat.chatName);
                    setCurrentChattingUser(
                      user.roles === "Vet" ? chat.appUserName : chat.vetUserName
                    );
                  }}
                  key={index}
                >
                  <div className="button-text-container">
                    {user.roles === "Vet" ? chat.appUserName : chat.vetUserName}
                  </div>
                </button>
              ))}
          </div>
        </div>
        <div className="message-container">
          <div className="message-content">
            {messages &&
              messages.map((msg, index) => (
                <div key={index}>{msg.senderName + ":" + msg.content}</div>
              ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(inputMessage);
              setInputMessage(""); // Clear the input after sending
            }}
          >
            <div className="send-message-container">
              <div className="input-container">
                <input
                  onChange={(e) => setInputMessage(e.target.value)}
                  value={inputMessage}
                />
              </div>
              <div className="send-button-container">
                <button type="submit">
                  <img src={send_message} alt="Send" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
