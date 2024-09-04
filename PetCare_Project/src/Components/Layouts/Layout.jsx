import React from "react";
import { Outlet } from "react-router-dom";
import "../Layouts/layout.scss";
import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";
import { Watermark } from "antd";
import filterIcons from "../../IconImports/ImportFIlterIcons";

const Layout = () => {
  return (
    <div className="layout-div">
      <Header />
      <main>
        
          <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
