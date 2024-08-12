import React from "react";
import "../header/header.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import user_image from "../../assets/Icons/ user.jpg";
import bell_image from "../../assets/Icons/bell.png";

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
            {/* <Link to="/getUsers">Users</Link> */}
          </nav>
        </div>
        <div className="header-right">
          <div className="bell-container">
            <Link className="bell-link">
              <img src={bell_image}></img>
            </Link>
          </div>
          <div className="auth">
            {!user && <Link to="/signup">Sign Up</Link>}
            {!user && <Link to="/login">Log In</Link>}
           {user && <Link  to="/userprofileinfo" className="profile">
              <div className="profile-photo">
                <img src={user.profileImage}></img>
              </div>
            </Link>}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
