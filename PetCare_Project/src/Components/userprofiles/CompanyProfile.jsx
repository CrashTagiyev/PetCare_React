import { Button } from "antd";
import React from "react";
import { useState } from "react";
import CompanySheltersList from "../userProfileComponents/CompanyComponents/CompanySheltersList";
import CreateShelterModal from "../userProfileComponents/CompanyComponents/CreateShelterModal";
import "./companyProfile.scss";
const CompanyProfile = ({  currentCompanyInfo }) => {
  const [createShelterIsOpen, setCreateShelterIsOpen] = useState(false);
  if (!currentCompanyInfo) return null;

  return (
    <div className="vet-profile-cont">
      <CreateShelterModal
        closeModal={setCreateShelterIsOpen}
        isModalOpen={createShelterIsOpen}
      />
      <div className="left-part">
        <div>
          <div className="profile-img-cont">
            <img
              src={
                currentCompanyInfo.profileImageUrl &&
                currentCompanyInfo.profileImageUrl
              }
              alt={` profile`}
            />
          </div>
          <div className="left-part-info-cont">
            <div className="info-label-p-cont">
              <label>Company Name:</label>
              <p>{currentCompanyInfo.companyName}</p>
            </div>
            <div className="info-label-p-cont">
              <label>Email address:</label>
              <p>{currentCompanyInfo.email && currentCompanyInfo.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="right-part">
        <div className="right-part-info-cont">
          <div className="info-label-p-cont">
          <Button
          className="crt-sltr-btn"
              onClick={(e) => {
                e.preventDefault();
                setCreateShelterIsOpen(true);
              }}
            >
              Create new shelter
            </Button>
            <div>
              <CompanySheltersList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompanyProfile;
