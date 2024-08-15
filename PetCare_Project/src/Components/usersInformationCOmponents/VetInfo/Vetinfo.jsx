import { Button } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreateChatConnection } from "../../../AxiosFetchs/AuthFetchs/ChatConnection";
import { FetchVet } from "../../../AxiosFetchs/EntityReduxFetchs/FetchVet";
import { useAuth } from "../../../Hooks/useAuth";

const Vetinfo = () => {
  const [info, setInfo] = useState({});

  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const getVetsInfo = async () => {
      await FetchVet(id).then((data) => {
        setInfo(data);
        console.log(data);
      });
    };

    getVetsInfo();
  }, []);
  const handleWriteMessageButton = (e) => {
    e.preventDefault();
    if (user)
      CreateChatConnection(user.username, info.userName + user.username);
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
