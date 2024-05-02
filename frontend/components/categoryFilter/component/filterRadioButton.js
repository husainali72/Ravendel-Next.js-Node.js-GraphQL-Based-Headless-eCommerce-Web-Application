import React, { useEffect, useState } from "react";
import {  get } from "lodash";
import PropTypes from "prop-types";
import CheckBox from "../../check";
import Search from "./search";

const FilterRadioButtons = ({ data, handleFilterChange }) => {
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

  const createRadioOptions = (optionsData) => {
    return optionsData?.map((item) => ({
      label: item?.label,
      value: item?.value,
      select: item?.select,
    }));
  };

  const onSearch = (filteredData) => {
    if(showAll){
    setFilterData(filteredData);}
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
    <>
      <Search searchData={searchData} onSearch={onSearch} />
      <div className="radio-buttons">
        <CheckBox
          type="radio"
          name="radioSelect"
          onChange={(e) => {
            handleFilterChange(get(e, "target.value"));
          }}
          options={createRadioOptions(filterData)}
        />
        {!showAll&&searchData?.length>5 && (
          <button onClick={handleShowMore} className="show-more-btn">{searchData?.length-5} more</button>
        )}
      </div>
    </>
  );
};

FilterRadioButtons.propTypes = {
  data: PropTypes.array.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default FilterRadioButtons;
