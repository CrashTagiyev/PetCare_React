import React from "react";
import { Outlet } from "react-router-dom";
import "../Layouts/layout.scss";
import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";

const Layout = () => {
  
  return (
    <div className="layout-div">

      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
