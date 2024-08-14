import React, { useEffect, useState } from "react";
import { ForgotPasswordRequest } from "../../AxiosFetchs/AuthFetchs/ForgotPasswordRequest";
import "../forgotPassword/forgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState(``);
  const [message, setMessage] = useState(``);
  const [responseData, setResponseData] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (responseData) {
      setMessage(responseData.message);
      setErrors(responseData.errors || {}); // Set errors from response
    }
  }, [responseData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await ForgotPasswordRequest(email);
      setResponseData(data);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="parent-container">
      <div className="forgot-pass-container">
        <div>
          <h1>Forgot Password</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            {message && message.startsWith("Reset") ? (
              <p className="successMessage">{message}</p>
            ) : (
              <p>Please write your email to reset your password</p>
            )}
          </div>
          <div>
            <input
              className={errors.Email ? "is-invalid" : ""}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            {errors.Email && (
              <div className="invalid-feedback">{errors.Email}</div>
            )}
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
