import React, { useState } from "react";
import { LoginRequest } from "../../AxiosFetchs/AuthFetchs/LoginRequest";
import { PetCareAPI } from "../../APIs/PetCareAPI";
import { useAuth } from "../../Hooks/useAuth";

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
    <>
      <form className="login-form" onSubmit={loginHandler}>
        <input
          type="email"
          name="emailAdress"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="text"
          name="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <button
        onClick={async () => {
          try {
            const response = await PetCareAPI.get("/RepoTest/AppUserGetAll");
            console.log(response.status);
            console.log(response.data);
          } catch (error) {
            console.error("Fetching products failed:", error);
          }
        }}
      >
        Fetch Users
      </button>
    </>
  );
};

export default Login;
