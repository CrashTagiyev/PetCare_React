import { Button } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateChatConnection } from "../../../AxiosFetchs/AuthFetchs/ChatConnection";
import { FetchVet } from "../../../AxiosFetchs/EntityReduxFetchs/FetchVet";
import { useAuth } from "../../../Hooks/useAuth";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";

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
  const handleWriteMessageButton =async (e) => {
    e.preventDefault();
    if (user) {
      await CreateChatConnection(user.username, info.userName + "+" + user.username);
      setActiveTab("Inbox");
      navigate("/userprofileinfo");
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleWriteMessageButton}>
        Write message
      </Button>
      <h1>{info.firstname}</h1>
    </>
  );
};

export default Vetinfo;
