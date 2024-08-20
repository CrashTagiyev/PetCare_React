import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { VetsFetch } from "../../../../AxiosFetchs/EntityReduxFetchs/VetsFetch";
import user_image from "../../../../assets/Icons/ user.jpg";
import "../vet/vet.scss";

const Vets = () => {
  let dispatch = useDispatch();
  let array = useSelector((state) => state.vets.vetsArray);
  let isArrayLoading = useSelector((state) => state.vets.isLoading);
  let arrayError = useSelector((state) => state.vets.error);
  console.log(array);

  useEffect(() => {
    dispatch(VetsFetch());
  }, []);

  if (isArrayLoading) {
    return <h1>LOADING</h1>;
  }

  if (arrayError) {
    return <h1>ERROR</h1>;
  }

  return (
    <div className="users-cont">
      {array &&
        array.map((vet, index) => (
          <div className="user-self" key={index}>
            <div className="user-img-cont">
              <img
                src={(vet.profileImageUrl && vet.profileImageUrl) || user_image}
                alt="user_image"
              />
            </div>
            <div className="users-info-cont">
              <div className="user-fullname">
                <Link to={`/Vetinfo/${vet.id}`} state={{ vet }}>
                  <p>{vet.firstname + " " + vet.lastname}</p>
                </Link>
              </div>
              <div className="user-email">
                <p>{vet.email}</p>
              </div>
              <div className="user-phone">
                <p>{vet.createdTime}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Vets;
