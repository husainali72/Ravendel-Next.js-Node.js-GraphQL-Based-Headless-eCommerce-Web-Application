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
export default RadioButton;
