import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const SelectComponent = ({
  label,
  onSelecteChange,
  items,
  name,
  value,
  ...rest
}) => {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel ref={inputLabel} id={`select-${label}`}>
        {label}
      </InputLabel>
      <Select
        label={label}
        labelId={`select-${label}`}
        name={name}
        onChange={(e) => onSelecteChange(e.target.value)}
        labelWidth={labelWidth}
        value={value}
        multiple={false}
        {...rest}
      >
        {items.length > 0
          ? items.map((item, i) => (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          ))
          : null}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
