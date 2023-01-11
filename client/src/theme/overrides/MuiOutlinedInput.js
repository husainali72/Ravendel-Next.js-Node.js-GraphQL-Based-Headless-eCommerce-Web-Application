import palette from "../palette";
import typography from "../typography";
export default {
  styleOverrides: {
    root: {
      borderColor: "red",

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: typography.body1.color,
      },

      "&:hover $notcheckedOutline": {
        borderColor: "red",
      },
      "&.MuiInputBase-multiline": {
        borderColor: "red",
        padding: 1,
      },
    },
    input: {
      fontWeight: 500,
      background: palette.text.default,
      padding: "15.5px 14px",
      borderRadius: "5px",
      "&.MuiInputBase-inputSizeSmall": {
        padding: "10px 14px",
        "&.MuiInputBase-inputAdornedStart": {
          paddingLeft: 0,
        },
      },
    },
  },
};
