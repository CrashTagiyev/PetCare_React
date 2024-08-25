import { Form, Modal,Select,Input, InputNumber} from "antd";
import { Upload, Button, message ,Row, Col} from "antd";
import { useState } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import usePetCareAPI from "../../../Hooks/usePetCareApi";
import "../CompanyComponents/addPetToShelterModal.scss";
import { UploadOutlined } from "@ant-design/icons";
import usePetServices from "../../../Hooks/usePetServices";
import { Option } from "antd/es/mentions";


const AddPetToShelterModal = ({ isModalOpen, closeModal, shelterId }) => {
    const [form] = Form.useForm();
    const { user } = useAuth();
    const { PetCareAPI } = usePetCareAPI();
    const [successMessage, setSuccessMessage] = useState("");
    const { petTypeArray,breedsArray,setCurrentPetTypeId}=usePetServices();

    const onFinish = async (values) => {
      try {
         console.log(values);
        const formDatas = new FormData();
        formDatas.append("PetName", values.PetName);
        formDatas.append("Description", values.Description);
        formDatas.append("Size", values.Size);
        formDatas.append("Age", values.Age);
        formDatas.append("Gender", values.Gender);
        formDatas.append("Health", values.Health);
        formDatas.append("Weight", values.Weight);
        formDatas.append("PetTypeId", values.PetTypeId);
        formDatas.append("BreedId", values.BreedId);
        formDatas.append("ShelterId",shelterId);
    
        // Correctly append the image files
        if (values.ImageUrls && values.ImageUrls.length > 0) {
          values.ImageUrls.forEach(file => {
            formDatas.append("ImageUrls", file.originFileObj);
          });
        }
     
        await PetCareAPI.post("/shelters/AddPetToShelter", formDatas, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }).then((response) => {
          console.log(response);
          if(response.status === 200) {
            setSuccessMessage("Pet successfully added to the shelter");
            form.resetFields(); 
          }
        });
      } catch (error) {
        console.log(error.response);
        if (error.response && error.response.data.errors) {
          form.setFields(
            Object.keys(error.response.data.errors).map((field) => ({
              name: field,
              errors: error.response.data.errors[field],
            }))
          );
        }
      }
    };
    return (
      <Modal
        open={isModalOpen}
        onCancel={() => {
          closeModal(false);
        }}
        footer={null}
      >
        <div>
          <h3>Add Pet to Shelter</h3>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ ShelterId: shelterId }}
          className="add-pet-form"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="PetName"
                label="Pet Name"
                rules={[{ required: true, message: "Please enter the pet's name" }]}
              >
                <Input />
              </Form.Item>
  
              <Form.Item
                name="Description"
                label="Description"
                rules={[{ required: true, message: "Please enter a description" }]}
              >
                <Input.TextArea rows={3} />
              </Form.Item>
  
              <Form.Item
                name="Size"
                label="Size"
                rules={[{ required: true, message: "Please select the pet's size" }]}
              >
                <Select>
                  <Select.Option value="Small">Small</Select.Option>
                  <Select.Option value="Medium">Medium</Select.Option>
                  <Select.Option value="Large">Large</Select.Option>
                </Select>
              </Form.Item>
  
              <Form.Item
                name="Age"
                label="Age"
                rules={[{ required: true, message: "Please enter the pet's age" }]}
              >
                <InputNumber min={0} />
              </Form.Item>
  
              <Form.Item
                name="Health"
                label="Health"
                rules={[{ required: true, message: "Please enter health information" }]}
              >
                <Input.TextArea rows={2} />
              </Form.Item>
  
              <Form.Item
                name="Weight"
                label="Weight"
                rules={[{ required: true, message: "Please enter the pet's weight" }]}
              >
                <InputNumber min={0} step={0.1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Gender"
                label="Gender"
                rules={[{ required: true, message: "Please select the pet's gender" }]}
              >
                <Select>
                  <Select.Option value={1}>Male</Select.Option>
                  <Select.Option value={2}>Female</Select.Option>
                </Select>
              </Form.Item>
  
              <Form.Item
                name="PetTypeId"
                label="Pet Type"
                rules={[{ required: true, message: "Please select the pet type" }]}
              >
                <Select  onSelect={(value)=>{
                  console.log(value);
                  setCurrentPetTypeId(prev=>prev=value)
                  form.setFieldsValue({ BreedId: undefined });
                }}>
                  {
                    petTypeArray.map((petType,index)=>(
                      <Select.Option key={index} value={petType.id}>{petType.typeName}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
  
              <Form.Item
                name="BreedId"
                label="Breed"
                rules={[{ required: true, message: "Please select the breed" }]}
              >
                <Select>
                 {breedsArray.map((breed,index)=>(
                  <Select.Option key={index} value={breed.id}>{breed.breedName}</Select.Option>
                 ))}
                </Select>
              </Form.Item>

                
              <Form.Item
                name="ImageUrls"
                label="Images"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                rules={[{ required: true, message: "Please upload images" }]}
              >
                <Upload multiple listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload Images</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
  
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
  
        {successMessage && <div className="success-message">{successMessage}</div>}
      </Modal>
    );
  };
  
  export default AddPetToShelterModal;