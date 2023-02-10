import palette from "../palette";
import typography from "../typography";

export default {
  styleOverrides: {
    root: ({ ownerState }) => ({
      ...(ownerState.variant === "contained" &&
        ownerState.color === "primary" && {
        backgroundColor: " #F4F6F8",
        fontWeight: "550",
        color: palette.primary.main,
      }),

      ...typography.body1,
      width: '200px',
      borderBottom: `1px solid ${palette.divider}`,
      textTransform: "capitalize",
      padding: "10px",
    }),
  },
};
