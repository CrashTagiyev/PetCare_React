import { Flex, Pagination, Skeleton, Spin } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchPets } from "../../../../AxiosFetchs/EntityReduxFetchs/FetchPets";
import FilterSection from "../filter/FilterSection";
import "../pets/pets.scss";
import { LoadingOutlined } from "@ant-design/icons";


const Pets = ({ filterOptions, setFilterOptions }) => {
  const dispatch = useDispatch();

  const array = useSelector((state) => state.pets.petsArray);
  const totalPets = useSelector((state) => state.pets.totalPets);
  let isArrayLoading = useSelector((state) => state.pets.isLoading);
  const arrayError = useSelector((state) => state.pets.error);

  useEffect(() => {
    dispatch(FetchPets(filterOptions));
  }, [filterOptions]);



  const onChange = (page,pagesize) => {
    setFilterOptions(p=>({...p,pageNumber:page,pageSize:pagesize}))
    console.log(totalPets)
  };


  return (
    <div className="pets-filter-and-display">
      <FilterSection
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      {isArrayLoading && (
        <div className="loading-spinner-cont">
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 150 }} spin />}
          />
        </div>
      )}
      {!isArrayLoading && (
          <div className="pets-cont">
            {array.map((pet, index) => (
              <div className="pets-self" key={index}>
                <div className="pets-img-cont">
                  <img src={pet.imageUrls[0]}></img>
                </div>
                <div className="pets-info-cont">
                  <div className="pets-fullname">
                    <p>{pet.petName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!isArrayLoading && (
          <Pagination
            total={totalPets}
            defaultPageSize={filterOptions.pageSize}
            defaultCurrent={1}
            current={filterOptions.pageNumber}
            onChange={onChange}
             showTotal={(total) => `Total ${total} items`}
             align="center"
             showSizeChanger
             showQuickJumper
          />
        )}
    </div>
  );
};

export default Pets;
