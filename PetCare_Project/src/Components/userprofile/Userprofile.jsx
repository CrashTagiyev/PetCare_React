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

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateInputs = () => {
    const errors = {};
    if (!username) {
      errors.username = "Username is required";
    }
    if (!firstname) {
      errors.firstname = "Firstname is required";
    }
    if (!lastname) {
      errors.lastname = "Lastname is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email format";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!birthdate) {
      errors.birthdate = "Birthdate is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    // Perform the save action here
    alert("Form submitted successfully!");
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
