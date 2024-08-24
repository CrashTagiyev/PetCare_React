import React, { useEffect, useRef } from "react";
import "../userProfileInfo/userProfileInfo.scss";
import UserProfile from "../userprofiles/Userprofile";
import Chat from "../chat/ Chat";
import Notification from "../notification/Notification";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import VetProfile from "../userprofiles/VetProfile";
import usePetCareAPI from "../../Hooks/usePetCareApi";
import CompanyProfile from "../userprofiles/CompanyProfile";

const tabs = ["Info",  "Inbox", "Notifications","About Us" ];

const UserProfileInfo = () => {
  
  //States
  const [activeTab, setActiveTab] = useLocalStorage("activeTab", "Info");
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 790);
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  
  //Hooks
  const tabRefs = useRef([]);
  const { user} = useAuth();
  const { PetCareAPI, isSomethingChanged } = usePetCareAPI();


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

  useEffect(() => {
    const fetchUsersCurrentInfo = async () => {
      try {
        switch (user.roles) {
          case "User":
            break;
          case "Vet":
            await PetCareAPI.get("/vets/GetVet", {
              params: {
                Id: user.id,
              },
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }).then((response) => {
              setCurrentUserInfo(response.data);
            });
            break;
          case "Company":
            await PetCareAPI.get(`/company/GetCompanyProfileInfo`, {
              params: { id: user.id },
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }).then((response) => {
              setCurrentUserInfo(response.data);
              console.log(response.data);
            });
            break;
          default:
            throw new Error("User role not recognized.");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUsersCurrentInfo();
  }, [isSomethingChanged, user]);

  const renderContent = () => {
    switch (activeTab) {
      case "Info":
        return (
          <div className="content active">
            {(user.roles === "User" && <UserProfile />) ||
              (user.roles === "Vet" && (
                <VetProfile currentVetsInfo={currentUserInfo} />
              )) ||
              (user.roles === "Company" && (
                <CompanyProfile  currentCompanyInfo={currentUserInfo} />
              ))}
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
