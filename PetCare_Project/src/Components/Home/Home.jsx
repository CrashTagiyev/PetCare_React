import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import "../Home/home.scss";
import FilterSection from "./HomeSections/filter/FilterSection";
import Pets from "./HomeSections/pets/Pets";
import SearchSection from "./HomeSections/search/SearchSection";
import Shelters from "./HomeSections/shelters/Shelters";
import Vets from "./HomeSections/vet/Vets";
import { PETS_FILTER_OPTIONS } from "./HomeSections/filter/filterOptions";

const Home = () => {
  const [displayItems, setDisplayItems] = useLocalStorage(
    "displayItems",
    "All"
  );

  const [filterOptions, setFilterOptions] = useState(PETS_FILTER_OPTIONS);

  const renderContent = () => {
    switch (displayItems) {
      case "Dogs":
        return <Pets filterOptions={filterOptions} setFilterOptions={setFilterOptions}/>;
      case "Cats":
        return <Pets filterOptions={filterOptions} setFilterOptions={setFilterOptions} />;
      case "All":
        return <Pets filterOptions={filterOptions} setFilterOptions={setFilterOptions} />;
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
      <SearchSection
        setDisplay={setDisplayItems}
        setFilterOptions={setFilterOptions}
      ></SearchSection>
       
        <section className="items-section">{renderContent()}</section>
    </>
  );
};

export default Home;
