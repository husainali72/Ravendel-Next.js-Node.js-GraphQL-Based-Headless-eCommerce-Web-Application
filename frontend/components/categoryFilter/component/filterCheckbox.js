
import React, { useEffect, useState } from "react";
import {  get } from "lodash";
import CheckBox from "../../check";
import PropTypes from "prop-types";
import Search from "./search";
const FilterCheckbox = ({ data, handleFilterChange }) => {
  const [filterData, setFilterData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    let optionData = get(data, "data", []);
    if (optionData && optionData?.length > 0) {
      if(!showAll){
      setFilterData(optionData.slice(0, 5)); // Initially show only 5 items
    }else{
      setFilterData(optionData)
    }
      setSearchData(optionData);
    }
  }, [data]);
  const createCheckboxOptions = (optionsData) => {
    // Function to create radio options based on filter data
    return optionsData?.map((item) => ({
      label: item?.label,
      value: item?.value,
      select:item?.select
    }));
  };
  const onSearch = (filteredData) => {
    if(showAll){
    setFilterData(filteredData);
  }
    else
    {
      setFilterData(filteredData?.slice(0, 5));
     
    }
  };
  const handleShowMore = () => {
    setShowAll(true);
    setFilterData(searchData); // Show all items
  };
  return (
    <div className="filter-by-price-checkbox">
      <Search searchData={searchData} onSearch={onSearch} />
      <CheckBox
        type="checkbox"
        onChange={(e) => {
          handleFilterChange(get(e, "target.value"));
        }}
        options={createCheckboxOptions(filterData)}
      />
        {!showAll&&searchData?.length>5 && (
          <button onClick={handleShowMore} className="show-more-btn">Show more</button>
        )}
    </div>
  );
};


FilterCheckbox.propTypes = {
    data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
export default FilterCheckbox;
