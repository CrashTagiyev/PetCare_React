import { Modal, Form, Input, DatePicker, Button, Select } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import React from "react";
import moment from "moment"; // Import moment
import "./adminAppUserUpdateModal.scss";
import { CitiesOptions } from "../../../../SignUp/signUpDatas/signUpDatas";
import { useState } from "react";
import { useEffect } from "react";
import { AdminUserInfoFetch } from "../../../../../AxiosFetchs/AdminsFetchs/UserControlFetchs/AdminUserReadFetch";

const AdminAppUserUpdateForm = ({ userId, isModalOpen, closeModal }) => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState();
  const onFinish = (values) => {
    console.log(values);
    closeModal(false);
  };

  useEffect(() => {
    const userInfoFetch = async () => {
      const responseData = await AdminUserInfoFetch(userId);
      setUserInfo(responseData);
      form.setFieldsValue({
        id: userId,
        userName: responseData?.userName,
        firstname: responseData?.firstname,
        lastname: responseData?.lastname,
        email: responseData?.email,
        phoneNumber: responseData?.phoneNumber ,
        address: responseData?.address,
        city: responseData?.city,
        dateOfBirth: responseData?.dateOfBirth
          ? moment(responseData?.dateOfBirth)
          : null, 
      })
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

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="user-update-form__details"
        >
          <Form.Item label="ID" name="id">
            <Input prefix={<IdcardOutlined />} disabled />
          </Form.Item>
          <Form.Item label="Username" name="userName">
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item label="Firstname" name="firstname">
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item label="Lastname" name="lastname">
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item label="Phone" name="phoneNumber">
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input prefix={<EnvironmentOutlined />} />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: "Please select your city!" }]}
          >
            <Select >
              {CitiesOptions.map((city) => (
                <Select.Option key={city.value} value={city.value}>
                  {city.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Date of Birth" name="dateOfBirth">
            <DatePicker prefix={<CalendarOutlined />} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item>
            <Button
              className="admin-appuser-update-btn"
              type="primary"
              htmlType="submit"
              block
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AdminAppUserUpdateForm;
