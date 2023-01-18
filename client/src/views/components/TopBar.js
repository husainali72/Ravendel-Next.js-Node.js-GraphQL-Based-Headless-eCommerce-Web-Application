import React from "react";
import { Grid, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import viewStyles from "../viewStyles.js";
import palette from "../../theme/palette.js";
import theme from "../../theme/index";

import { ThemeProvider } from "@mui/material/styles";

const TopBarTheme = ({ title, onSubmit, backLink, submitTitle }) => {
  const classes = viewStyles();

  return (
    <Grid container className="topbar">
      <Grid item lg={6} md={6} sm={6} xs={12} p={1}>
        <Typography variant="h5">
          <Link to={backLink}>
            <IconButton aria-label="Back">
              <ArrowBackIcon style={{ color: palette.text.secondary }} />
            </IconButton>
          </Link>

          {title}
        </Typography>
      </Grid>

      <Grid item lg={6} md={6} sm={6} xs={12} className="topbar-action">
        <Button
          color="primary"
          variant="contained"
          onClick={onSubmit}
          className={classes.addBtn}
        >
          {submitTitle}
        </Button>
        <Button className={classes.cancelBtn} variant="contained" color="error">
          <Link to={backLink} style={{ color: "#fff" }}>
            Cancel
          </Link>
        </Button>
      </Grid>
    </Grid>
  );
};

const TopBar = ({ title, onSubmit, backLink, submitTitle }) => {
  return (
    <ThemeProvider theme={theme}>
      <TopBarTheme
        title={title}
        onSubmit={onSubmit}
        submitTitle={submitTitle}
        backLink={backLink}
      />
    </ThemeProvider>
  );
};
export default TopBar;
