import React, { useEffect, useRef } from "react";
import "../userProfileInfo/userProfileInfo.scss";
import UserProfile from "../userprofile/Userprofile";
import Chat from "../chat/ Chat";
import Notification from "../notification/Notification";
import {useLocalStorage} from "../../Hooks/useLocalStorage"
import { useState } from "react";
const tabs = ["Info", "About Us", "Inbox", "Blogs"];

const UserProfileInfo = () => {
  const [activeTab, setActiveTab] = useLocalStorage("activeTab", "Info");
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 }); // Use useState instead of useLocalStorage
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Use useState instead of useLocalStorage
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 790); // Use useState instead of useLocalStorage
  const tabRefs = useRef([]);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 790);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const activeTabRef = tabRefs.current[activeIndex];
    if (activeTabRef) {
      setLineStyle({
        left: activeTabRef.offsetLeft,
        width: activeTabRef.clientWidth,
      });
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "Info":
        return (
          <div className="content active">
            <UserProfile />
          </div>
        );
      case "About Us":
        return (
          <div className="content active">
            <h2>About Us</h2>
            <p>About Us</p>
          </div>
        );
      case "Inbox":
        return (
          <div className="content active">
            <Chat />
          </div>
        );
      case "Blogs":
        return (
          <div className="content active">
            <h1>Notifications</h1>
            <h2>
              <Notification />
            </h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tab-box-main-container">
      <div className="tab-container">
        {isMobileView ? (
          <>
            <button
              className="hamburger-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ⌄
            </button>
            {isMenuOpen && (
              <div className="dropdown-menu">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                    onClick={() => {
                      setActiveTab(tab);
                      setIsMenuOpen(false);
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
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
        )}
        <div className="content-box">{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
