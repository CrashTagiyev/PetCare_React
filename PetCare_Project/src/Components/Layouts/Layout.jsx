import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../footer/Footer";
import "../Layouts/layout.css"
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
