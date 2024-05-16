import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa"; // Import the cross icon from react-icons/fa
import { CiSearch } from "react-icons/ci";
import InputField from "../../inputField";

const Search = ({ searchData, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Filter data based on searchQuery when searchData or searchQuery changes
    const filtered = searchData.filter((data) =>
      data?.label?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
    onSearch(filtered);
  }, [searchData, searchQuery]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="search-container">
      <div className="input-container">
      <CiSearch />
        <InputField
          type="text"
          placeholder="Enter your search"
          value={searchQuery}
          onChange={handleInputChange}
          className="search-field"
        />
        {searchQuery && (
          <FaTimes className="clear-icon" onClick={clearSearch} />
        )}
      </div>
    </div>
  );
};

Search.propTypes = {
  searchData: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Search;
