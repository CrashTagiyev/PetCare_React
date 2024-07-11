import React from "react";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
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

export default AdminLayout;
