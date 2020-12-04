import React from "react";
import { Grid, Button, IconButton, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import viewStyles from "../viewStyles.js";

const TopBar = ({ title, onSubmit, backLink, submitTitle }) => {
  const classes = viewStyles();

  return (
    <Grid container className="topbar">
      <Grid item lg={6} md={6} sm={6} xs={12}>
        <Typography variant="h4">
          <Link to={backLink}>
            <IconButton aria-label="Back">
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <span style={{ paddingTop: 10 }}>{title}</span>
        </Typography>
      </Grid>

      <Grid item lg={6} md={6} sm={6} xs={12} className="topbar-action">
        <Button color="primary" variant="contained" onClick={onSubmit}>
          {submitTitle}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.cancelBtn}
        >
          <Link to={backLink} style={{ color: "#fff" }}>
           Cancel
          </Link>
        </Button>
      </Grid>
    </Grid>
  );
};

export default TopBar;
