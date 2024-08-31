import { Modal, Form, Input, Button, Alert } from "antd";
import { useAuth } from "../../../../Hooks/useAuth";
import "../adoption/adoptionModal.scss";
import React from "react";
import { useState } from "react";
import usePetCareAPI from "../../../../Hooks/usePetCareApi";
import PetInfo from "../../../usersInformationCOmponents/PetInfo/PetInfo";

const AdoptionModal = ({ isModalOpen, closeModal, petInfo }) => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const { PetCareAPI } = usePetCareAPI();
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const onFinish = async (values) => {
    try {
      const formDatas = new FormData();
      console.log(values);
      console.log(petInfo.id);
      formDatas.append("PetId", petInfo.id);
      formDatas.append("UserId", user.id);
      formDatas.append("About", values.about);
      formDatas.append("YearsOfPetExperience", values.experience);

      await PetCareAPI.post("/adopt/CreateAdoption", formDatas, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }).then((response) => {
        console.log(response);
        if (response.status === 200)
          setSuccessMessage("Adoption request successfully sent !");
        setErrorMessage(null);
        form.resetFields();
      });
    } catch (error) {
      setErrorMessage(error.response.statusText);
    }
  };

  return (
    <Modal
      className="adoption-modal"
      open={isModalOpen}
      onCancel={() => {
        closeModal(false);
      }}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="about"
          label="Write about yourself"
          rules={[{ required: true, message: "Please write about yourself!" }]}
        >
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
        </Form.Item>
        <Form.Item
          name="experience"
          label="Year of experience"
          rules={[{ required: true, message: "Please input your experience!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {successMessage && (
        <Alert
          message={successMessage}
          type="success"
          showIcon
          closable
          style={{ marginBottom: "16px" }}
        />
      )}
      {errorMessage && (
        <Alert
          message="Error"
          description={errorMessage}
          type="error"
          showIcon
          closable
          style={{ marginBottom: "16px" }}
          onClose={() => setErrorMessage(null)} // Clear error message on close
        />
      )}
    </Modal>
  );
};

export default AdoptionModal;
