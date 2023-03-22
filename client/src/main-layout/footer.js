import React from "react";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import palette from "../theme/palette";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: "#e4e7ea",

    textAlign: "center",
  },
}));

const FooterComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body1">
        &copy; Copyright - 2020{" "}
        <a
          href="https://www.hbwebsol.com/"
          target="_blank"
          style={{ color: "#000" }}
        >
          HB WEBSOL
        </a>
      </Typography>
      <Typography variant="caption">All rights reserved</Typography>
    </div>
  );
};

const theme = createTheme(palette);
export default function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <FooterComponent />
    </ThemeProvider>
  );
}
