import typography from "../typography";
import palette from "../palette";
export default {
  styleOverrides: {
    root: {
      color: palette.primary.main,
      "&.Mui-checked": {
        color: palette.primary.main,
      },
    },
  },
};
