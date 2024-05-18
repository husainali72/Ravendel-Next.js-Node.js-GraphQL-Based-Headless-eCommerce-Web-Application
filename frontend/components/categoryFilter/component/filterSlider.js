
import React from "react";
import {  get } from "lodash";

import PropTypes from "prop-types";
import MultiRangeSlider from "../../breadcrumb/multirangeSlider";
import Price from "../../priceWithCurrency";
const FilterSlider = ({ data, handleFilterChange,onBlur }) => {
  return (
    <>
      <div style={{ marginTop: "24px" }}>
        <MultiRangeSlider
        onBlur={onBlur}
          min={get(data, "data.minPrice")}
          max={get(data, "data.maxPrice")}
          minValue={get(data, "select.minPrice", get(data, "data.minPrice"))}
          maxValue={get(data, "select.maxPrice", get(data, "data.maxPrice"))}
          onChange={({ min, max }) => {
            if (
              min !== get(data, "minPrice") ||
              max !== get(data, "maxPrice")
            ) {
              let value = {
                minPrice: min,
                maxPrice: max,
              };
              handleFilterChange(value, data?.type);
            }
          }}
        />
        <p className="range-value">
          Range :{" "}
          <Price
            price={get(data, "select.minPrice", get(data, "data.minPrice"))}
          />{" "}
          -{" "}
          <Price
            price={get(data, "select.maxPrice", get(data, "data.maxPrice"))}
          />
        </p>
      </div>
    </>
  );
};
FilterSlider.propTypes = {
  data: PropTypes.object.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};
export default FilterSlider;
