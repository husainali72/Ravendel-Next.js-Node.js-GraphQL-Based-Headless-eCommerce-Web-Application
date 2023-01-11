import typography from "../typography";
import palette from "../palette";
export default {
  styleOverrides: {
    input: {
      color: typography.body1.color,
      fontSize: typography.body1.fontSize,
      letterSpacing: typography.body1.letterSpacing,
      lineHeight: typography.body1.lineHeight,
      "&::placeholder": {
        color: typography.body1.color,
        fontSize: typography.body1.fontSize,
        letterSpacing: typography.body1.letterSpacing,
        lineHeight: typography.body1.lineHeight,
      },
    },
  },
};
