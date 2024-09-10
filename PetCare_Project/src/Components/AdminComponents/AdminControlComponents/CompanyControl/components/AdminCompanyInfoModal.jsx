import { Modal } from 'antd';
import {  MailOutlined, PhoneOutlined, EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined, IdcardOutlined } from '@ant-design/icons';
import React from 'react';
import './adminCompanyInfoModal.scss';

const AdminCompanyInfoModal = ({ companyInfo, isModalOpen, closeModal }) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={() => closeModal(false)}
      footer={null}
      title="Company Info"
    >
      <div className="user-info-modal">
        <div className="user-info-modal__profile">
          <img
            src={companyInfo?.profileImageUrl}
            alt={`Company_img`}
            className="user-info-modal__profile-img"
          />
          <h2 className="user-info-modal__name">{`${companyInfo?.companyName}`}</h2>
          <p className="user-info-modal__username">@{companyInfo?.userName}</p>
        </div>

        <div className="user-info-modal__details">
          <div className="user-info-modal__detail">
            <IdcardOutlined style={{color:"#6504b5"}}/> <strong>ID:</strong> {companyInfo?.id}
          </div>
          <div className="user-info-modal__detail">
            <MailOutlined style={{color:"#6504b5"}}/> <strong>Email:</strong> {companyInfo?.email}
          </div>
          <div className="user-info-modal__detail">
            <PhoneOutlined style={{color:"#6504b5"}}/> <strong>Phone:</strong> {companyInfo?.phoneNumber}
          </div>
          <div className="user-info-modal__detail">
            <ClockCircleOutlined style={{color:"#6504b5"}}/> <strong>Created Time:</strong> {new Date(companyInfo?.createdTime).toLocaleString()}
          </div>
          <div className="user-info-modal__detail">
            <ClockCircleOutlined style={{color:"#6504b5"}}/> <strong>Last Updated Time:</strong> {new Date(companyInfo?.lastUpdatedTime).toLocaleString()}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminCompanyInfoModal;
