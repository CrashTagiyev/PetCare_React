import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/footer";
const Layout = () => {
  return (
    <div>
      <Header></Header>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
