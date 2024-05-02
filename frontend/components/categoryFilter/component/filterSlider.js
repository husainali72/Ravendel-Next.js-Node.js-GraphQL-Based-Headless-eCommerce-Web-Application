/* eslint-disable no-unused-vars */
import React from "react";
import { capitalize, get } from "lodash";

import PropTypes from "prop-types";
import MultiRangeSlider from "../../breadcrumb/multirangeSlider";
import Price from "../../priceWithCurrency";
const FilterSlider = ({ data, handleFilterChange }) => {
  return (
    <>
      <h5 className="category-section-title mb-30 wow fadeIn animated animated animated">
        {capitalize(get(data, "heading", ""))}
      </h5>
      <div style={{ marginTop: "30px" }}>
        <MultiRangeSlider
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
        <p style={{ paddingTop: "10px", color: "grey" }}>
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
};
export default FilterSlider;
