import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../Home/home.scss";
import SearchSection from "./HomeSections/SearchSection";
import Vets from "../Home/HomeSections/vet/Vets";
const Home = () => {
  const [displayItems, setDisplayItems] = useState("All");

  const renderContent = () => {
    switch (displayItems) {
      case "Dogs":
        return (
          <div>
            <h2>Dogs</h2>
          </div>
        );
      case "Cats":
        return (
          <div>
            <h2>Cats</h2>
          </div>
        );
      case "Others":
        return (
          <div>
            <h2>Others</h2>
          </div>
        );
      case "Shelters":
        return (
          <div>
            <h2>Shelters</h2>
          </div>
        );
      case "Vets":
        return (
            <Vets />
        );
      default:
        return <h2>All</h2>;
    }
  };

  return (
    <>
      {/* Search section */}
      <SearchSection setDisplay={setDisplayItems}></SearchSection>
      <section className="items-section">{renderContent()}</section>
    </>
  );
};

export default Home;
