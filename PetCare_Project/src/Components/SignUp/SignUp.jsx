import React from "react";
import { Select, Form, Input } from "antd";
import { selectValues } from "./signUpDatas/signUpDatas";

import "../SignUp/signUp.css";

const SignUp = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section className="signUp-Section">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="signUp-Container">
          <div className="signUp-left">
            <h2>Sign up</h2>
            <Form.Item
              label="Username:"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input type={"text"} />
            </Form.Item>

            <Form.Item
              label="Email Address:"
              name="email"
              rules={[
                { required: true, message: "Please input your Email Address!" },
              ]}
            >
              <Input type={"text"} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input type={"password"} />
            </Form.Item>
            <button>SIGN UP</button>
          </div>
          <div className="signUp-right">
            <Form.Item
              label="Firstname"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: "Please input your Firstname!",
                },
              ]}
            >
              <Input type={"text"} />
            </Form.Item>

            <Form.Item
              label="Lastname"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Please input your Lastname!",
                },
              ]}
            >
              <Input type={"text"} />
            </Form.Item>

            <Form.Item
              label="Birth date"
              name="dateOfBirth"
              rules={[
                {
                  required: true,
                  message: "Please input your BirthDate!",
                },
              ]}
            >
              <Input type={"date"} />
            </Form.Item>

            <Form.Item
              label="City"
              labelAlign="right"
              name="city"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a option and change input text above"
                options={selectValues}
              ></Select>
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input type={"text"} />
            </Form.Item>
          </div>
        </div>
      </Form>
    </section>
  );
};

export default SignUp;
