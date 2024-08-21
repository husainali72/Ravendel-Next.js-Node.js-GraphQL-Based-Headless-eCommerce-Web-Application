
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
          min={get(data, "data.minValue")}
          max={get(data, "data.maxValue")}
          minValue={get(data, "select.minValue", get(data, "data.minValue"))}
          maxValue={get(data, "select.maxValue", get(data, "data.maxValue"))}
          onChange={({ min, max }) => {
            if (
              min !== get(data, "minValue") ||
              max !== get(data, "maxValue")
            ) {
              let value = {
                minValue: min,
                maxValue: max,
              };
              handleFilterChange(value, data?.type);
            }
          }}
        />
        <p className="range-value">
          Range :{" "}
          <Price
            price={get(data, "select.minValue", get(data, "data.minValue"))}
          />{" "}
          -{" "}
          <Price
            price={get(data, "select.maxValue", get(data, "data.maxValue"))}
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
