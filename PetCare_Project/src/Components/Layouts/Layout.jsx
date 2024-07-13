import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../Layouts/layout.css";
import Header from "../Header/Header";
import Footer  from "../footer/footer";
const Layout = () => {
  return (
    <div className="layout-div">
      <Header></Header>
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
