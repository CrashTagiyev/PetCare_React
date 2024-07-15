import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ForgotPassowrdRequest } from "../../AxiosFetchs/AuthFetchs/ForgotPasswordRequest";

const ForgotPassword = () => {
  const [email, setEmail] = useState(``);
  const [successMessage, setSuccessMessage] = useState(``);
  const [errorMessage, setErrorMessage] = useState(``);
  const [responseData, setResponseData] = useState();

  useEffect(() => {
    if (responseData !== undefined) {
      if (responseData.code === 200) {
        setSuccessMessage(responseData.message);
        setErrorMessage("");
      } else {
        setErrorMessage(responseData.message);
        setSuccessMessage("");
      }
    }
  }, [responseData]);

  return (
    <section className="fp-section">
      <h1>{successMessage}</h1>
      <form
        className="fp-form"
        onSubmit={(e) => {
            console.log("qweqweqweqweq")
          e.preventDefault();
          var response = ForgotPassowrdRequest(email);
          setResponseData(response);
        }}
      >
        <input
          required
          className="fp-input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type={"email"}
        />
        <button type={"submit"}>Submit</button>
        <span>{errorMessage}</span>
      </form>
    </section>
  );
};

export default ForgotPassword;
