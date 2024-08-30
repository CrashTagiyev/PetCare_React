import React from "react";
import { useAuth } from "../../Hooks/useAuth";
import useNotificationConnection from "../../Hooks/useNotificationConnection";
import "../notification/notification.scss";
import { useState } from "react";

const Notification = () => {
  const { user } = useAuth();
  const { notifications } =
    useNotificationConnection(user.username);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  // const notifications = [
  //   {
  //     senderName: "John Doe",
  //     content: "You have a new message!",
  //   },
  //   {
  //     senderName: "Jane Smith",
  //     content: "Your report has been submitted.",
  //   },
  //   {
  //     senderName: "Mike Johnson",
  //     content: "Don't forget the meeting at 3 PM.",
  //   },
  //   {
  //     senderName: "Emma Wilson",
  //     content: "Your password has been changed successfully.",
  //   },
  // ];

  return (
    <div className="notification-cont">
     
      <div className="notification-header">Notifications</div>
      <div
        className={`${
          selectedNotification ? "hidden" : "notification-senders-list"
        }`}
      >
        {notifications.map((notification, index) => (
          <div className="notification-sender" key={index}>
            <button onClick={() => handleNotificationClick(notification)}>
              {notification.senderUserName}
            </button>
          </div>
        ))}
      </div>
      {selectedNotification && (
        <div
          className={`notification-content-cont ${
            selectedNotification ? "visible" : ""
          }`}
        >
          <div className="notification-content-header">
            <div>
              <p>{selectedNotification.senderUserName}</p>
            </div>
            <div className="not-back-but">
              <button onClick={() => setSelectedNotification(null)}>←</button>
            </div>
          </div>
          <div className="notification-content">
            <p>{selectedNotification.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;

