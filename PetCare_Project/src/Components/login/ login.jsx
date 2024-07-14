import React, { useState } from "react";
import { LoginRequest } from "../../AxiosFetchs/AuthFetchs/LoginRequest";
import { PetCareAPI } from "../../APIs/PetCareAPI";
import { useAuth } from "../../Hooks/useAuth";
import "../login/login.scss";
import google from "../../assets/Icons/google.png"
import facebook from "../../assets/Icons/facebook-login.png"

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { login } = useAuth();

  const loginHandler = (event) => {
    event.preventDefault();
    LoginRequest(loginEmail, loginPassword, event).then((u) => {
      console.log(u.username);
      console.log(u.emailAdress);
      console.log(u.roles);
      login(u);
    });
  };

  return (
    <div class="parent-div">
      <div class="main-div">
        <div class="login-text">
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
        <div class="forgot-password">
          <a href="#">Forgot password? </a>
        </div>
        <div class="or-login-with">
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
        <div class="alternative-logins">
          <div class="facebook">
            <button>
              <div>
                <img src={facebook} />
              </div>
              <div>
                <p>Facebook</p>
              </div>
            </button>
          </div>
          <div class="google">
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
        <div class="need-account">
          <o>
            Need an account? <a href="#">Sign Up</a>
          </o>
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
