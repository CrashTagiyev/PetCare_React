import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ResetPasswordRequest } from "../../AxiosFetchs/AuthFetchs/ResetPasswordRequest";
import "../resetPassword/resetPassword.css";
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
    let fetchedToken = query.get("token");
    fetchedToken = fetchedToken.replace(/ /g, "+"); // Replace spaces with +
    setUserId(fetchedUserId);
    setToken(fetchedToken);
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
    <section className="reset-password-section">
      <div className="reset-form-container">
        <h1>Reset Password</h1>
        <form className="reset-password-form" onSubmit={handleSubmit}>
          {(message.startsWith("Password has successfully changed") && (
            <p className="form-successmesage">{message}</p>
          )) ||
            (message && <p className="form-errormesage">{message}</p>)}
          <input
            required
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
