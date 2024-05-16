import React from "react";
import PropTypes from "prop-types";
import { capitalize, get } from "lodash";
import ErrorMessage from "./errorMessage";

const TabBtn = ({ label, values, onChange, options, error }) => {
  return (
    <div>
      <label>{capitalize(label)}</label>
      {/* <div className="d-flex flex-row align-items-center">
        {options?.map((option) => (
          <div key={get(option, "value", "")} className="form-check me-3">
            <input
              className="form-check-input"
              type="radio"
              name={label}
              id={get(option, "value", "")}
              checked={option.value === values}
              onChange={() => onChange(get(option, "value", ""))}
            />
            <label
              className="form-check-label"
              htmlFor={get(option, "value", "")}
            >
              {capitalize(get(option, "label", ""))}
            </label>
          </div>
        ))}
      </div> */}
      <div className="option-wrapper">
        {options?.map((option) => (
            <div key={get(option, "value", "")} className="option">
                <button name={label} className={`${option.value === values ? 'active' : ''}`} onClick={() => onChange(get(option, "value", ""))}>
                    {capitalize(get(option, "label", ""))}
                </button>
            </div>
        ))}
      </div>
      <ErrorMessage message={error} />
    </div>
  );
};

TabBtn.propTypes = {
  label: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
};

export default TabBtn;
