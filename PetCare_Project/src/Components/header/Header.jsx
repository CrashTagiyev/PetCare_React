import React from "react";
import "../header/header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

const Header = () => {
  const { user } = useAuth();
  return (
    <>
      <header className="header">
        <div className="header-left">
          <Link to="/">
            <img className="logo" src="/src/assets/Icons/PetCareLogo.png"></img>
          </Link>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/getUsers">Users</Link>
            <Link to="/userprofileinfo">User Profile</Link>
          </nav>
        </div>
        <div className="header-right">
          {!user && <Link to="/signup">Sign Up</Link>}
          {!user && <Link to="/login">Log In</Link>}
        </div>
      </header>
    </>
  );
};

export default Header;
