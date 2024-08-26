import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchPets } from "../../../../AxiosFetchs/EntityReduxFetchs/FetchPets";
import "../pets/pets.scss";

const Pets = ({ petTypeId }) => {
  const dispatch = useDispatch();
  const [filterOptions, setFilterOptions] = useState({
    isAll: false,
    petTypeId: petTypeId,
    petName: "",
    size: "",
    minAge: 0,
    maxAge: 0,
    gender: 0,
    minWeight: 0,
    maxWeight: 0,
    breedId: 0,
  });

  const array = useSelector((state) => state.pets.petsArray);
  const isArrayLoading = useSelector((state) => state.pets.isLoading);
  const arrayError = useSelector((state) => state.pets.error);

  useEffect(() => {
    dispatch(FetchPets(filterOptions));
    console.log(array);
  }, []);

  return (
    <div className="users-cont">
      {array.map((pet, index) => (
         <div className="user-self" key={index}>
            <div className="user-img-cont">
              <img src={pet.imageUrls[0]}></img>
            </div>
            <div className="users-info-cont">
              <div className="user-fullname">
                <p>{pet.petName}</p>
              </div>
            </div>
         </div>
      ))}
    </div>
  );
};

export default Pets;
