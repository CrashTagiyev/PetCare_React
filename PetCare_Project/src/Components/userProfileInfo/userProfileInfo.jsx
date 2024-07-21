import React, { useState, useEffect, useRef } from "react";
import "../userProfileInfo/userProfileInfo.scss";
import UserProfile from "../userprofile/Userprofile"

const UserProfileInfo = () => {
  const [activeTab, setActiveTab] = useState("Info");
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });

  const tabs = ["Info", "About Us", "Messages", "Blogs"];
  const tabRefs = useRef([]);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const activeTabRef = tabRefs.current[activeIndex];
    if (activeTabRef) {
      setLineStyle({
        left: activeTabRef.offsetLeft,
        width: activeTabRef.clientWidth,
      });
    }
  }, [activeTab, tabs]);

  const renderContent = () => {
    switch (activeTab) {
      case "Info":
        return (
          <div className="content active">
            {/* <h2>Home</h2>
            <p>Home</p> */}
            <UserProfile/>
          </div>
        );
      case "About Us":
        return (
          <div className="content active">
            <h2>About Us</h2>
            <p>About Us</p>
          </div>
        );
      case "Messages":
        return (
          <div className="content active">
            <h2>Messages</h2>
            <p>Messages</p>
          </div>
        );
      case "Blogs":
        return (
          <div className="content active">
            <h2>Blogs</h2>
            <p>Blogs</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tab-box-main-container">
      <div className="tab-container">
        <div className="tab-box">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              ref={(el) => (tabRefs.current[index] = el)}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
          <div className="line" style={lineStyle}></div>
        </div>
        <div className="content-box">{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
