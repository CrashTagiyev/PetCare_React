// AdoptionRequest.js
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
    navigate("/requesthandle"); // Navigate to the new route
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="ad-req-div">
      <h2>Adoption Requests ({requestsArray.length})</h2>
      <ul className="req-list">
        {requestsArray.map((request, index) => (
          <li key={index}>
            <button className="req-btn" onClick={() => handleButtonClick(request)}>
              {request.user.firstname + " " + request.user.lastname}'s adoption request
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdoptionRequest;
