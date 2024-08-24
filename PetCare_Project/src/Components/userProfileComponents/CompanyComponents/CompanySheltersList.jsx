import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";
import usePetCareAPI from "../../../Hooks/usePetCareApi";
import "../CompanyComponents/companySheltersList.scss";

const CompanySheltersList = () => {
  const [shelters, setShelters] = useState([]);
  const { PetCareAPI } = usePetCareAPI();
  const { user } = useAuth();
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        console.log(user.id);
        const response = await PetCareAPI.get(`/company/GetCompanyShelters`, {
          params: { companyId: user.id },
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log(response.data);
        setShelters(response.data);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too many requests. Please try again later.");
        } else {
          console.error("An error occurred while fetching shelters:", error);
        }
      }
    };

    fetchShelters();
  }, [user.id, PetCareAPI]);

  return (
    <div className="company-shelters-cont">
      {shelters &&
        shelters.map((shelter, index) => (
          <div className="company-shelters-item" key={index}>
            <img
              className="company-shelters-img"
              src={shelter.shelterImageUrl}
              alt="shelterimg"
            />
            <Link to={`/shelterInfo/${shelter.id}`} state={{ shelter }}>
              <h2>{shelter.shelterName}</h2>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default CompanySheltersList;
