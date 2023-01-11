import React from "react";
import { Grid, Button, IconButton, Typography } from"@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import viewStyles from "../viewStyles.js";
import MuiButton from "../../theme/overrides/MuiButton.js";
import typography from "../../theme/typography.js";
import palette from "../../theme/palette.js";
// import "./App.css";
const TopBar = ({ title, onSubmit, backLink, submitTitle }) => {
  const classes = viewStyles();

  return (
    <Grid container className="topbar"
      // style={{backgroundColor: MuiButton.contained.backgroundColor , boxShadow: MuiButton.contained.boxShadow}}
      >
      <Grid item lg={6} md={6} sm={6} xs={12}>
        {/* <Typography variant="h6"> */}
          <Link to={backLink} >
            <IconButton aria-label="Back">
              <ArrowBackIcon style={{color: palette.text.secondary}} />
            </IconButton>
          </Link>
          <span >{title}</span>
        {/* </Typography> */}
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
          <Link to={backLink} style={{ color: "#fff"}}>
           Cancel
          </Link>
        </Button>
      </Grid>
    </Grid>
  );
};

export default TopBar;
