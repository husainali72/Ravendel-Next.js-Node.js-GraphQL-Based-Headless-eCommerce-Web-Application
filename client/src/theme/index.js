
import { createTheme } from "@mui/material";

import palette from "./palette";
import typography from "./typography";
import MuiTableCell from "./overrides/MuiTableCell";
import MuiTableHead from "./overrides/MuiTableHead";
import MuiTableRow from "./overrides/MuiTableRow";
import MuiTypography from "./overrides/MuiTypography";

import MuiPaper from "./overrides/MuiPaper";
import MuiCardHeader from "./overrides/MuiCardHeader";
import MuiFormControlLabel from "./overrides/MuiFormControlLabel";
import MuiCheckbox from "./overrides/MuiCheckbox";
import MuiTab from "./overrides/MuiTab";
import MuiListItemText from "./overrides/MuiListItemText";
import MuiRadio from "./overrides/MuiRadio";
import MuiInputBase from "./overrides/MuiInputBase";
import MuiOutlinedInput from "./overrides/MuiOutlinedInput";
import MuiTabs from "./overrides/MuiTabs";
import cssOutlinedInput from "./overrides/cssOutlinedInput";

const theme = createTheme({
  palette,
  typography,
  components: {

    MuiTableHead,
    MuiTableCell,
    MuiTableRow,
    MuiCardHeader,
    MuiTypography,
    MuiPaper,

    MuiTabs,
    MuiFormControlLabel,
    MuiTab,
    MuiListItemText,
    MuiRadio,
    MuiInputBase,
    MuiOutlinedInput,
    MuiCheckbox,
    cssOutlinedInput,
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
  },
});

export default theme;