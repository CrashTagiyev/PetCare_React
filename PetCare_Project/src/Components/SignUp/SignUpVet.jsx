import React from "react";
import { Form, Input, Button, Select, Upload } from "antd";
import { SignUpVetRequest } from "../../AxiosFetchs/AuthFetchs/SignUpRequest";
import "../SignUp/signUpUser.scss";
import { petTypesOptions ,CitiesOptions} from "./signUpDatas/signUpDatas";

const SignUpVet = () => {
  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (values) => {
    try {
      const response = await SignUpVetRequest(values);
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
          <h1>Vet</h1>
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
                name="phoneNumber"
                label="Phone number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: /^\+\d{1,3}\s?\d{1,4}\s?\d{3,4}\s?\d{3,4}$/,
                    message: "Please enter a valid phone number!",
                  },
                ]}
              >
                <Input
                  maxLength={20} // Adjust based on your format
                  inputMode="tel"
                  placeholder="Example +994 50 4525458"
                />
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
                <Select showSearch>
                {CitiesOptions.map((city) => (
                    <Select.Option key={city.value} value={city.value}>
                      {city.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="petTypes"
                label="Proficient in Pet Types"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one pet type!",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select pet types"
                  allowClear
                  style={{ width: "100%" }}
                >
                  {petTypesOptions.map((pet) => (
                    <Select.Option key={pet.value} value={pet.value}>
                      {pet.label}
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

export default SignUpVet;
