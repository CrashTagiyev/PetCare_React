import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { FetchPetTypes } from "../AxiosFetchs/EntityReduxFetchs/FetchPetTypes";
import { FetchBreedsByPetTypeId } from "../AxiosFetchs/EntityReduxFetchs/FetchBreedsByPetTypeId";
import { useState } from "react";

const usePetServices = () => {
  const dispatch = useDispatch();
  const [currentPetTypeId, setCurrentPetTypeId] = useState();

  const petTypes = useSelector((state) => state.petTypes.petTypesArray);
  const isPetTypesLoading = useSelector((state) => state.petTypes.isLoading);
  const petTypesError = useSelector((state) => state.petTypes.error);

  const breeds = useSelector((state) => state.breeds.breedsArray);
  const isBreedsLoading = useSelector((state) => state.breeds.isLoading);
  const breedsError = useSelector((state) => state.breeds.error);

  useEffect(() => {
    dispatch(FetchPetTypes());
  }, [dispatch]);

  useEffect(() => {
    if (currentPetTypeId) {
      dispatch(FetchBreedsByPetTypeId(currentPetTypeId));
    }
  }, [dispatch, currentPetTypeId]);

  return {
    petTypeArray: petTypes,
    isPetTypesLoading,
    petTypesError,
    breedsArray: breeds,
    isBreedsLoading,
    breedsError,
    setCurrentPetTypeId
  };
};

export default usePetServices;