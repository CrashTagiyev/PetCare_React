import { Modal } from 'antd';
import {  MailOutlined, PhoneOutlined, EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined, IdcardOutlined } from '@ant-design/icons';
import React from 'react';
import './adminAppUserInfoModal.scss';

const AdminAppUserInfoModal = ({ userInfo, isModalOpen, closeModal }) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={() => closeModal(false)}
      footer={null}
      title="User Profile"
    >
      <div className="user-info-modal">
        <div className="user-info-modal__profile">
          <img
            src={userInfo?.profileImageUrl}
            alt={`${userInfo?.firstname} ${userInfo?.lastname}`}
            className="user-info-modal__profile-img"
          />
          <h2 className="user-info-modal__name">{`${userInfo?.firstname} ${userInfo?.lastname}`}</h2>
          <p className="user-info-modal__username">@{userInfo?.userName}</p>
        </div>

        {/* User Details */}
        <div className="user-info-modal__details">
          <div className="user-info-modal__detail">
            <IdcardOutlined style={{color:"#6504b5"}}/> <strong>ID:</strong> {userInfo?.id}
          </div>
          <div className="user-info-modal__detail">
            <MailOutlined style={{color:"#6504b5"}}/> <strong>Email:</strong> {userInfo?.email}
          </div>
          <div className="user-info-modal__detail">
            <PhoneOutlined style={{color:"#6504b5"}}/> <strong>Phone:</strong> {userInfo?.phoneNumber}
          </div>
          <div className="user-info-modal__detail">
            <EnvironmentOutlined style={{color:"#6504b5"}} /> <strong>Address:</strong> {userInfo?.address}, {userInfo?.city}
          </div>
          <div className="user-info-modal__detail">
            <CalendarOutlined style={{color:"#6504b5"}}/> <strong>Date of Birth:</strong> {new Date(userInfo?.dateOfBirth).toLocaleDateString()}
          </div>
          <div className="user-info-modal__detail">
            <ClockCircleOutlined style={{color:"#6504b5"}}/> <strong>Created Time:</strong> {new Date(userInfo?.createdTime).toLocaleString()}
          </div>
          <div className="user-info-modal__detail">
            <ClockCircleOutlined style={{color:"#6504b5"}}/> <strong>Last Updated Time:</strong> {new Date(userInfo?.lastUpdatedTime).toLocaleString()}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminAppUserInfoModal;
