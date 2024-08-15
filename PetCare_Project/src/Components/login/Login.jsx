import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { LoginRequest } from "../../AxiosFetchs/AuthFetchs/LoginRequest";
import { useAuth } from "../../Hooks/useAuth";
import "../login/login.scss";
import google from "../../assets/Icons/google.png";
import facebook from "../../assets/Icons/facebook-login.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();

  const loginHandler = async (values) => {
    try {
      const a="";
      a.startsWith
      const { emailAddress, password } = values;
      const data = await LoginRequest(emailAddress, password);
      if (data && data.username) {
        login(data);
      } else if (data && data.errors) {
        // Display validation errors from the response
        const errorMessages = {};
        if (data.errors.EmailAddress) {
          errorMessages.emailAddress = data.errors.EmailAddress.join(" ");
        }
        if (data.errors.Password) {
          errorMessages.password = data.errors.Password.join(" ");
        }
        form.setFields([
          { name: 'emailAddress', errors: errorMessages.emailAddress ? [errorMessages.emailAddress] : [] },
          { name: 'password', errors: errorMessages.password ? [errorMessages.password] : [] }
        ]);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      message.error("An error occurred during login.");
    }
  };

  return (
    <div className="parent-div">
      <div className="main-div">
        <div className="login-text">
          <p>Log In</p>
        </div>
        <Form
          form={form} // Ensure the form instance is passed here
          onFinish={loginHandler}
          layout="vertical"
        >
          <Form.Item
            name="emailAddress"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              LOG IN
            </Button>
          </Form.Item>
        </Form>
        <div className="error-container">
          {form.getFieldError('emailAddress').length > 0 && (
            <div className="error-column">
              {form.getFieldError('emailAddress').map((error, index) => (
                <div key={index} className="error-message">{error}</div>
              ))}
            </div>
          )}
          {form.getFieldError('password').length > 0 && (
            <div className="error-column">
              {form.getFieldError('password').map((error, index) => (
                <div key={index} className="error-message">{error}</div>
              ))}
            </div>
          )}
        </div>
        <div className="forgot-password">
          <Link to="/forgotpassword">Forgot password?</Link>
        </div>
        <div className="or-login-with">
          <div>
            <hr />
          </div>
          <div>
            <p>or login with</p>
          </div>
          <div>
            <hr />
          </div>
        </div>
        <div className="alternative-logins">
          <div className="facebook">
            <button>
              <div>
                <img src={facebook} alt="Facebook Login" />
              </div>
              <div>
                <p>Facebook</p>
              </div>
            </button>
          </div>
          <div className="google">
            <button>
              <div>
                <img src={google} alt="Google Login" />
              </div>
              <div>
                <p>Google</p>
              </div>
            </button>
          </div>
        </div>
        <div className="need-account">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;