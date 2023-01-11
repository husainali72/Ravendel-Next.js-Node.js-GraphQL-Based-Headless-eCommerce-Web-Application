import palette from "../palette";
import { colors } from "@mui/material";
export default {
  styleOverrides: {
    root: {
      tab: {
        color: palette.primary.main,
      },
      "&:hover": {
        backgroundColor: palette.primary.default,
        color: palette.primary.default,
      },
      "&.Mui-selected": {
        color: palette.primary.main,
        fontWeight: "550",
      },
    },
  },
};
