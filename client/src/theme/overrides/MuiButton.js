import palette from "../palette";
export default {
<<<<<<< HEAD
  
    contained: {
      boxShadow:
        '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
      backgroundColor: '#FFFFFF'}
    
  };
=======
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
>>>>>>> dcfef4b9dc5b378cdc4be3a6a997f06bb3a26e09
