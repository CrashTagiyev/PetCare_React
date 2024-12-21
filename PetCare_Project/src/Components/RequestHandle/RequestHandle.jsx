// RequestHandle.js
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { adoptionRequestHandler } from "../../AxiosFetchs/AdoptionsFetchs/adoptionHandlerFetch";
import { useAuth } from "../../Hooks/useAuth";
import useNotificationConnection from "../../Hooks/useNotificationConnection";
import "../RequestHandle/requesthandle.scss";

const RequestHandle = () => {
  const selectedRequest = useSelector(
    (state) => state.adoptionrequests.selectedRequest
  );
  
  const navigate = useNavigate(); // Initialize navigate
  const { user } = useAuth();
  const { sendNotification } = useNotificationConnection(selectedRequest.user.userName);

  if (!selectedRequest || !selectedRequest.user) {
    return (
      <div className="handle-con">
        <p>No request selected. Please select a request first.</p>
      </div>
    );
  }

  const handleAccept = async () => {
    sendNotification({
      senderUserName: user?.username,
      content: `Your request is accepted. Please visit our shelter.\nCity/Address: ${selectedRequest.pet.shelter.city}, ${selectedRequest.pet.shelter.address}`,
      receiverUserName: selectedRequest.user.userName,
      sendedAt: new Date().toISOString(),
    });
    await adoptionRequestHandler(selectedRequest.id, true);
    navigate(-1); // Navigate back to the previous page
  };

  const handleReject = async () => {
    sendNotification({
      senderUserName: user?.username,
      content: `Your request is rejected. Please contact us for further details.`,
      receiverUserName: selectedRequest.user.userName,
      sendedAt: new Date().toISOString(),
    });
    await adoptionRequestHandler(selectedRequest.id, false);
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="handle-con">
      <div className="handle-info">
        <div className="info-con">
          <div className="user-info-con">
            <div>
              <img src={selectedRequest.user.profileImageUrl} alt="User Profile" />
            </div>
            <div>
              Full Name:{" "}
              {selectedRequest.user.firstname + " " + selectedRequest.user.lastname}
            </div>
            <div>Address: {selectedRequest.user.address}</div>
            <div>City: {selectedRequest.user.city}</div>
            <div>About: {selectedRequest.about}</div>
            <div>Experience: {selectedRequest.yearsOfPetExperience} year</div>
          </div>
          <div className="middle-con">wants to adopt ...</div>
          <div className="user-info-con">
            <div>
              <img src={selectedRequest.pet.imageUrls[0]} alt="Pet" />
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
<<<<<<< HEAD
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
=======
        <div className="btn-con">
          <div>
            <button onClick={handleAccept} className="accept-btn">Accept</button>
          </div>
          <div>
            <button onClick={handleReject} className="reject-btn">Reject</button>
          </div>
>>>>>>> 8f3a43554882d41e37b7a2f9d13784f7769296e9
        </div>
      </div>
    </div>
  );
};

export default RequestHandle;
