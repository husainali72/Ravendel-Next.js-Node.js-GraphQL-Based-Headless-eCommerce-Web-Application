import palette from "../palette";
import typography from "../typography";

export default {
  styleOverrides: {
    root: ({ ownerState }) => ({
      ...(ownerState.variant === "contained" &&
        ownerState.color === "primary" && {
          backgroundColor: " #F4F6F8",
        }),

      ...typography.body1,
      borderBottom: `1px solid ${palette.divider}`,

      padding: "10px",
    }),
  },
};
