import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
const Loading = () => {
  return (
    <div className="loading-spinner-cont">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 150 }} spin />} />
    </div>
  );
};

export default Loading;
