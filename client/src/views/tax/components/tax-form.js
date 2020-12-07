import React from "react";
import {
  TextField,
  Box,
} from "@material-ui/core";
import { CardBlocksWithAction } from "../../components";

const TaxFormComponent = ({
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
      <Box component='div' mb={2}>
        <TextField
          type='text'
          label='Name'
          name='name'
          variant='outlined'
          onChange={(e) => onInputChange("name", e.target.value)}
          value={customTaxClassState.name}
          fullWidth
        />
      </Box>
      <Box component='div' mb={2}>
        <TextField
          type='number'
          label='Percentage'
          name='percentage'
          variant='outlined'
          onChange={(e) => onInputChange("percentage", e.target.value)}
          value={customTaxClassState.percentage}
          fullWidth
        />
      </Box>
    </CardBlocksWithAction>
  );
};

export default TaxFormComponent;
