import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
    <header />
    <main>
      <Outlet />
    </main>
    <footer />
  </div>
  );
};

export default Layout;
