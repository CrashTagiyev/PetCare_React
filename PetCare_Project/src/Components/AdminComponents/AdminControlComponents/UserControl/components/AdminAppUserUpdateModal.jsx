import { Modal, Form, Input, DatePicker, Button } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, CalendarOutlined, IdcardOutlined } from '@ant-design/icons';
import React from 'react';
import moment from 'moment'; // Import moment
import './adminAppUserUpdateModal.scss';

const AdminAppUserUpdateForm = ({ userInfo, isModalOpen, closeModal, handleSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values)
    closeModal(false);
  };

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
          initialValues={{
            id: userInfo?.id,
            userName: userInfo?.userName,
            firstname: userInfo?.firstname,
            lastname: userInfo?.lastname,
            email: userInfo?.email,
            phoneNumber: userInfo?.phoneNumber,
            address: userInfo?.address,
            city: userInfo?.city,
            dateOfBirth: userInfo?.dateOfBirth ? moment(userInfo?.dateOfBirth) : null, // Convert to moment
          }}
          className="user-update-form__details"
        >
          <Form.Item label="ID" name="id">
            <Input prefix={<IdcardOutlined />} disabled />
          </Form.Item>
          <Form.Item label="Username" name="userName">
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item label="Firstname" name="firstname">
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item label="Lastname" name="lastname">
            <Input prefix={<PhoneOutlined />} />
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
          <Form.Item label="City" name="city">
            <Input />
          </Form.Item>
          <Form.Item label="Date of Birth" name="dateOfBirth">
            <DatePicker prefix={<CalendarOutlined />} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item>
            <Button className='admin-appuser-update-btn' type="primary" htmlType="submit" block>
              Update
            </Button>
          </Form.Item>

        </Form>
      </div>
    </Modal>
  );
};

export default AdminAppUserUpdateForm;
