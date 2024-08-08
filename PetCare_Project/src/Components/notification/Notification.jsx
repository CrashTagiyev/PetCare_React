import React from "react";
import { useAuth } from "../../Hooks/useAuth";
import useNotificationConnection from "../../Hooks/useNotificationConnection";

const Notification = () => {
  const { user } = useAuth();
  const { notifications, isThereNewNotification, setIsThereNewNotification } =
    useNotificationConnection(user.username);

  return (
    <div>
      {isThereNewNotification && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsThereNewNotification(false);
          }}
        >
          <p style={{ color: "red" }}>You Have new notification</p>
        </button>
      )}
    <ul style={{ 
      maxHeight: '500px',  
      overflowY: 'auto',   
      listStyleType: 'none', 
      padding: '0',       
    }}>
      {notifications.map((notification, index) => (
        <li key={index} style={{
          overflow: 'hidden', 
          whiteSpace: 'nowrap', 
          textOverflow: 'ellipsis',
          padding: '10px',    
          borderBottom: '1px solid #ccc', 
        }}>
          <div></div>
          <h2>Sender: {notification.senderUserName}</h2>
          <h4>Content: {notification.content}</h4>
          <h4>Sent at: {notification.sendedAt}</h4>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default Notification;
