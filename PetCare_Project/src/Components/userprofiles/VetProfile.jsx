import React from "react";
import { useEffect } from "react";
import MapComponent from "../MapComponent/MapComponent";
import "./vetProfile.scss";
const VetProfile = ({ currentVetsInfo }) => {
  useEffect(() => {}, []);

  return (
    <div className="vet-profile-cont">
      <div className="left-part">
        <div>
          <div className="profile-img-cont">
            <img
              src={
                currentVetsInfo.profileImageUrl &&
                currentVetsInfo.profileImageUrl
              }
              alt={` profile`}
            />
          </div>
          <div className="left-part-info-cont">
            <div className="info-label-p-cont">
              <label>Username:</label>
              <p>{currentVetsInfo.userName}</p>
            </div>
            <div className="info-label-p-cont">
              <label>Firstname:</label>
              <p>{currentVetsInfo.firstname && currentVetsInfo.firstname}</p>
            </div>
            <div className="info-label-p-cont">
              <label>Lastname:</label>
              <p>{currentVetsInfo.lastname && currentVetsInfo.lastname}</p>
            </div>
            <div className="info-label-p-cont">
              <label>Email address:</label>
              <p>{currentVetsInfo.email && currentVetsInfo.email}</p>
            </div>
            <div className="info-label-p-cont">
              <label>Date of Birth:</label>
              <p>
                {currentVetsInfo.dateOfBirth && currentVetsInfo.dateOfBirth}
              </p>
            </div>
            <div className="info-label-p-cont">
              <label>City:</label>
              <p>{currentVetsInfo.city && currentVetsInfo.city}</p>
            </div>
            <div className="info-label-p-cont">
              <label>Address:</label>
              <p>{currentVetsInfo.address && currentVetsInfo.address}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="right-part">
        <div className="right-part-info-cont">
          <div className="info-label-p-cont">
            <MapComponent address={currentVetsInfo.address} city={currentVetsInfo.city}/>
          </div>
          <div className="info-label-p-cont">
            <label>Likes:</label>
            <p>{currentVetsInfo.likes && currentVetsInfo.likes}</p>
          </div>
          <div className="info-label-p-cont">
            <label>Dislikes:</label>
            <p>{currentVetsInfo.dislikes && currentVetsInfo.dislikes}</p>
          </div>
          <div className="info-label-p-cont">
            <label>About:</label>
            <p>{currentVetsInfo.about && currentVetsInfo.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetProfile;
