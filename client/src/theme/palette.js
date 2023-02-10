import { colors } from "@mui/material";

const white = "#FFFFFF";
const black = "#000000";

export default  {
  black,
  white,
  primary: {
    contrastText: white,
    dark: "#154050",
    main: "#154050",
    light: "#154050",
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue["A400"], 
    light: colors.blue["A400"],
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  failed: {
    contrastText: white,
    dark: "#A9294F",
    main: "#A9294F",
    light: "#A9294F",
  },
  outfordelivery: {
    contrastText: white,
    dark: "#FDB44B",
    main: "#FDB44B",
    light: "#FDB44B",
    width: "120px",
  },
  delivered: {
    contrastText: white,
    dark: "#00B7A8",
    main: "#00B7A8",
    light: "#00B7A8",
    width: "120px",
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
  },
  background: {
    default: "#F4F6F8",
    paper: white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};
