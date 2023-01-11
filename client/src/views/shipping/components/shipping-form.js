import React from "react";
import { TextField, Box } from "@mui/material";
import { CardBlocksWithAction } from "../../components";
import theme from "../../../theme/index.js";
import { ThemeProvider } from "@mui/material/styles";
const ShippingsFormComponent = ({
  formMode,
  onInputChange,
  cancelShipping,
  updateCustomShipping,
  addCustomShipping,
  customShippingClass,
}) => {
  return (
    <CardBlocksWithAction
      title={`${formMode ? "Edit" : "Add"} Shipping`}
      successBtnLable={formMode ? "Update" : "Add"}
      successBtnOnChange={formMode ? updateCustomShipping : addCustomShipping}
      cancelBtnOnChange={cancelShipping}
      nomargin
    >
      <Box component="div" mb={2}>
        <TextField
          type="text"
          label="Name"
          name="name"
          variant="outlined"
          onChange={(e) => onInputChange("name", e.target.value)}
          value={customShippingClass.name}
          fullWidth
        />
      </Box>
      <Box component="div" mb={2}>
        <TextField
          type="number"
          label="Amount"
          name="amount"
          variant="outlined"
          onChange={(e) => onInputChange("amount", e.target.value)}
          value={customShippingClass.amount}
          fullWidth
        />
      </Box>
    </CardBlocksWithAction>
  );
};

const ShippingFormComponent = ({
  formMode,
  onInputChange,
  cancelShipping,
  updateCustomShipping,
  addCustomShipping,
  customShippingClass,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <ShippingsFormComponent
        formMode={formMode}
        onInputChange={onInputChange}
        cancelShipping={cancelShipping}
        updateCustomShipping={updateCustomShipping}
        addCustomShipping={addCustomShipping}
        customShippingClass={customShippingClass}
      />
    </ThemeProvider>
  );
};
export default ShippingFormComponent;
