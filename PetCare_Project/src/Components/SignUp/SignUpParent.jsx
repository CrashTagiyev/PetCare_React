import React from "react";
import { useState } from "react";
import SignUpCompany from "./SignUpCompany";
import SignUpUser from "./SignUpUser";
import "../SignUp/signUpParent.scss";
import SignUpVet from "./SignUpVet";
const SignUpParent = () => {
  const [displayItems, setDisplayItems] = useState("SignUpUser");

  const renderContent = () => {
    switch (displayItems) {
      case "SignUpUser":
        return (
          <div>
            <SignUpUser />
          </div>
        );
      case "SignUpVet":
        return (
          <div>
            <SignUpVet />
          </div>
        );
      case "SignUpCompany":
        return (
          <div>
            <SignUpCompany />
          </div>
        );
    }
  };

  return (
    <div className="sign-up-parent">
      <div className="signUp-parent-content-div">
        <h1 className="signUp-parent-h1">SignUp as</h1>
        <div className="signUp-parent-btn-container">
          <button
            value={"SignUpUser"}
            onClick={(e) => setDisplayItems(e.target.value)}
          >
            User
          </button>
          <button
            value={"SignUpVet"}
            onClick={(e) => setDisplayItems(e.target.value)}
          >
            Vet
          </button>
          <button
            value={"SignUpCompany"}
            onClick={(e) => setDisplayItems(e.target.value)}
          >
            Company
          </button>
        </div>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default SignUpParent;
