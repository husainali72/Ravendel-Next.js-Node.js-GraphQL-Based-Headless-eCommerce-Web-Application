import { get } from "lodash";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FilterSlider from "./component/filterSlider";
import FilterRadioButtons from "./component/filterRadioButton";
import FilterCheckbox from "./component/filterCheckbox";
import { ARRAY, CHOICE, RANGE } from "./constant";

const CategoryFilter = ({ filterCategoryData, handleFilter }) => {
  const [filterData, setFilteredData] = useState([]);
  useEffect(() => {
    setFilteredData(filterCategoryData);
  }, [filterCategoryData]);
  const handleFilterChange = (value, index, type) => {
    let currentValue = {};
    let updatedSelect = {};
    let updatedFilterData = [];
    let updatedData = [];
    switch (type) {
      case ARRAY:
        currentValue = filterData[index];
        updatedSelect = get(currentValue, "select", []);
        updatedData = get(currentValue, "data", [])?.map((item) => {
          if (item?.value === value) {
            return { ...item, select: !item?.select };
          } else {
            return item;
          }
        });
        updatedFilterData = [...filterData];
        updatedFilterData[index] = {
          ...currentValue,
          data: updatedData,
        };
        setFilteredData(updatedFilterData);
        break;
      case RANGE:
        currentValue = filterData[index];
        updatedSelect = {
          ...currentValue.select,
          minPrice: get(value, "minPrice"),
          maxPrice: get(value, "maxPrice"),
        };
        updatedFilterData = [...filterData];
        updatedFilterData[index] = {
          ...currentValue,
          select: updatedSelect,
        };
        setFilteredData(updatedFilterData);
        break;
      case CHOICE:
        currentValue = filterData[index];
        updatedSelect = {
          ...currentValue.select,
          minValue: value,
        };
        updatedData = get(currentValue, "data", [])?.map((item) => {
          if (item?.value === parseInt(value)) {
            return { ...item, select: true};
          } else {
            return { ...item, select: false };
          }
        });
        updatedFilterData = [...filterData];
        updatedFilterData[index] = {
          ...currentValue,
          select: updatedSelect,
          data:updatedData
        };
        setFilteredData(updatedFilterData); 
        break;
      default:
        break;
    }
  };
  const applyFilter = () => {
    handleFilter(filterData);
  };

  return (
   <div className="widget-category">
      {filterData?.map((filter, index) => (
        <div key={index} className="filter-section">
          {(() => {
            switch (get(filter, "type")) {
              case ARRAY:
                return (
                  <FilterCheckbox
                    data={filter}
                    handleFilterChange={(e) =>
                      handleFilterChange(e, index, get(filter, "type"))
                    }
                  />
                );
              case RANGE:
                return (
                  <FilterSlider
                    data={filter}
                    handleFilterChange={(e) =>
                      handleFilterChange(e, index, get(filter, "type"))
                    }
                  />
                );
              case CHOICE:
                return (
                  <FilterRadioButtons
                    data={filter}
                    handleFilterChange={(e) =>
                      handleFilterChange(e, index, get(filter, "type"))
                    }
                  />
                );
              default:
                return null;
            }
          })()}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-success primary-btn-color"
        style={{ marginTop: 12 }}
        onClick={applyFilter}
      >
        <i className="fa fa-filter"></i>Fillter
      </button>
    </div>
  );
};
CategoryFilter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  filterCategoryData: PropTypes.array.isRequired
};

export default CategoryFilter;
