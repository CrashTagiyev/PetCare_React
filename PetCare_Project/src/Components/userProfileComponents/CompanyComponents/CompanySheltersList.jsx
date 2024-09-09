import React from "react";
import { Button } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";
import usePetCareAPI from "../../../Hooks/usePetCareApi";
import "../CompanyComponents/companySheltersList.scss";
import AddPetToShelterModal from "./AddPetToShelterModal";

const CompanySheltersList = () => {
  
  const [shelters, setShelters] = useState([]);
  const [currentShelterId, setCurrentShelterId] = useState(0);
  const { PetCareAPI } = usePetCareAPI();
  const { user } = useAuth();
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);

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
      <AddPetToShelterModal
      shelterId={currentShelterId}
        isModalOpen={isAddPetModalOpen}
        closeModal={setIsAddPetModalOpen}
      />
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

            <Button className="add-pet-btn"
              onClick={(e) => {
                setCurrentShelterId(prev=>prev=shelter.id)
                setIsAddPetModalOpen((prev) => !prev);
              }}
            >
              Add Pet
            </Button>
          </div>
        ))}
    </div>
  );
};

export default CompanySheltersList;
