import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../Layouts/layout.css";
import Footer  from "../footer/footer";
import Header from "../header/Header.jsx";
const Layout = () => {
  return (
    <div className="layout-div">
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
