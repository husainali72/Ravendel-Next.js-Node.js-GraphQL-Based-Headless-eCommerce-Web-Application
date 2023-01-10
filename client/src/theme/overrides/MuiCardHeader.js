import typography from "../typography";
import palette from "../palette";
export default {
  styleOverrides: {
    root: {},
    title: {
      color: palette.text.main,
      fontWeight: typography.h5.fontWeight,
      letterSpacing: typography.h5.letterSpacing,
      lineHeight: typography.h5.lineHeight,
      fontSize: typography.h5.fontSize,
    },
  },
};
