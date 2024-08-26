import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import "../Home/home.scss";
import Pets from "./HomeSections/pets/Pets";
import SearchSection from "./HomeSections/SearchSection";
import Shelters from "./HomeSections/shelters/Shelters";
import Vets from "./HomeSections/vet/Vets";
const Home = () => {
  const [displayItems, setDisplayItems] = useLocalStorage(
    "displayItems",
    "All"
  );

  const renderContent = () => {
    switch (displayItems) {
      case "Dogs":
        return <Pets petTypeId={1} />;
      case "Cats":
        return <Pets petTypeId={3} />;
      case "Others":
        return (
          <div>
            <h2>Others</h2>
          </div>
        );
      case "Shelters":
        return <Shelters />;
      case "Vets":
        return <Vets />;
      default:
        return <h2>All</h2>;
    }
  };

  return (
    <>
      {/* Search section */}
      <SearchSection setDisplay={setDisplayItems}></SearchSection>
      {/* Items section */}
      <section className="items-section">{renderContent()}</section>
    </>
  );
};

export default Home;
