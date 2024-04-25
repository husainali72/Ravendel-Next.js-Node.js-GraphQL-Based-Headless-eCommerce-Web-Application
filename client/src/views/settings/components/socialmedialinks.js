import React from "react";
import { IconButton, Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import CloseIcon from "@mui/icons-material/Close";
import viewStyles from "../../viewStyles.js";
import { MenuProps } from "../../coupon/coupon-components/index.js";
import { socialMediaIconSetter } from "./setting-components/constant.js";
import { get } from "lodash";


const SocialMediaComponent = ({
  handleChange,
  selectedIcons,
  removeInput,
  menuItem,
  onhandleChange,
}) => {
  const classes = viewStyles();
  const checkSelectedIcons = (Icons) => {
    if (selectedIcons && selectedIcons?.length > 0) {
      return selectedIcons?.some((item) => {
        return item?.name === Icons?.name;
      });
    }
  };
  const SelectOptionField = ({ label, name, value, children, id }) => {
    return (
      <>
        <FormControl  className={classes.SocialContainer}>
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            label={label}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            multiple
            onChange={(e) => onhandleChange(e)}
            className={classes.iconSelect}
            value={value || []}
            name={name}
            renderValue={(selected) => (
              <div className={classes.socialMediaSelect}>
                {selected?.map((value) => socialMediaIconSetter(value?.name))}
              </div>
            )}
            MenuProps={MenuProps}
            fullWidth
          >
            {children}
          </Select>
        </FormControl>
      </>
    );
  };
  return (
    <>
      <SelectOptionField
        name="name"
        label="Social Icons Type"
        value={selectedIcons}
        id="products"
      >
        {menuItem?.length > 0
          ? menuItem?.map((iconName, index) => (
              <MenuItem
                value={iconName}
                key={get(iconName,'name')}
                disabled={checkSelectedIcons(iconName)}
              >
                {socialMediaIconSetter(iconName?.name)}
                <span className={classes.socialMediaIconName}>{get(iconName,'name')}</span>
              </MenuItem>
            ))
          : null}
      </SelectOptionField>

      {selectedIcons && selectedIcons?.length > 0
        ? selectedIcons?.map((icon, index) => {
            return (
              <div className={classes.container}>
                <div className={classes.divContainer}>
                  <div className={classes.iconDiv}>
                    {socialMediaIconSetter(get(icon,'name'))}
                  </div>
                  <input
                    aria-invalid="false"
                    id=":rj:"
                    name={icon}
                    placeholder={`${
                      get(icon,'name')?.charAt(0).toUpperCase() + get(icon,'name')?.slice(1)
                    } Link`}
                    type="tel"
                    className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedStart css-e7hdwz-MuiInputBase-input-MuiOutlinedInput-input"
                    value={get(icon,'handle')}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => removeInput(index)}
                  >
                    <CloseIcon className={classes.SocialCloseIcon}/>
                  </IconButton>
                </Stack>
              </div>
            );
          })
        : null}
    </>
  );
};
export default function SocialMedia({
  handleChange,
  addIconButton,
  onhandleChange,
  selectedIcons,
  removeInput,
  menuItem,
}) {
  const iconsArray = Array.isArray(selectedIcons) ? selectedIcons : [];
  return (
    <ThemeProvider theme={theme}>
      <SocialMediaComponent
        handleChange={handleChange}
        selectedIcons={iconsArray}
        removeInput={removeInput}
        menuItem={menuItem}
        addIconButton={addIconButton}
        onhandleChange={onhandleChange}
      />
    </ThemeProvider>
  );
}
