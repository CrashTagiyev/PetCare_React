import React from "react";
import { Form, Input, Button, Select, Upload } from "antd";
import { SignUpCompanyRequest } from "../../AxiosFetchs/AuthFetchs/SignUpRequest";
import "../SignUp/signUpUser.scss";
import { useState } from "react";

const SignUpCompany = () => {
  const [form] = Form.useForm();
  const [userNameValue, setUserNameValue] = useState("");
  
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleCompanyNameChange = (e) => {
    const companyName = e.target.value;
    const userName = companyName.replace(/\s+/g, ""); // Remove spaces
    setUserNameValue(userName);
  };

  const onFinish = async (values) => {
    try {
      values.username = userNameValue;
      console.log(values);

      const response = await SignUpCompanyRequest(values);
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
          <h1>Company</h1>
        </div>
        <Form form={form} onFinish={onFinish} className="sign-up-form">
          <div className="inputs">
            <div className="half-part">
              <Form.Item
                name="companyName"
                label="Company name"
                rules={[
                  { required: true, message: "Please input Company name!" },
                ]}
              >
                <Input onChange={handleCompanyNameChange} />
              </Form.Item>
              <Form.Item label="Username">
                <Input disabled type={"text"} value={userNameValue}></Input>
              </Form.Item>
              <Form.Item
                name="email"
                label="Email address"
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
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="about"
                label="About"
                rules={[{ required: true, message: "This place is required!" }]}
              >
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
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

export default SignUpCompany;
