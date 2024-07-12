import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../header/Header";
const Layout = () => {
  return (
    <div>
      <Header></Header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
