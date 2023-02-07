
import { createTheme } from "@mui/material";

import palette from "./palette";
import typography from "./typography";
import MuiTableCell from "./overrides/MuiTableCell";
import MuiTableHead from "./overrides/MuiTableHead";
import MuiTableRow from "./overrides/MuiTableRow";
import MuiPaper from "./overrides/MuiPaper";
import MuiCardHeader from "./overrides/MuiCardHeader";
import MuiCheckbox from "./overrides/MuiCheckbox";
import MuiTab from "./overrides/MuiTab";
import MuiListItemText from "./overrides/MuiListItemText";
import MuiRadio from "./overrides/MuiRadio";
import MuiOutlinedInput from "./overrides/MuiOutlinedInput";
import MuiTabs from "./overrides/MuiTabs";


const theme = createTheme({
  palette,
  typography,
  components: {

    MuiTableHead,
    MuiTableCell,
    MuiTableRow,
    MuiCardHeader,

    MuiPaper,
    MuiTabs,
    MuiTab,
    MuiListItemText,
    MuiRadio,
    MuiOutlinedInput,
    MuiCheckbox,

    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
  },
});

export default theme;