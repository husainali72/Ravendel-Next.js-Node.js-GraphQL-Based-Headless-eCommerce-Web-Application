import { get } from "lodash";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FilterSlider from "./component/filterSlider";
import FilterRadioButtons from "./component/filterRadioButton";
import FilterCheckbox from "./component/filterCheckbox";
import { ARRAY, CHOICE, RANGE } from "./constant";
import AccordionComponent from "../accordian";

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
            return { ...item, select: true };
          } else {
            return { ...item, select: false };
          }
        });
        updatedFilterData = [...filterData];
        updatedFilterData[index] = {
          ...currentValue,
          select: updatedSelect,
          data: updatedData,
        };
        setFilteredData(updatedFilterData);
        break;
      default:
        break;
    }
    handleFilter(updatedFilterData);
  };


  return (
    <div className=" category-filter-container">
      <div className="filter-heading-container">
      <h4 className="category-section-title">Filters</h4>
      </div>
      {filterData?.map((filter, index) => (
        <div key={index} className="filter-section">
          {(() => {
            let data = get(filter, "data");
            switch (get(filter, "type")) {
              case ARRAY:
                return (
                  data?.length > 0 && (
                    <AccordionComponent
                      title={get(filter, "heading", "")}
                      body={
                        <FilterCheckbox
                          data={filter}
                          handleFilterChange={(e) =>
                            handleFilterChange(e, index, get(filter, "type"))
                          }
                        />
                      }
                    />
                  )
                );
              case RANGE:
                return (
                  data && (
                    <AccordionComponent
                      title={get(filter, "heading", "")}
                      body={
                        <FilterSlider
                          data={filter}
                          handleFilterChange={(e) =>
                            handleFilterChange(e, index, get(filter, "type"))
                          }
                        />
                      }
                    />
                  )
                );
              case CHOICE:
                return (
                  data?.length > 0 && (
                    <AccordionComponent
                      title={get(filter, "heading", "")}
                      body={
                        <FilterRadioButtons
                          data={filter}
                          handleFilterChange={(e) =>
                            handleFilterChange(e, index, get(filter, "type"))
                          }
                        />
                      }
                    />
                  )
                );
              default:
                return null;
            }
          })()}
        </div>
      ))}
    </div>
  );
};
CategoryFilter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  filterCategoryData: PropTypes.array.isRequired,
};

export default CategoryFilter;
