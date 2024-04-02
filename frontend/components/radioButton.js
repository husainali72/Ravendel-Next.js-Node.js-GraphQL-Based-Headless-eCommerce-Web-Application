import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { capitalize, get } from "lodash";
import ErrorMessage from "./errorMessage";
import PropTypes from "prop-types";
const RadioButton = ({ lable, value, onChange, options, error }) => {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        {capitalize(lable)}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={onChange}
      >
        {options?.map((option) => {
          return (
            <>
              <p>{option?.lable}</p>
              <FormControlLabel
                key={get(option, "value", "")}
                value={get(option, "value", "")}
                control={<Radio />}
                label={capitalize(get(option, "label", ""))}
              />
            </>
          );
        })}
      </RadioGroup>
      <ErrorMessage message={error} />
    </FormControl>
  );
};
RadioButton.propTypes = {
  lable: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
};
export default RadioButton;
