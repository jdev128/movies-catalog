import PropTypes from "prop-types";
import { useRef, useState } from "react";
import "./SearchField.css";
import searchIcon from "../assets/icons8-search.svg";
import emptyIcon from "../assets/bx-x-circle.svg";

const SearchField = ({ placeholder, onConfirm }) => {
  const input = useRef();
  const [searchInput, setSearchInput] = useState("");

  const emptySearchInput = () => {
    setSearchInput("");
    input.current.focus();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        input.current.blur();
        onConfirm(searchInput.trim());
      }}
    >
      <div className="search-field">
        <input
          type="text"
          placeholder={placeholder}
          value={searchInput}
          ref={input}
          onChange={({ target }) => {
            setSearchInput(target.value);
          }}
        />
        {searchInput.trim().length > 0 ? (
          <img src={emptyIcon} id="empty-icon" onClick={emptySearchInput} />
        ) : (
          <img src={searchIcon} id="search-icon"></img>
        )}
      </div>
    </form>
  );
};

SearchField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default SearchField;
