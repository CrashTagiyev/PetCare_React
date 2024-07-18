import "../userprofile/userprofile.scss";
import { useState } from "react";
import React from "react";

const Userprofile = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={errors.username ? "is-invalid" : ""}
                ></input>
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
                />
                {errors.birthdate && (
                  <div className="invalid-feedback">{errors.birthdate}</div>
                )}
              </div>
              <div>
                <button typeof="submit">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Userprofile;
