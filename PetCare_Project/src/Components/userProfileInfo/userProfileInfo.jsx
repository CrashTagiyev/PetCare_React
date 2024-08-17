import React, { useEffect, useRef } from "react";
import "../userProfileInfo/userProfileInfo.scss";
import UserProfile from "../userprofiles/Userprofile";
import Chat from "../chat/ Chat";
import Notification from "../notification/Notification";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import VetProfile from "../userprofiles/VetProfile";
import { FetchVet } from "../../AxiosFetchs/EntityReduxFetchs/FetchVet";
const tabs = ["Info", "About Us", "Inbox", "Notifications"];

const UserProfileInfo = () => {
  const [activeTab, setActiveTab] = useLocalStorage("activeTab", "Info");
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 }); // Use useState instead of useLocalStorage
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Use useState instead of useLocalStorage
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 790); // Use useState instead of useLocalStorage

  const [currentUserInfo, setCurrentUserInfo] = useState({});

  const tabRefs = useRef([]);
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 790);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { user } = useAuth();
  useEffect(() => {
    console.log(user);
    const activeIndex = tabs.indexOf(activeTab);
    const activeTabRef = tabRefs.current[activeIndex];
    if (activeTabRef) {
      setLineStyle({
        left: activeTabRef.offsetLeft,
        width: activeTabRef.clientWidth,
      });
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchUsersCurrentInfo = async () => {
      switch (user.roles) {
        case "User":
          break;
        case "Vet":
          await FetchVet(user.id).then((fetchedInfo) => {
            console.log(fetchedInfo);
            setCurrentUserInfo(fetchedInfo);
          });
      }
    };
    fetchUsersCurrentInfo();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "Info":
        return (
          <div className="content active">
            {(user.roles === "User" && <UserProfile />) ||
              (user.roles === "Vet" && (
                <VetProfile currentVetsInfo={currentUserInfo} />
              )) ||
              (user.roles === "Company" && <VetProfile />)}
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
      case "Notifications":
        return (
          <div className="content active">
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
