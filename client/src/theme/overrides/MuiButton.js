import palette from "../palette";
export default {
  styleOverrides: {
    root: ({ ownerState }) => ({
      ...(ownerState.variant === "contained" &&
        ownerState.color === "primary" && {
          backgroundColor: palette.primary.main,
          "&:hover": {
            backgroundColor: palette.primary.main,
          },
        }),
      ...(ownerState.variant === "contained" &&
        ownerState.color === "success" && {
          backgroundColor: palette.success.main,
          "&:hover": {
            backgroundColor: palette.primary.main,
          },
        }),
      ...(ownerState.variant === "check" &&
        ownerState.color === "primary" && {
          backgroundColor: palette.success.main,
          "&:hover": {
            backgroundColor: palette.success.main,
          },
        }),
      ...(ownerState.variant === "text" &&
        ownerState.color === "primary" && {
          color: palette.text.primary,
          "&:hover": {},
        }),
    }),
  },
};
