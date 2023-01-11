import palette from "../palette";
import typography from "../typography";

export default {
  styleOverrides: {
<<<<<<< HEAD
  root: {
    ...typography.body1,
    borderBottom: `1px solid ${palette.divider}`
  }}
=======
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
>>>>>>> dcfef4b9dc5b378cdc4be3a6a997f06bb3a26e09
};
