import palette from "../palette";
import { colors } from "@mui/material";
export default {
  styleOverrides: {
    root: {
      "&$selected": {
        backgroundColor: palette.background.default,
      },
      "&$hover": {
        "&:hover": {
          backgroundColor: palette.background.default,
        },
      },
    },
  },
};
