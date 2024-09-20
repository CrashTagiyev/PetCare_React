import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FetchAdoptionRequests } from "../../AxiosFetchs/EntityReduxFetchs/FetchAdoptionRequests";
import { useAuth } from "../../Hooks/useAuth";
import { setSelectedRequest } from "../../Store/adoptionRequestSlice";
import "../AdoptionRequest/adoptionrequest.scss";

const AdoptionRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { user } = useAuth();
  const { requestsArray, isLoading, error } = useSelector(
    (state) => state.adoptionrequests || {}
  ); 

  useEffect(() => {
    dispatch(FetchAdoptionRequests(user.id));
  }, [dispatch, user.id]);

  const handleButtonClick = (request) => {
    dispatch(setSelectedRequest(request)); // Set the selected request in Redux
    console.log(request)
    navigate("/requesthandle"); // Navigate to the new route
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    
    <div className="ad-req-div">
      <div className="adopt-header">
        <div>
          <h2>Adoption Requests ({requestsArray.length})</h2>
        </div>
        <div className="status-cont">
          <div className="accept-cont">
            <div className="accept-ellipse"></div>
            Accepted
          </div>
          <div className="accept-cont">
            <div className="pending-ellipse"></div>
            Pending
          </div>
          <div className="accept-cont">
            <div className="reject-ellipse"></div>
            Rejected
          </div>
        </div>
      </div>
      <ul className="req-list">
        {requestsArray.map((request) => (
          <li key={request.id}>
            {" "}
            {/* Use request.id as key */}
            <button
              className={`req-btn ${
                request.isAccepted === 1
                  ? "accept-color"
                  : request.isAccepted === 2
                  ? "pending-color"
                  : request.isAccepted === 3
                  ? "reject-color"
                  : ""
              }`}
              onClick={() => handleButtonClick(request)}
              disabled = {request.isAccepted !=2}
            >
              {request.user.firstname + " " + request.user.lastname}'s adoption
              {console.log(requestsArray)}
              request
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdoptionRequest;
