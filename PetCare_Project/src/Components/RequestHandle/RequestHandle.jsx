// RequestHandle.js
import React from "react";
import { useSelector } from "react-redux";
import { adoptionRequestHandler } from "../../AxiosFetchs/AdoptionsFetchs/adoptionHandlerFetch";
import { useAuth } from "../../Hooks/useAuth";
import useNotificationConnection from "../../Hooks/useNotificationConnection";
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
  const {user}= useAuth();
  
  const {sendNotification} = useNotificationConnection(selectedRequest.user.userName);
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
          </div>
        </div>
       <div className="btn-con">
            <div>
                <button onClick={(e)=>{
                  sendNotification({
                    senderUserName: user?.username,
                    content: `Your request is accepted,Please visit our shelter.\nCity/Address:${selectedRequest.pet.shelter.city},${selectedRequest.pet.shelter.address}`,
                    receiverUserName: selectedRequest.user.userName,
                    sendedAt:new Date().toISOString(),
                  })
                  adoptionRequestHandler(selectedRequest.id,true)
                }} className="accept-btn">Accept</button>
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
