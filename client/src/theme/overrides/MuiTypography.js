import typography from "../typography";
import palette from "../palette";
export default {
  styleOverrides: {
    root: ({ ownerState }) => ({
      ...(ownerState.variant === "h5" && {
        color: palette.text.main,
        fontWeight: typography.h3.fontWeight,
        letterSpacing: typography.h3.letterSpacing,
        lineHeight: typography.h3.lineHeight,
        fontSize: typography.h3.fontSize,
      }),

      ...(ownerState.variant === "body1" && {
        color: palette.text.main,
        fontWeight: typography.h4.fontWeight,
        letterSpacing: typography.h4.letterSpacing,
        lineHeight: typography.h4.lineHeight,
        fontSize: typography.h4.fontSize,
      }),
    }),
  },
};
