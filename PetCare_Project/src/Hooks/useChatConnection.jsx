import { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { BASE_URL } from "../APIs/PetCareAPI";

const useChatConnection = (username, chatName) => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const connectionRef = useRef(null);

  useEffect(() => {
    const createConnection = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl(BASE_URL + "/chathub", {
          withCredentials: true,
        })
        .withAutomaticReconnect()
        .build();
        console.log(newConnection);
        
      newConnection.on("GetConnectedChatsMessages", (messages) => {
        setMessages(messages);
        console.log(messages);
      });

      newConnection.on("SendMessage", (message) => {
        console.log("Bu Message gorundu" + message.isSeen)
        setMessages((prev) => [...prev, message]);
      });
      
      try {
        await newConnection.start();
        await newConnection.invoke("CreateChatConnection", { username:username, chatName:chatName });
        setConnection(newConnection);
        setIsConnected(true);
        connectionRef.current = newConnection;
      } catch (error) {
        console.error("Connection failed: ", error);
      }
    };

    if (username && chatName) createConnection();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop()
          .then(() => console.log('Disconnected from SignalR hub'))
          .catch(err => console.error('Disconnection failed: ', err));
      }
    };
  }, [username, chatName]);

  const sendMessage = async (message) => {
    if (connection && isConnected) {
      try {
        await connection.invoke("SendMessageToChat", {
          username: username,
          message: message,
          chatName: chatName,
          isSeen: false,
        });
      } catch (error) {
        console.error("Sending message failed: ", error);
      }
    }
  };

  const disconnect = async () => {
    if (connectionRef.current) {
      try {
        await connectionRef.current.stop();
        setIsConnected(false);
        console.log('Disconnected from SignalR hub');
      } catch (error) {
        console.error('Disconnection failed: ', error);
      }
    }
  };

  return {
    messages,
    sendMessage,
    isConnected,
    connection,
    disconnect
  };
};

export default useChatConnection;
