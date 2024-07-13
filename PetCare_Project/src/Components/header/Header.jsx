import React from "react";
import "../Header/Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

const Header = () => {
  const { user } = useAuth();
  return (
    <>
      <header className="header">
        <div className="header-left">
          <img className="logo" src="/src/assets/Icons/PetCareLogo.png"></img>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/getUsers">Users</Link>
          </nav>
        </div>
        <div className="header-right">
          <Link to="/signup">Sign Up</Link>
          {!user && <Link to="/login">Log In</Link>}
        </div>
      </header>
    </>
  );
};

export default Header;
