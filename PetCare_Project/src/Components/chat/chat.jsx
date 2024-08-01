import React from "react";
import "../chat/chat.scss";
import { GetChats } from "../../AxiosFetchs/AuthFetchs/UsersChats";
import { useEffect, useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import chatimage from "../../assets/Icons/ footer-logo.png";
import send_message from "../../assets/Icons/ send-message.png";
import { CreateChatConnection } from "../../AxiosFetchs/AuthFetchs/ChatConnection";
import { add } from "../../Store/messagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { GetCHatsMessages } from "../../AxiosFetchs/AuthFetchs/GetChatsMessages";


const Chat = () => {
  const [currentChattingUser, setCurrentChattingUser] = useState("");
  const [currentChatName, setCurrentChatName] = useState("");
  const [currentConnection, setCurrentConnection] = useState();
  const [displayMessages, setDisplayMessages] = useState([]);
  const [displayChats, setDisplayChats] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const { user } = useAuth();

  // redux-part
  const dispatch = useDispatch();

  const messages = useSelector((store) => store.messages);
  const chats = useSelector((store) => store.chat);
  const sendNewMessage = (username, message, chatName) => {
    // dispatch(add(message));
    if (currentConnection) {
      currentConnection.invoke("SendMessageToChat", {
        username,
        message,
        chatName,
      });
    }
  };
  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChatName) {
        const messages = await GetCHatsMessages(currentChatName);
        setDisplayMessages(messages);
      }
    };
    fetchMessages();
  }, [currentChatName]);


  useEffect(() => {
    const fetchChats = async () => {
      if (user) {
        try {
          const chats = await GetChats(user.username);
          console.log(chats);
          setDisplayChats(chats);
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
              {displayChats &&
                displayChats.map((chat, index) => (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      CreateChatConnection(user.username, chat.chatName).then(
                        (r) => {
                          setCurrentConnection(r.connection);
                          setDisplayMessages(r.messages);
                          setCurrentChatName(chat.chatName);
                          console.log(r.messages);
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
              {displayMessages &&
                displayMessages.map((message, index) => (
                  <div key={index}>{message.content}</div>
                ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendNewMessage(user.username, inputMessage, currentChatName);
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
                    <img src={send_message}></img>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
