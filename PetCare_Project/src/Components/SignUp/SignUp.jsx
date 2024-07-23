import React, { useState } from "react";
import { Select, Form, Input, Button } from "antd";
import { selectValues } from "./signUpDatas/signUpDatas";
import { SignUpRequest } from "../../AxiosFetchs/AuthFetchs/SignUpRequest";
import "../SignUp/signUp.scss";

const SignUp = () => {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState({});

  const onFinish = async (values) => {
    try {
      const response = await SignUpRequest(values);
      if (response.statusCode !== 200) {
        setErrors(response.errors || {});
        form.setFields(
          Object.keys(response.errors || {}).map((field) => ({
            name: field.toLowerCase(),
            errors: response.errors[field],
          }))
        );
        console.log(errors);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="sign-up-parent">
      <div className="sign-up-container">
        <div>
          <h1>Sign Up</h1>
        </div>
        <form>
          <div className="inputs">
            <div className="half-part">
              <div className="input-container">
                <label>Username:</label>
                <input type="text" />
              </div>
              <div className="input-container">
                <label>Firstname:</label>
                <input type="text" />
              </div>
              <div className="input-container">
                <label>Lastname:</label>
                <input type="text" />
              </div>
              <div className="input-container">
                <label>Email:</label>
                <input type="text" />
              </div>
              <div className="sign-up-button">
                <button type="submit">Sign Up</button>
              </div>
            </div>
            <div className="half-part">
              <div className="input-container">
                <label>City:</label>
                <select>
                  <option value="">Select a city</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
              <div className="input-container">
                <label>Address:</label>
                <input type="text" />
              </div>
              <div className="input-container">
                <label>Birthdate:</label>
                <input type="date" />
              </div>
              <div className="input-container">
                <label>Password:</label>
                <input type="password" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
