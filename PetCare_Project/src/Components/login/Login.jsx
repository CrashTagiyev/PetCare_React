import React, { useState } from "react";
import { LoginRequest } from "../../AxiosFetchs/AuthFetchs/LoginRequest";
import { PetCareAPI } from "../../APIs/PetCareAPI";
import { useAuth } from "../../Hooks/useAuth";
import "../login/login.scss";
import google from "../../assets/Icons/google.png";
import facebook from "../../assets/Icons/facebook-login.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { login } = useAuth();

  const loginHandler = (event) => {
    event.preventDefault();
    LoginRequest(loginEmail, loginPassword, event).then((u) => {
      if (u !== undefined) login(u);
    });
  };

  return (
    <div className="parent-div">
      <div className="main-div">
        <div className="login-text">
          <p>Log In</p>
        </div>
        <form onSubmit={loginHandler}>
          <div>
            <input
              type="email"
              name="emailAdress"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div>
            <button type="submit">LOG IN</button>
          </div>
        </form>
        <div className="forgot-password">
          <Link href="/forgotpassword">Forgot password? </Link>
        </div>
        <div className="or-login-with">
          <div>
            <hr />
          </div>
          <div>
            <p>or login with</p>
          </div>
          <div>
            <hr />
          </div>
        </div>
        <div className="alternative-logins">
          <div className="facebook">
            <button>
              <div>
                <img src={facebook} />
              </div>
              <div>
                <p>Facebook</p>
              </div>
            </button>
          </div>
          <div className="google">
            <button>
              <div>
                <img src={google} />
              </div>
              <div>
                <p>Google</p>
              </div>
            </button>
          </div>
        </div>
        <div className="need-account">
          Need an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

{
  // <button
  //   onClick={async () => {
  //     try {
  //       const response = await PetCareAPI.get("/RepoTest/AppUserGetAll");
  //       console.log(response.status);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Fetching products failed:", error);
  //     }
  //   }}
  // >
  //   Fetch Users
  // </button>
}
