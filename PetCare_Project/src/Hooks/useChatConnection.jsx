import { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { BASE_URL } from "../APIs/PetCareAPI";

const useChatConnection = (username, chatName) => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const createConnection = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl(BASE_URL + "/chathub", {
          withCredentials: true,
        })
        .withAutomaticReconnect()
        .build();

      newConnection.on("GetConnectedChatsMessages", (receivedMessages) => {
        setMessages(receivedMessages);
        console.log(receivedMessages)
      });

      newConnection.on("SendMessage", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      try {
        await newConnection.start();
        await newConnection.invoke("CreateConnection", { username, chatName });
        setConnection(newConnection);
        setIsConnected(true);
      } catch (error) {
        console.error("Connection failed: ", error);
      }
    };

    if (username && chatName) createConnection();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [username, chatName]);

  const sendMessage = async (message) => {
    if (connection && isConnected) {
      try {
        await connection.invoke("SendMessageToChat", {
          username,
          message,
          chatName,
        });
      } catch (error) {
        console.error("Sending message failed: ", error);
      }
    }
  };

  return {
    messages,
    sendMessage,
    isConnected,
  };
};

export default useChatConnection;
