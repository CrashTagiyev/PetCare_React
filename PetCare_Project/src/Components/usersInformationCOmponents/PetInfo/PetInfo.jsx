import { Carousel, Image } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../PetInfo/petInfo.scss";

const PetInfo = () => {
  const location = useLocation();
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (location.state && location.state.pet) setInfo(location.state.pet);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <section className="pet-info-sect">
      <div className="carousel-cont">
        <Carousel style={{ width: "100% !important" }} arrows infinite={true}>
          {location.state.pet?.imageUrls?.map((url, index) => (
            <div key={index} className="image-container">
              <div className="img-cont">
                <Image
                  className="carousel-img"
                  src={url}
                  alt={`pet_img_${index}`}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default PetInfo;
