import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import viewStyles from "../../../viewStyles";
import theme from "../../../../theme";
import { ThemeProvider } from "@mui/material/styles";
const SettingsSelectComponent = ({
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
    <FormControl
      variant="outlined"
      size="small"
      className={classes.settingSelectInput}
    >
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
              <MenuItem value={item.value} key={i}>
                {item.name}
              </MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  );
};

const SettingSelectComponent = ({
  label,
  onSelecteChange,
  items,
  name,
  value,
  ...rest
}) => {
  return (
    <ThemeProvider theme={theme}>
      <SettingsSelectComponent
        label={label}
        onSelecteChange={onSelecteChange}
        items={items}
        value={value}
        rest
      />
    </ThemeProvider>
  );
};
export default SettingSelectComponent;
