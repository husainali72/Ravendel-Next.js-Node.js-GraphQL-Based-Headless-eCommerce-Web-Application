import React, { Fragment, useEffect, useState } from "react";
import { Grid, TextField, Box, Button } from"@mui/material";
import viewStyles from "../../viewStyles";
import { appearanceThemeUpdateAction } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import NoImagePlaceholder from "../../../assets/images/no-image-placeholder.png";
import { bucketBaseURL } from "../../../utils/helper";

const Themes = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [themeSetting, setThemeSetting] = useState({
    ...settingState.settings.appearance.theme,
  });
  const [logoImage, setLogoImage] = useState(bucketBaseURL + themeSetting.logo.original)
  // console.log("setting", themeSetting)

  const fileChange = (e) => {
    themeSetting.logo.original = URL.createObjectURL(e.target.files[0]);
    // console.log("--set", themeSetting.logo.original)

    themeSetting.new_logo = e.target.files;
    setThemeSetting({
      ...themeSetting,
      new_logo: themeSetting.new_logo,
    });
    setLogoImage(URL.createObjectURL(e.target.files[0]))
  };
  // console.log("--set", themeSetting.logo.original)

  const updateTheme = () => {
    // console.log(themeSetting);
    // dispatch(appearanceThemeUpdateAction(themeSetting));
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component='div'>
            <TextField
              type='color'
              variant='outlined'
              label='Primary Color'
              className={classes.settingInput}
              value={themeSetting.primary_color}
              onChange={(e) =>
                setThemeSetting({
                  ...themeSetting,
                  primary_color: e.target.value,
                })
              }
            />
          </Box>
          <Box className={classes.themeLogoWrapper}>
            {themeSetting.logo.original ? (
              <img
                src={logoImage}
                className={classes.themeLogoBoxPreview}
                alt='Logo'
              />
            ) : (
              <img
                src={NoImagePlaceholder}
                className={classes.themeLogoBoxPreview}
                alt='Logo'
              />
            )}
            <input
              accept='image/*'
              className={classes.input}
              style={{ display: "none" }}
              id='logo'
              name='logo'
              type='file'
              onChange={(e) => fileChange(e)}
            />
            <label htmlFor='logo' className={classes.feautedImage}>
              {themeSetting.logo.original ? "Change Logo" : "Add Logo"}
            </label>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            size='small'
            color='primary'
            variant='contained'
            onClick={updateTheme}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Themes;
