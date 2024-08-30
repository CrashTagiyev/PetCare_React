import { Flex, Pagination, Skeleton, Spin } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchPets } from "../../../../AxiosFetchs/EntityReduxFetchs/FetchPets";
import FilterSection from "../filter/FilterSection";
import "../pets/pets.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import Loading from "../../../loading/Loading";

const Pets = ({ filterOptions, setFilterOptions }) => {
  const dispatch = useDispatch();

  const array = useSelector((state) => state.pets.petsArray);
  const totalPets = useSelector((state) => state.pets.totalPets);
  let isArrayLoading = useSelector((state) => state.pets.isLoading);
  const arrayError = useSelector((state) => state.pets.error);

  useEffect(() => {
    dispatch(FetchPets(filterOptions));
  }, [filterOptions]);

  const onChange = (page, pagesize) => {
    setFilterOptions((p) => ({ ...p, pageNumber: page, pageSize: pagesize }));
    console.log(totalPets);
  };

  return (
    <div className="pets-filter-and-display">
      <FilterSection
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      {isArrayLoading && (
        <Loading />
      )}
      {!isArrayLoading && (
        <div className="pets-cont">
          {array.map((pet, index) => (
            <NavLink key={index} to={`/petInfo/${pet.id}`} state={{pet}}>
              <div className="pets-self" >
                <div className="pets-img-cont">
                  <img src={pet.imageUrls[0]}></img>
                </div>
                <div className="pets-info-cont">
                  <div className="pets-fullname">
                    <p>{pet.petName}</p>
                  </div>
                </div>
              </div>
            </NavLink>
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
          showTotal={(total) => `Total ${total} pets`}
          align="center"
          showSizeChanger
          showQuickJumper
        />
      )}
    </div>
  );
};

export default Pets;
