import React from "react";
import { Form, Input, Button, Select, Upload } from "antd";
import { SignUpUserRequest } from "../../AxiosFetchs/AuthFetchs/SignUpRequest";
import "../SignUp/signUpUser.scss";
import { CitiesOptions } from "./signUpDatas/signUpDatas";
const { Option } = Select;

const SignUpUser = () => {
  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (values) => {
    try {
      const response = await SignUpUserRequest(values);
      if (response.statusCode !== 200 && response.errors) {
        form.setFields(
          Object.keys(response.errors).map((field) => ({
            name: field.toLowerCase(),
            errors: response.errors[field],
          }))
        );
      } else {
        // Handle successful signup (e.g., navigate to a different page)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-parent">
      <div className="sign-up-container">
        <div>
          <h1>User</h1>
        </div>
        <Form form={form} onFinish={onFinish} className="sign-up-form">
          <div className="inputs">
            <div className="half-part">
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="firstname"
                label="Firstname"
                rules={[
                  { required: true, message: "Please input your firstname!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastname"
                label="Lastname"
                rules={[
                  { required: true, message: "Please input your lastname!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input a valid email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="profileimage"
                label="Profile image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                  {
                    required: true,
                    message: "Please upload the image",
                  },
                ]}
              >
                <Upload beforeUpload={() => false}>
                  <Button className="img-upload-btn">Upload</Button>
                </Upload>
              </Form.Item>
            </div>
            <div className="half-part">
              <Form.Item
                name="city"
                label="City"
                rules={[
                  { required: true, message: "Please select your city!" },
                ]}
              >
                <Select>
                {CitiesOptions.map((city) => (
                    <Select.Option key={city.value} value={city.value}>
                      {city.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="dateofbirth"
                label="Birthdate"
                rules={[
                  { required: true, message: "Please select your birthdate!" },
                ]}
              >
                <Input type="date" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button className="signup-btn" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
              
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpUser;
