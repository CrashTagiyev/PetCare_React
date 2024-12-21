import { Anchor, Carousel, Image } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { FetchPet } from "../../../AxiosFetchs/EntityReduxFetchs/FetchPet";
import "../PetInfo/petInfo.scss";
import Loading from "../../loading/Loading";
import MapComponent from "../../MapComponent/MapComponent";
import { ContactIcons } from "../../../IconImports/ContactIcons";
import { useAuth } from "../../../Hooks/useAuth";
import AdoptionModal from "../../userProfileComponents/CompanyComponents/adoption/AdoptionModal";
const anchorItems = [
  {
    key: "petInfoAbout",
    href: "#petInfoAbout",
    title: "About",
  },
  {
    key: "petInfoAdoption",
    href: "#petInfoAdoption",
    title: "Adoption",
  },
  {
    key: "petInfoDescription",
    href: "#petInfoDescription",
    title: "Description",
  },
  {
    key: "petInfoShelterInfo",
    href: "#petInfoShelterInfo",
    title: "Shelter info",
  },
];

const PetInfo = () => {
  const [info, setInfo] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPetInfo = async () => {
      const petData = await FetchPet(id);
      setInfo((prev) => (prev = petData));
    };
    if (!info) fetchPetInfo();
  }, []);

  if (!info) return <Loading />;

  return (
    <section className="pet-info-sect">
      <AdoptionModal
        closeModal={setIsOpen}
        isModalOpen={isOpen}
        petInfo={info}
      />
      <div className="carousel-cont">
        <Carousel style={{ width: "100% !important" }} arrows infinite={true}>
          {info?.imageUrls?.map((url, index) => (
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
      <div className="info-cont">
        <div className="pet-header-panel">
          <div className="header-info-panel">
            <h1 className="info-petname">{info?.petName}</h1>
            <div>
              <h4>
                City/Address: {info?.shelter?.city} {info?.shelter?.address}
              </h4>
            </div>
            <div>
              <h4>
                {info?.size} - {info?.age} years old -{" "}
                {info?.shelter?.gender === 1 ? "Male" : "Female"} -
              </h4>
            </div>
          </div>
          <div className="anchor-cont">
            <Anchor items={anchorItems} />
          </div>
        </div>
        <div id="petInfoAbout" className="about-panel">
          <h1>ABOUT</h1>
          <div>
            <h3>BREED</h3>
            <p>{info?.breed.breedName}</p>
          </div>
          <div>
            <h3>HEALTH</h3>
            <p>{info?.health}</p>
          </div>
          <div>
            <h3>WEIGHT</h3>
            <p>{info?.weight}</p>
          </div>
        </div>
        {user?.roles === "User" && (
          <div id="petInfoAdoption" className="adoption-panel">
            <div className="adoption-panel-item-container">
              <h1>Considering {info?.petName} for adoption?</h1>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(true);
                }}
              >
                CLICK HERE!
              </button>
            </div>
          </div>
        )}
        <div id="petInfoDescription" className="description-panel">
          <h1>Meet {info?.petName} !</h1>
          <div>
            <p>{info?.description}</p>
          </div>
        </div>
        <div id="petInfoShelterInfo" className="shelter-info-panel">
          <div className="shelter-header">
            <img
              className="pet-info-shelter-Image"
              src={info?.shelter.shelterImageUrl}
              alt=""
            />
            <h1>{info?.shelter.shelterName}</h1>
          </div>
          <div className="shelter-map-cont">
            {/* <MapComponent width="100%" height="100%" city={info?.shelter.city} address={info?.shelter.address}/> */}
            <MapComponent
              width="100%"
              height="100%"
              city={"Baku"}
              address={"Koroglu Rahimov 70"}
            />
          </div>
          <div className="shelter-info">
            <div className="shelter-info-content-cont">
              <div className="title-and-img">
                <img src={ContactIcons.addressIcon} alt="" />
                <h2>Address:</h2>
              </div>
              <p>
                {info?.shelter.city} {info?.shelter.address}
              </p>
            </div>
            <div className="shelter-info-content-cont">
              <div className="title-and-img">
                <img src={ContactIcons.emailIcon} alt="" />
                <h2>Email address:</h2>
              </div>
              <p>{info?.shelter.emailAddress}</p>
            </div>
            <div className="shelter-info-content-cont">
              <div className="title-and-img">
                <img src={ContactIcons.phoneIcon} alt="" />
                <h2>Phone number:</h2>
              </div>
              <p>{info?.shelter.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetInfo;
