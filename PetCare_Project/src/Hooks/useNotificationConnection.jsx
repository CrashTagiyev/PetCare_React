import { HubConnectionBuilder } from "@microsoft/signalr";
import { notification } from "antd";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../APIs/PetCareAPI";
const useNotificationConnection = (username) => {
  const [notifications, setNotifications] = useState([]);
  const [isThereNewNotification, setIsThereNewNotification] = useState(false);
  const connectionRef = useRef(null);
  
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (notification) => {
    api.info({
      message: `${notification?.senderUserName}`,
      description: `${notification?.content}`,
      duration: 0,
    });
  };

  useEffect(() => {
    const createConnection = async () => {
 

      const newConnection = new HubConnectionBuilder()
        .withUrl(`${BASE_URL}/chathub`)
        .withAutomaticReconnect()
        .build();

      newConnection.on("GetUsersNotifications", (notifications) => {
        setNotifications(notifications);
      });

      newConnection.on("SendNotification", (notification) => {
        setIsThereNewNotification(true);
        openNotification(notification);
      });

      try {
        await newConnection.start();
        await newConnection.invoke("CreateNotificationConnection", username);
        connectionRef.current = newConnection;
      } catch (error) {
        console.error("Connection failed: ", error);
      }
    };
    if (!connectionRef.current) {
      createConnection();
    }

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, [username]); 

  const sendNotification = async (notification) => {
    if (connectionRef.current) {
      try {
        await connectionRef.current.invoke("SendNotification", {
          SenderUserName: notification?.senderUserName,
          Content: notification?.content,
          ReceiverUserName: notification?.receiverUserName,
          SendedAt: notification?.sendedAt,
        });
      } catch (error) {
        console.error("Sending message failed: ", error);
      }
    } else {
      console.error("No connection to the server.");
    }
  };

  return {
    notifications,
    isThereNewNotification,
    setIsThereNewNotification,
    contextHolder,
    sendNotification
  };
};

export default useNotificationConnection;