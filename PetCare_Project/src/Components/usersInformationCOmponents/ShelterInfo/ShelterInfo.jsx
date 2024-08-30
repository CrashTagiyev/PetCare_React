import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import MapComponent from "../../MapComponent/MapComponent";
import "../ShelterInfo/shelterInfo.scss";
const ShelterInfo = () => {
  const location = useLocation();
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (location.state && location.state.shelter)
      setInfo(location.state.shelter);
    window.scrollTo(0, 0);
  }, []);

  

  return (
    <div className="shelter-info-cont">
      <div className="shelter-profile">
        <img src={info.shelterImageUrl}></img>
      </div>
      <div className="shelter-info">
        <div>
          <MapComponent
            height="300px"
            width="400px"
            city={info.city}
            address={info.address}
          />
        </div>
        <div className="shelter-single-info">
          <div>
            <p className="shelter-label">Shelter name:</p>
          </div>
          <div>
            <p className="shelter-act-info">{info.shelterName}</p>
          </div>
        </div>
        <div className="shelter-single-info">
          <div>
            <p className="shelter-label">Address:</p>
          </div>
          <div>
            <p className="shelter-act-info">{info.address}</p>
          </div>
        </div>
      </div>
      <div className="shelter-info">
        <div className="shelter-single-info">
          <div>
            <p className="shelter-label">City:</p>
          </div>
          <div>
            <p className="shelter-act-info">{info.city}</p>
          </div>
        </div>
        <div className="shelter-single-info">
          <div>
            <p className="shelter-label">Adoption policy:</p>
          </div>
          <div>
            <p className="shelter-act-info">{info.adoptionPolicy}</p>
          </div>
        </div>
        <div className="shelter-single-info">
          <div>
            <p className="shelter-label">About shelter:</p>
          </div>
          <div>
            <p className="shelter-act-info">{info.aboutShelter}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterInfo;
