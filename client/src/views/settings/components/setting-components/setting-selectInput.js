import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import viewStyles from "../../../viewStyles";

const SettingSelectComponent = ({
  label,
  onSelecteChange,
  items,
  name,
  value,
  ...rest
}) => {
  const classes = viewStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl variant='outlined' size='small' className={classes.settingSelectInput}>
      <InputLabel ref={inputLabel} id={`select-${label}`}>
        {label}
      </InputLabel>
      <Select
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
              <MenuItem value={item.value} key={i}>
                {item.name}
              </MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  );
};

export default SettingSelectComponent;
