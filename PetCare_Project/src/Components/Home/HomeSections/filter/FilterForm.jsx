import { Form, Input, Select } from "antd";
import React from "react";
import { useEffect } from "react";
import usePetServices from "../../../../Hooks/usePetServices";
const FilterForm = ({ filterOptions, setFilterOptions }) => {
  const { petTypeArray, breedsArray, setCurrentPetTypeId } = usePetServices();
  const [form] = Form.useForm();

  useEffect(() => {
    setCurrentPetTypeId(filterOptions.petTypeId);
    form.setFieldsValue({ petType: filterOptions.petTypeId });
    form.setFieldsValue({ breed: filterOptions.breedId });

    if (filterOptions.petTypeId === 0) {
      form.setFieldsValue({ petType: undefined });
      form.setFieldsValue({ breed: undefined });
    }

    if(filterOptions.isAll)
      form.resetFields();

  }, [filterOptions, setFilterOptions]);

  return (
    <div>
      <Form  form={form}>
        <Form.Item label="Pet type" name={"petType"}>
          <Select
            onChange={(value) => {
              setFilterOptions((p) => ({
                ...p,
                petTypeId: value,
                isAll: false,
              }));
              form.setFieldsValue({ breed: undefined });
            }}
          >
            <Select.Option key={-1} value={0}>
              None
            </Select.Option>
            {petTypeArray.map((petType, index) => (
              <Select.Option key={index} value={petType.id}>
                {petType.typeName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Breed" name="breed">
          <Select
            onSelect={(value) => {
              setFilterOptions((p) => ({ ...p, breedId: value }));
            }}
          >
            <Select.Option key={-1} value={0}>
              None
            </Select.Option>
            {filterOptions.petTypeId > 0 &&
              breedsArray.map((breed, index) => (
                <Select.Option key={index} value={breed.id}>
                  {breed.breedName}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Breed" name="gender">
          <Select
            onSelect={(value) => {
              setFilterOptions((p) => ({ ...p, gender: value,isAll:false }));
            }}
            defaultValue={0}
          >
            <Select.Option key={1} value={0}>
              All
            </Select.Option>
            <Select.Option key={2} value={1}>
              Male
            </Select.Option>
            <Select.Option key={3} value={2}>
              Female
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Pet name" name={"petName"}>
          <Input
            onChange={(e) => {
              e.preventDefault();
              setFilterOptions((p) => ({ ...p, petName: e.target.value ,isAll:false}));
            }}
          />
        </Form.Item>
        <Form.Item label="Min age" name={"minAge"}>
          <Input
            type={"number"}
            onChange={(e) => {
              e.preventDefault();
              if ( e.target.value === "") {
                setFilterOptions((p) => ({ ...p, minAge: 0 }));
              } else
              setFilterOptions((p) => ({ ...p, minAge: e.target.value ,isAll:false}));
            }}
          />
        </Form.Item>
        <Form.Item label="Max age" name={"maxAge"}>
          <Input
            type={"number"}
            onChange={(e) => {
              e.preventDefault();
              if ( e.target.value === "") {
                setFilterOptions((p) => ({ ...p, maxAge: 0 }));
              } else
              setFilterOptions((p) => ({ ...p, maxAge: e.target.value ,isAll:false}));
            }}
          />
        </Form.Item>
        <Form.Item label="Min weight" name={"minWeight"}>
          <Input
            type={"number"}
            onChange={(e) => {
              e.preventDefault();
              if ( e.target.value === "") {
                setFilterOptions((p) => ({ ...p, minWeight: 0 }));
              } else
              setFilterOptions((p) => ({ ...p, minWeight: e.target.value,isAll:false }));
            }}
          />
        </Form.Item>
        <Form.Item label="Max weight" name={"MaxWeight"}>
          <Input
            type={"number"}
            onChange={(e) => {
              e.preventDefault();
              if ( e.target.value === "") {
                setFilterOptions((p) => ({ ...p, maxWeight: 0 }));
              } else
                setFilterOptions((p) => ({ ...p, maxWeight: e.target.value ,isAll:false}));
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FilterForm;
