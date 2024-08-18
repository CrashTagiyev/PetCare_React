import { Button } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateChatConnection } from "../../../AxiosFetchs/AuthFetchs/ChatConnection";
import { FetchVet } from "../../../AxiosFetchs/EntityReduxFetchs/FetchVet";
import { useAuth } from "../../../Hooks/useAuth";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import "../VetInfo/vetInfo.scss";

const Vetinfo = () => {
  const [info, setInfo] = useState({});
  // User profile active tab
  const [activeTab, setActiveTab] = useLocalStorage("activeTab", "Info");
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const getVetsInfo = async () => {
      await FetchVet(id).then((data) => {
        setInfo(data);
        console.log(data);
      });
    };

    getVetsInfo();
  }, []);
  const handleWriteMessageButton = async (e) => {
    e.preventDefault();
    if (user) {
      await CreateChatConnection(
        user.username,
        info.userName + "+" + user.username
      );
      setActiveTab("Inbox");
      navigate("/userprofileinfo");
    }
  };

  return (
    <div className="vet-info-cont">
      <div className="vet-profile">
        <img src={info.profileImageUrl}></img>
      </div>
      <div className="vet-info">
        <div className="vet-single-info">
          <div>
            <p className="vet-label">Firstname:</p>
          </div>
          <div>
            {" "}
            <p className="vet-act-info">{info.firstname}</p>
          </div>
        </div>
        <div className="vet-single-info">
          <div>
            <p className="vet-label">Address:</p>
          </div>
          <div>
            {" "}
            <p className="vet-act-info">{info.address}</p>
          </div>
        </div>
        <div className="vet-single-info">
          <div>
            <p className="vet-label">Username:</p>
          </div>
          <div>
            {" "}
            <p className="vet-act-info">{info.userName}</p>
          </div>
        </div>
      </div>
      <div className="vet-info">
        <div className="vet-single-info">
          <div>
            <p className="vet-label">Lastname:</p>
          </div>
          <div>
            {" "}
            <p className="vet-act-info">{info.lastname}</p>
          </div>
        </div>
        <div className="vet-single-info">
          <div>
            <p className="vet-label">City:</p>
          </div>
          <div>
            {" "}
            <p className="vet-act-info">{info.city}</p>
          </div>
        </div>
        <div className="write-to-vet">
          <button onClick={handleWriteMessageButton}>Write to vet</button>
        </div>
      </div>
    </div>
  );
};

export default Vetinfo;
