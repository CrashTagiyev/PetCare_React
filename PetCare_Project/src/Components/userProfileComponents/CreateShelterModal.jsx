import { Modal } from "antd";
import React from "react";
import "../userProfileComponents/createShelterModal.scss";

const CreateShelterModal = ({ isModalOpen, closeModal }) => {
  return (
    <>
      <Modal
        className="create-shelter-form-modal"
        open={isModalOpen}
        onCancel={() => {
          closeModal(false);
        }}
        footer={null}
      ></Modal>
    </>
  );
};

export default CreateShelterModal;
