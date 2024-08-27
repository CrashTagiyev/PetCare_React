import React from "react";
import filterIcons from "../../../../IconImports/ImportFIlterIcons";
import { FILTER_OPTIONS } from "../filter/filterOptions";

const SearchSection = ({ setDisplay, setFilterOptions }) => {
  const displayButtonHandler = (e) => {
    e.preventDefault();
    setDisplay(e.currentTarget.value);
  };

  return (
    <section className="search-section">
      <form className="search-form">
        <input
          className="form-input1"
          placeholder="Search Terrier, Kitten,etc."
          type="text"
        />
        <input
          className="form-input2"
          placeholder="Enter City,Country"
          type="text"
        />
        <button className="search-submit-button" type="submit"></button>
      </form>
      <h1 className="search-section-Text">Find your new best friend</h1>
      <div className="search-button-container">
        <button
          value={"Dogs"}
          onClick={(e) => {
            setFilterOptions((p) => ({ ...p, petTypeId: 1 ,breedId:undefined, isAll: false }));
            displayButtonHandler(e);
          }}
        >
          <div className="filter-btn-div">
            <img className="filter-btn-img" src={filterIcons.dogs}></img>
            <p>Dogs</p>
          </div>
        </button>
        <button
          value={"Cats"}
          onClick={(e) => {
            setFilterOptions((p) => ({ ...p, petTypeId: 2,breedId:undefined, isAll: false  }));
            displayButtonHandler(e);
          }}
        >
          <div className="filter-btn-div">
            <img className="filter-btn-img" src={filterIcons.cats}></img>
            <p>Cats</p>
          </div>
        </button>
        <button
          value={"All"}
          onClick={(e) => {
            setFilterOptions(FILTER_OPTIONS)
            setFilterOptions((p) => ({ ...p, petTypeId: 0, isAll: true }));
            displayButtonHandler(e);
          }}
        >
          <div className="filter-btn-div">
            <img className="filter-btn-img" src={filterIcons.others}></img>
            <p>All</p>
          </div>
        </button>
        <button value={"Shelters"} onClick={displayButtonHandler}>
          <div className="filter-btn-div">
            <img className="filter-btn-img" src={filterIcons.shelters}></img>
            <p>Shelters</p>
          </div>
        </button>
        <button value={"Vets"} onClick={displayButtonHandler}>
          <div className="filter-btn-div">
            <img className="filter-btn-img" src={filterIcons.vets}></img>
            <p>Vets</p>
          </div>
        </button>
      </div>
    </section>
  );
};

export default SearchSection;
