import React from "react";

const SearchSection = ({ setDisplay }) => {
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
          onClick={displayButtonHandler}
        >
          <div className="filter-btn-div">
            <img
              className="filter-btn-img"
              src="https://cdn.discordapp.com/attachments/1130485840510976022/1271751307568615508/image.png?ex=66b87a33&is=66b728b3&hm=92b91832610ae5e05cce2dbf25f220ae7a363b8eae4cd0a43a3f6f9e101b410e&"
            ></img>
            <p>Dogs</p>
          </div>
        </button>
        <button
          value={"Cats"}
          onClick={displayButtonHandler}
        >
          <div className="filter-btn-div">
            <img
              className="filter-btn-img"
              src="https://cdn.discordapp.com/attachments/1130485840510976022/1271749895614890025/image.png?ex=66b878e3&is=66b72763&hm=871f7bb394552031f7d532e6077a518bdc1363358594a092230d890a7ebee09f&"
            ></img>
            <p>Cats</p>
          </div>
        </button>
        <button
          value={"Others"}
          onClick={displayButtonHandler}
        >
          <div className="filter-btn-div">
            <img
              className="filter-btn-img"
              src="https://cdn.discordapp.com/attachments/1130485840510976022/1271753571062386749/image.png?ex=66b87c4f&is=66b72acf&hm=c1ec0e23876b0d6d14a2cb3833b75d92b1224b47275c3cc9737d6fcce4e73010&"
            ></img>
            <p>Others</p>
          </div>
        </button>
        <button
          value={"Shelters"}
          onClick={displayButtonHandler}
        >
          <div className="filter-btn-div">
            <img
              className="filter-btn-img"
              src="https://cdn.discordapp.com/attachments/1130485840510976022/1271754068338937897/image.png?ex=66b87cc5&is=66b72b45&hm=0c3ca9b1fcc7b796daf806f55217907c8432f94851ae15eb4a51812757ae4ece&"
            ></img>
            <p>Shelters</p>
          </div>
        </button>
        <button
          value={"Vets"}
          onClick={displayButtonHandler}
        >
          <div className="filter-btn-div">
            <img
              className="filter-btn-img"
              src="https://cdn.discordapp.com/attachments/1130485840510976022/1271767656839778354/e03d68bdd81bbd4cf67ff4af79aca27c.png?ex=66b8896d&is=66b737ed&hm=28566374fb80f1644a05e0cbdeb3f4dd291d4a07979258ac18e0f208e4bd9ff6&"
            ></img>
            <p>Vets</p>
          </div>
        </button>
      </div>
    </section>
  );
};

export default SearchSection;
