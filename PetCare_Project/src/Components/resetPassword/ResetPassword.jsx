import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ResetPasswordRequest } from "../../AxiosFetchs/AuthFetchs/ResetPasswordRequest";
// import "../resetPassword/resetPassword.css";
import "../resetPassword/resetPasswordScss.scss";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
  const query = useQuery();
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchedUserId = query.get("userId");
    const fetchedToken = query.get("token");
    if (fetchedUserId && fetchedToken) {
      fetchedToken = fetchedToken.replace(/ /g, "+"); // Replace spaces with +
      setUserId(fetchedUserId);
      setToken(fetchedToken);
    }
    
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseMessage = await ResetPasswordRequest(
        userId,
        token,
        newPassword
      );
      setMessage(responseMessage);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <section className="parent-container">
      <div className="reset-pass-container">
        <h1 className="reset-password-h1">Reset Password</h1>
        <form className="reset-password-form" onSubmit={handleSubmit}>
          {(message.startsWith("Password has successfully changed") && (
            <p className="form-successmesage">{message}</p>
          )) ||
            (message && <p className="form-errormesage">{message}</p>)}
          <input
            className="reset-password-input"
            required
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="reset-password-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
