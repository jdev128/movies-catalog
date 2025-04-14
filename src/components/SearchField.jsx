import PropTypes from "prop-types";
import { useState } from "react";
import "./SearchField.css";
import searchIcon from "../assets/icons8-search.svg";

const SearchField = ({ placeholder, onConfirm }) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onConfirm(searchInput);
      }}
    >
      <div className="search-field">
        <input
          type="text"
          placeholder={placeholder}
          value={searchInput}
          onChange={({ target }) => {
            setSearchInput(target.value);
          }}
        />
        <img src={searchIcon} id="search-icon"></img>
      </div>
    </form>
  );
};

SearchField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default SearchField;
