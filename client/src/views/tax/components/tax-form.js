import React from "react";
import { TextField, Box } from "@mui/material";
import { CardBlocksWithAction } from "../../components";
import theme from "../../../theme";
import { ThemeProvider } from "@mui/material/styles";
const TaxFormComponents = ({
  formMode,
  onInputChange,
  cancelTaxForm,
  updateCustomTax,
  addCustomTax,
  customTaxClassState,
}) => {
  return (
    <CardBlocksWithAction
      title={`${formMode ? "Edit" : "Add"} Tax`}
      successBtnLable={formMode ? "Update" : "Add"}
      successBtnOnChange={formMode ? updateCustomTax : addCustomTax}
      cancelBtnOnChange={cancelTaxForm}
      nomargin
    >
      <Box component="div" mb={2}>
        <TextField
          type="text"
          label="Name"
          name="name"
          variant="outlined"
          onChange={(e) => onInputChange("name", e.target.value)}
          value={customTaxClassState.name}
          fullWidth
          onKeyDown={(e) =>
            ["ArrowUp", "ArrowDown", "e", "E", "+", "-", '.'].includes(e.key) && e.preventDefault()}
        />
      </Box>
      <Box component="div" mb={2}>
        <TextField
          type="number"
          label="Percentage"
          name="percentage"
          variant="outlined"
          onChange={(e) => onInputChange("percentage", e.target.value)}
          value={customTaxClassState.percentage}
          onKeyDown={(e) =>
            ["ArrowUp", "ArrowDown", "e", "E", "+", "-", '.'].includes(e.key) && e.preventDefault()}
          fullWidth

        />
      </Box>
    </CardBlocksWithAction>
  );
};

const TaxFormComponent = ({
  formMode,
  onInputChange,
  cancelTaxForm,
  updateCustomTax,
  addCustomTax,
  customTaxClassState,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <TaxFormComponents
        formMode={formMode}
        onInputChange={onInputChange}
        cancelTaxForm={cancelTaxForm}
        updateCustomTax={updateCustomTax}
        addCustomTax={addCustomTax}
        customTaxClassState={customTaxClassState}
      />
    </ThemeProvider>
  );
};
export default TaxFormComponent;
