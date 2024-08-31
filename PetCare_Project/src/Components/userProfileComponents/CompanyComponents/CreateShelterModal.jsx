import { Form, Input, Modal, Upload, Button, Select } from "antd";
import React from "react";
import { useAuth } from "../../../Hooks/useAuth";
import "../CompanyComponents/createShelterModal.scss";
import { CitiesOptions } from "../../SignUp/signUpDatas/signUpDatas";
import usePetCareAPI from "../../../Hooks/usePetCareApi";
import { useState } from "react";
const CreateShelterModal = ({ isModalOpen, closeModal }) => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const { PetCareAPI } = usePetCareAPI();
  const [successMessage,setSuccessMessage]= useState();
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (values) => {
    try {
      const formDatas = new FormData();
      formDatas.append("CompanyId", user.id);
      formDatas.append("ShelterName", values.sheltername);
      formDatas.append("AdoptionPolicy", values.adoptionpolicy);
      formDatas.append("AboutShelter", values.aboutshelter);
      formDatas.append("City", values.city);
      formDatas.append("Address", values.address);

      // Check if there's a file in the shelterImage field
      if (values.shelterimage && values.shelterimage[0]) {
        formDatas.append("ShelterImage", values.shelterimage[0].originFileObj);
      }

      await PetCareAPI.post("/company/CreateShelterAtCompany", formDatas, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }).then((response) => {
        console.log(response);
        if(response.data ===200)
        setSuccessMessage("Shelter successfully created")
        form.resetFields(); 
      });
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data.errors) {
        form.setFields(
          Object.keys(error.response.data.errors).map((field) => ({
            name: field.toLowerCase(),
            errors: error.response.data.errors[field],
          }))
        );
      }
    }
  };

  return (
    <>
      <Modal
        className="create-shelter-form-modal"
        open={isModalOpen}
        onCancel={() => {
          closeModal(false);
        }}
        footer={null}
      >
        <div>
          <h3>{successMessage}</h3>
        </div>
        <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
              name="sheltername"
              label="Shelter name"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>
          <Form.Item
            name="adoptionpolicy"
            label="Adoption Policy"
            rules={[{ required: true, message: "This place is required!" }]}
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
          </Form.Item>
          <Form.Item
            name="aboutshelter"
            label="About"
            rules={[{ required: true, message: "This place is required!" }]}
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
          </Form.Item>
          <div className="shelter-city-address-input-cont">
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "Please select your city!" }]}
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
              name="address"
              label="Address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            name="shelterimage"
            label="Shelter image"
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
              <Button className="shelter-img-upload-btn">Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create shelter
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateShelterModal;