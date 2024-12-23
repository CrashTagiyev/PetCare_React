import { Modal, Form, Input, Button, Upload } from "antd";
import React from "react";
import "./adminCompanyUpdateModal.scss";
import { useState } from "react";
import { useEffect } from "react";
import { adminCompanyUpdateFetch } from "../../../../../AxiosFetchs/AdminsFetchs/CompanyControlFetchs/AdminCompanyUpdateFetch";
import { adminCompanyReadFetch } from "../../../../../AxiosFetchs/AdminsFetchs/CompanyControlFetchs/AdminCompanyReadFetch";

const AdminCompanyUpdateModal = ({
  userId,
  isModalOpen,
  closeModal,
  setDispatchTrigger,
}) => {
  const [userNameValue, setUserNameValue] = useState("");
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState();

  const onFinish = async (values) => {
    const response = await adminCompanyUpdateFetch(values);
    setDispatchTrigger((p) => !p);
    closeModal(false);
  };

  const handleCompanyNameChange = (e) => {
    const companyName = e.target.value;
    const userName = companyName.replace(/\s+/g, ""); // Remove spaces
    form.setFieldsValue({
      userName:userName
    })
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    const userInfoFetch = async () => {
      const responseData = await adminCompanyReadFetch(userId);
      setUserInfo(responseData);
      setUserNameValue(responseData?.userName);
      form.setFieldsValue({
        id: responseData.id,
        userName: responseData?.userName,
        companyName: responseData?.companyName,
        email: responseData?.email,
        about: responseData?.about,
        phoneNumber: responseData?.phoneNumber,
      });
    };
    if (userId > 0) userInfoFetch();
  }, [userId]);

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => closeModal(false)}
      footer={null}
      title="Update User Profile"
    >
      <div className="user-update-form">
        <div className="user-update-form__profile">
          <img
            src={userInfo?.profileImageUrl}
            alt={`${userInfo?.firstname} ${userInfo?.lastname}`}
            className="user-update-form__profile-img"
          />
          <h2 className="user-update-form__name">{`${userInfo?.firstname} ${userInfo?.lastname}`}</h2>
          <p className="user-update-form__username">@{userInfo?.userName}</p>
        </div>

        <Form form={form} onFinish={onFinish} className="sign-up-form">
          <div className="inputs">
            <div className="half-part">
              <Form.Item label="ID" name="id">
                <Input disabled />
              </Form.Item>
              <Form.Item
                name="companyName"
                label="Company name"
                rules={[
                  { required: true, message: "Please input Company name!" },
                ]}
              >
                <Input onChange={handleCompanyNameChange} />
              </Form.Item>
              <Form.Item name={"userName"} label="Username">
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
                name="profileImage"
                label="Profile image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload beforeUpload={() => false}>
                  <Button className="img-upload-btn">Upload</Button>
                </Upload>
              </Form.Item>
            </div>
            <div className="half-part">
              <Form.Item
                name="about"
                label="About"
                rules={[{ required: true, message: "This place is required!" }]}
              >
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
              </Form.Item>
              <Form.Item>
                <Button className="signup-btn" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AdminCompanyUpdateModal;
