import React, { useEffect, useState, useRef } from "react";
import "../chat/chat.scss";
import { GetChats } from "../../AxiosFetchs/AuthFetchs/UsersChats";
import { useAuth } from "../../Hooks/useAuth";
import chatimage from "../../assets/Icons/ footer-logo.png";
import send_message from "../../assets/Icons/ send-message.png";
import search_button from "../../assets/Icons/ user-search-button.png";
import back_button from "../../assets/Icons/arrow.png";
import useChatConnection from "../../Hooks/useChatConnection";

const Chat = () => {
  //States
  const [currentChattingUser, setCurrentChattingUser] = useState("");
  const [displayChats, setDisplayChats] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentChatName, setCurrentChatName] = useState("");
  const [isUsernameVisible, setUsernameVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const messageContentRef = useRef(null);

  //Hooks
  const { user } = useAuth();
  const { sendMessage, messages,disconnect} = useChatConnection(
    user.username,
    currentChatName
  );

  // // Handlers
  const handleClick = () => {
    setUsernameVisible(true);
  };

  const handleBackClick = () => {
    setUsernameVisible(false);
  };

  // // Effect to update screen width on resize
  useEffect(() => {
    // Fetch chats when the user is updated
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

    // For make scroll begin from bottom
    if (messageContentRef.current) {
      messageContentRef.current.scrollTop =
        messageContentRef.current.scrollHeight;
    }

    // Handle window resize
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount or when the user changes
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [user]);
  
  useEffect(() => {
    return () => {
      // Disconnect when the component unmounts
      disconnect();
    };
  }, []);


  useEffect(() => {
    return () => {
      // Disconnect when the component unmounts
      disconnect();
    };
  }, []);


  // Determine visibility classes based on screen width and state
  const isBackButtonVisible = windowWidth <= 915 && isUsernameVisible;

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
        <div
          className={`current-user-container ${
            !isUsernameVisible ? "current-user-container-visible" : ""
          }`}
        >
          <div
            className={`current-user-name ${
              isUsernameVisible
                ? "current-user-name-visible"
                : "current-user-name-hidden"
            }`}
          >
            <p>{currentChattingUser}</p>
          </div>
          <div
            className={`${
              isBackButtonVisible
                ? "back-button-container-visible"
                : "back-button-container"
            }`}
          >
            <button onClick={handleBackClick}>
              <img src={back_button} alt="Back" />
            </button>
          </div>
          <div
            className={`search-user-container ${
              !isUsernameVisible
                ? "search-user-container-visible"
                : "search-user-container-hidden"
            }`}
          >
            <div className="search-bar-container">
              <input />
            </div>
            <div className="search-button-container">
              <button>
                <img src={search_button} alt="Search" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-mid-container">
        <div
          className={`users-container ${
            isUsernameVisible ? "users-container-hidden" : ""
          }`}
        >
          <div className="user-container">
            {displayChats &&
              displayChats.map((chat, index) => (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setUsernameVisible(true);
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
        <div
          className={`message-container ${
            isUsernameVisible ? "message-container-visible" : ""
          }`}
        >
          <div className="message-content" ref={messageContentRef}>
            {messages &&
              messages.map((msg, index) => (
                <div key={index} className="individual-message">
                  <div className="message">
                    <p>
                      {msg.content}
                    </p>
                  </div>
                  <div className="sent-at">
                    <p>12:00</p>
                  </div>
                </div>
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
