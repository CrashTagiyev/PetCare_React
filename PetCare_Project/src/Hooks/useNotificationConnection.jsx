import { HubConnectionBuilder } from "@microsoft/signalr";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../APIs/PetCareAPI";
import { useAuth } from "./useAuth";

const useNotificationConnection = (username) => {
  const [notifications, setNotifications] = useState([]);
  const [isThereNewNotification, setIsThereNewNotification] = useState(false);
  const connectionRef = useRef(null);

  useEffect(() => {
    const createConnections = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${BASE_URL}/chathub`)
        .withAutomaticReconnect()
        .build();

      newConnection.on("GetUsersNotifications", (notifications) => {
        setNotifications(notifications);
        console.log("Received notifications", notifications);
      });

      newConnection.on("SendNotification", (notification) => {
        setIsThereNewNotification(true);
        console.log("New notification received", notification);
      });

      try {
        await newConnection.start();
        await newConnection.invoke("CreateNotificationConnection", username);
        connectionRef.current = newConnection;
      } catch (error) {
        console.error("Connection failed: ", error);
      }
    };

      createConnections();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, [isThereNewNotification]);

  return {
    notifications,
    isThereNewNotification,
    setIsThereNewNotification,
  };
};

export default useNotificationConnection;
