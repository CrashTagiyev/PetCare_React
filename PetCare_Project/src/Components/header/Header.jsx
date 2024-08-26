import React from "react";
import "../header/header.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import user_image from "../../assets/Icons/ user.jpg";
import bell_image from "../../assets/Icons/bell.png";
import default_UserImg from "../../assets/Icons/defaultUserImg.png"
import { Button } from "antd";
const Header = () => {
  const { user,logout } = useAuth();
  return (
    <>
      <header className="header">
        <div className="header-left">
          <Link to="/">
            <img className="logo" src="/src/assets/Icons/PetCareLogo.png"></img>
          </Link>
          <nav>
            <Link to="/" className="home-btn">Home</Link>
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
            {!user && <Link to="/signup" className="sign-up-btn">Sign Up</Link>}
            {!user && <Link to="/login" className="login-btn">Log In</Link>}
           {user && <Link to="/userprofileinfo" className="profile">
              <div className="profile-photo">
                <img src={user.profileImage && user.profileImage || default_UserImg}></img>
              </div>
            </Link>}
            {user && <Button onClick={logout} className="logout-btn">LogOut</Button>}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
