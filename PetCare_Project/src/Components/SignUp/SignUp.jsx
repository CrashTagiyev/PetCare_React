import React, { useState } from "react";
import { Select, Form, Input, Button } from "antd";
import { selectValues } from "./signUpDatas/signUpDatas";
import { SignUpRequest } from "../../AxiosFetchs/AuthFetchs/SignUpRequest";
import "../SignUp/signUp.css";

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
          console.log(errors)
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
    <section className="signUp-Section">
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="signUp-Container">
          <div className="signUp-left">
            <h1 className="signUp-h1">Sign up</h1>
            <Form.Item
              label="Username:"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              validateStatus={errors.username ? "error" : ""}
              help={errors.username && errors.username[0]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your Email Address!" },
              ]}
              validateStatus={errors.email ? "error" : ""}
              help={errors.email && errors.email[0]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
              validateStatus={errors.password ? "error" : ""}
              help={errors.password && errors.password[0]}
            >
              <Input type="password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="signUp-button">
              SIGN UP
            </Button>
          </div>
          <div className="signUp-right">
            <Form.Item
              label="Firstname"
              name="firstname"
              rules={[
                { required: true, message: "Please input your Firstname!" },
              ]}
              validateStatus={errors.firstname ? "error" : ""}
              help={errors.firstname && errors.firstname[0]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Lastname"
              name="lastname"
              rules={[
                { required: true, message: "Please input your Lastname!" },
              ]}
              validateStatus={errors.lastname ? "error" : ""}
              help={errors.lastname && errors.lastname[0]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Birth date"
              name="dateofbirth"
              rules={[
                { required: true, message: "Please input your BirthDate!" },
              ]}
              validateStatus={errors.dateOfBirth ? "error" : ""}
              help={errors.dateOfBirth && errors.dateOfBirth[0]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              label="City"
              labelAlign="right"
              name="city"
              rules={[{ required: true }]}
              validateStatus={errors.city ? "error" : ""}
              help={errors.city && errors.city[0]}
            >
              <Select placeholder="City" options={selectValues}></Select>
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
              validateStatus={errors.address ? "error" : ""}
              help={errors.address && errors.address[0]}
            >
              <Input type="text" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </section>
  );
};

export default SignUp;
