import "../userprofile/userprofile.scss";
import React, { useState, useRef } from "react";
import { useAuth } from "../../Hooks/useAuth";

const Userprofile = () => {
  const [username, setUsername] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [errors, setErrors] = useState({});
  const [isReadOnly, setIsReadOnly] = useState(true);

  const {user,logout} = useAuth();

  const usernameRef = useRef(null);

  const handleEdit = () => {
    setIsReadOnly(false);
    setTimeout(() => {
      if (usernameRef.current) {
        usernameRef.current.focus();
      }
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set inputs to readonly and remove focus
    setIsReadOnly(true);
    if (document.activeElement) {
      document.activeElement.blur();
    }

    try {
      const response = await fetch("/api/userprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          firstname,
          lastname,
          email,
          city,
          address,
          birthdate,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          alert("An error occurred. Please try again.");
        }
      } else {
        alert("Form submitted successfully!");
        // Clear the form or perform any other success actions here
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="user-profile-parent">
      <div className="user-profile-container">
        <div>
          <h1>User Profile</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="half-part">
              <div className="input-container">
                <label>Username:</label>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={errors.username ? "is-invalid" : ""}
                  readOnly={isReadOnly}
                  ref={usernameRef}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
              <div className="input-container">
                <label>Firstname:</label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className={errors.firstname ? "is-invalid" : ""}
                  readOnly={isReadOnly}
                />
                {errors.firstname && (
                  <div className="invalid-feedback">{errors.firstname}</div>
                )}
              </div>
              <div className="input-container">
                <label>Lastname:</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className={errors.lastname ? "is-invalid" : ""}
                  readOnly={isReadOnly}
                />
                {errors.lastname && (
                  <div className="invalid-feedback">{errors.lastname}</div>
                )}
              </div>
              <div className="input-container">
                <label>Email:</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "is-invalid" : ""}
                  readOnly={isReadOnly}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
            </div>
            <div className="half-part">
              <div className="input-container">
                <label>City:</label>
                <select
                  id="combobox"
                  name="combobox"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={errors.city ? "is-invalid" : ""}
                  disabled={isReadOnly}
                >
                  <option value="">Select a city</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
                {errors.city && (
                  <div className="invalid-feedback">{errors.city}</div>
                )}
              </div>
              <div className="input-container">
                <label>Address:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={errors.address ? "is-invalid" : ""}
                  readOnly={isReadOnly}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </div>
              <div className="input-container">
                <label>Birthdate:</label>
                <input
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className={errors.birthdate ? "is-invalid" : ""}
                  readOnly={isReadOnly}
                />
                {errors.birthdate && (
                  <div className="invalid-feedback">{errors.birthdate}</div>
                )}
              </div>
              <div className="button-container">
                <div>
                  <button type="button" onClick={handleEdit}>
                    Edit
                  </button>
                </div>
                <div>
                  <button type="submit">Save</button>
                </div>
                <div>
                  <button onClick={logout}>Log Out</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Userprofile;
