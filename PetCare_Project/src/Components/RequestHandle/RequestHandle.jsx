// RequestHandle.js
import React from "react";
import { useSelector } from "react-redux";
import "../RequestHandle/requesthandle.scss";

const RequestHandle = () => {
  const selectedRequest = useSelector(
    (state) => state.adoptionrequests.selectedRequest
  );

  if (!selectedRequest || !selectedRequest.user) {
    return (
      <div className="handle-con">
        <p>No request selected. Please select a request first.</p>
      </div>
    );
  }

  return (
    <div className="handle-con">
      <div className="handle-info">
        <div className="info-con">
          <div className="user-info-con">
            <div>
              <img src={selectedRequest.user.profileImageUrl}></img>
            </div>
            <div>
              Full Name:{" "}
              {selectedRequest.user.firstname +
                " " +
                selectedRequest.user.lastname}
            </div>
            <div>Address: {selectedRequest.user.address}</div>
            <div>City: {selectedRequest.user.city}</div>
            <div>About: {selectedRequest.about}</div>
            <div>Experience: {selectedRequest.yearsOfPetExperience} year</div>
          </div>
          <div className="middle-con">wants to adopt ...</div>
          <div className="user-info-con">
            <div>
              <img src={selectedRequest.pet.imageUrls[0]}></img>
            </div>
            <div>
              Pet Name: {selectedRequest.pet.petName}
            </div>
            <div>Age: {selectedRequest.pet.age}</div>
            <div>Description: {selectedRequest.pet.description}</div>
            <div>Health: {selectedRequest.pet.health}</div>
            <div>Size: {selectedRequest.pet.size}</div>
            {console.log(selectedRequest.pet)}
          </div>
        </div>
        <div className="btn-con">
            <div>
                <button className="accept-btn">Accept</button>
            </div>
            <div>
                <button className="reject-btn">Reject</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RequestHandle;
