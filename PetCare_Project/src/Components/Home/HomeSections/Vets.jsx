import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { VetsFetch } from "../../../AxiosFetchs/EntityReduxFetchs/VetsFetch";
import user_image from "../../../assets/Icons/ user.jpg";

const Vets = () => {
  let dispatch = useDispatch();
  let array = useSelector((state) => state.vets.vetsArray);
  let isArrayLoading = useSelector((state) => state.vets.isLoading);
  let arrayError = useSelector((state) => state.vets.error);
  console.log(array)

  useEffect(() => {
    dispatch( VetsFetch());
  }, []);

  if (isArrayLoading) {
    return <h1>LOADING</h1>;
  }

  if (arrayError) {
    return <h1>ERROR</h1>;
  }

  return (
    <ul className="users-list">
      {array &&
        array.map((vet, index) => (
          <li className="user-list-li" key={index}>
            <div className="user-info-container">
              <img className="user-info-img" src={ vet.profileImageUrl && vet.profileImageUrl || user_image} alt="" />
              <div className="user-info-div">
                <Link className="user-fullName" to={"/"}>{vet.firstname + " " + vet.lastname}</Link>
                <div className="user-info-address">{vet.email}</div>
                <div className="user-info-phoneNumber">{vet.createdTime}</div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default Vets;
