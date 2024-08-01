import React from "react";
import "../chat/chat.scss";
import { GetChats } from "../../AxiosFetchs/AuthFetchs/UsersChats";
import { useEffect, useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import chatimage from "../../assets/Icons/ footer-logo.png";
import send_message from "../../assets/Icons/ send-message.png";
import { CreateChatConnection } from "../../AxiosFetchs/AuthFetchs/ChatConnection";
const Chat = () => {
  const [chats, setChats] = useState([]);
  const [currentChattingUser, setCurrentChattingUser] = useState("");
  const [currentConnection, setCurrentConnection] = useState();
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchChats = async () => {
      if (user) {
        try {
          const chats = await GetChats(user.username);
          setChats(chats);
          console.log(chats);
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      }
    };
    


    fetchChats();
  }, [user]);
  // useEffect(() => {
  // }, []);
  return (
    <>
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
            <p>{currentChattingUser}</p>
          </div>
        </div>
        <div className="chat-mid-container">
          <div className="users-container">
            <div className="user-container">
              {chats &&
                chats.map((chat, index) => (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      CreateChatConnection(user.username, chat.chatName).then(
                        (r) => {
                          setCurrentConnection(r.connection);
                          setMessages(r.messages);
                          console.log(messages);
                        }
                      );
                    }}
                    key={index}
                  >
                    <div className="button-text-container">
                      {user.roles === "Vet"
                        ? chat.appUserName
                        : chat.vetUserName}
                    </div>
                  </button>
                ))}
            </div>
          </div>
          <div className="message-container">
            <div className="message-content">
              {
                messages.map((message,index)=>(
                  <div key={index}>
                  {message.content}
                  </div>
                ))
              }
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
    </>
  );
};

export default Chat;
