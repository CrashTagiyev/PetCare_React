import { Modal } from 'antd';
import {  MailOutlined, PhoneOutlined, EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined, IdcardOutlined } from '@ant-design/icons';
import React from 'react';
import './adminShelterInfoModal.scss';

const AdminShelterInfoModal = ({ shelterInfo, isModalOpen, closeModal }) => {
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
            src={shelterInfo?.shelterImageUrl}
            alt={`Company_img`}
            className="user-info-modal__profile-img"
          />
          <h2 className="user-info-modal__name">{`${shelterInfo?.shelterName}`}</h2>
        </div>

        <div className="user-info-modal__details">
          <div className="user-info-modal__detail">
            <IdcardOutlined style={{color:"#6504b5"}}/> <strong>ID:</strong> {shelterInfo?.id}
          </div>
          <div className="user-info-modal__detail">
            <MailOutlined style={{color:"#6504b5"}}/> <strong>Email:</strong> {shelterInfo?.emailAddress}
          </div>
          <div className="user-info-modal__detail">
            <PhoneOutlined style={{color:"#6504b5"}}/> <strong>Phone:</strong> {shelterInfo?.phoneNumber}
          </div>
          <div className="user-info-modal__detail">
            <ClockCircleOutlined style={{color:"#6504b5"}}/> <strong>Created Time:</strong> {new Date(shelterInfo?.createdTime).toLocaleString()}
          </div>
          <div className="user-info-modal__detail">
            <ClockCircleOutlined style={{color:"#6504b5"}}/> <strong>Last Updated Time:</strong> {new Date(shelterInfo?.lastUpdatedTime).toLocaleString()}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminShelterInfoModal;
