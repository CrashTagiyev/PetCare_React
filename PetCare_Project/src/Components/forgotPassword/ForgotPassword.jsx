import React, { useEffect, useState } from "react";
import { ForgotPassowrdRequest } from "../../AxiosFetchs/AuthFetchs/ForgotPasswordRequest";

const ForgotPassword = () => {
  const [email, setEmail] = useState(``);
  const [message, setMessage] = useState(``);
  const [responseData, setResponseData] = useState();

  useEffect(() => {
    if (responseData) {
      setMessage(responseData.message);
    }
  }, [responseData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ForgotPassowrdRequest(email);
      setResponseData(response);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <section className="fp-section">
      <h1>{message}</h1>
      <form className="fp-form" onSubmit={handleSubmit}>
        <input
          required
          className="fp-input"
          onChange={(e) => setEmail(e.target.value)}
          type={"email"}
        />
        <button type={"submit"}>Submit</button>
      </form>
    </section>
  );
};

export default ForgotPassword;
