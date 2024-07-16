import React, { useEffect, useState } from "react";
import { ForgotPassowrdRequest } from "../../AxiosFetchs/AuthFetchs/ForgotPasswordRequest";
import "../forgotPassword/forgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState(``);
  const [message, setMessage] = useState(``);
  const [responseData, setResponseData] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (responseData) {
      setMessage(responseData.message);
    }
  }, [responseData]);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateInputs = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email format";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    try {
      const response = await ForgotPassowrdRequest(email);
      setResponseData(response);
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
            <p>Please write you email , for reset your password</p>
          </div>
          <div>
            <input
              className={errors.email ? "is-invalid" : ""}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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
