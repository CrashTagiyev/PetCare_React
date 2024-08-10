import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FetchVets } from "../../../AxiosFetchs/EntityFetchs/VetsFetch";

const Vets = () => {
  const [vets, setVets] = useState([]);

  useEffect(() => {
    const handler = async () => {
      await FetchVets().then((data) => {
        console.log(data);
        setVets(data);
      });
    };
    handler();
  }, [setVets]);

  return (
    <>
      {vets &&
        vets.map((vet, index) => (
          <li key={index}>{vet.userName}</li>
        ))}
    </>
  );
};

export default Vets;
