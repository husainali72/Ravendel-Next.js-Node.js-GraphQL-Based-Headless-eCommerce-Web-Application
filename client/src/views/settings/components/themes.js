import React, { Fragment, useState } from "react";
import { Grid, TextField, Box, Button } from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";

import { appearanceThemeUpdateAction } from "../../../store/action";
import { connect } from "react-redux";
import { isEmpty } from "../../../utils/helper";

const Themes = (props) => {
  const classes = viewStyles();
  const [themeSetting, setThemeSetting] = useState({
    ...props.settingState.settings.appearance.theme,
  });

  const fileChange = (e) => {
    themeSetting.logo.original = URL.createObjectURL(e.target.files[0]);

    themeSetting.new_logo = e.target.files;
    setThemeSetting({
      ...themeSetting,
      new_logo: themeSetting.new_logo,
    });
    //console.log(slider);
  };

  const updateTheme = () => {
    console.log(themeSetting);
    props.appearanceThemeUpdateAction(themeSetting);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box component="div">
            <TextField
              type="color"
              variant="outlined"
              label="Primary Color"
              className={clsx(classes.settingInput)}
              value={themeSetting.primary_color}
              onChange={(e) =>
                setThemeSetting({
                  ...themeSetting,
                  primary_color: e.target.value,
                })
              }
            />
          </Box>
          <Box className={classes.sliderImagePreviewWrapper}>
            {themeSetting.logo.original && (
              <img
                src={themeSetting.logo.original}
                className={classes.sliderImagePreview}
                alt="Featured"
              />
            )}
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: "none" }}
              id="logo"
              name="logo"
              type="file"
              onChange={(e) => fileChange(e)}
            />
            <label htmlFor="logo" className={classes.feautedImage}>
              {themeSetting.logo.original ? "Change Logo" : "Add Logo"}
            </label>
          </Box>
        </Grid>
        <Grid item md={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateTheme}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { settingState: state.settings };
};

const mapDispatchToProps = {
  appearanceThemeUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Themes);
