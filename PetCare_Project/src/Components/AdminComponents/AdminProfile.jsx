import React, { useState } from "react";
import { Radio, Tabs } from "antd";
import { adminPanelTabsItems } from "./adminPanelTabsItems";
import "./adminProfile.scss";

const AdminProfile = () => {
  return (
    <section className="admin-panel-section">
      <Tabs
        defaultActiveKey="1"
        tabPosition={`top`}
        
        items={adminPanelTabsItems}
      />
    </section>
  );
};

export default AdminProfile;
