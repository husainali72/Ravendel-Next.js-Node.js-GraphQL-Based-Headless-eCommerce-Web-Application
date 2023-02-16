import React, { useState, useEffect } from "react";
import { Grid, TextField, Box, Button } from "@mui/material";
import viewStyles from "../../viewStyles";
import { useDispatch, useSelector } from "react-redux";
import NoImagePlaceholder from "../../../assets/images/no-image-placeholder.png";
import { bucketBaseURL } from "../../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import { get } from "lodash";
import { appearanceThemeUpdateAction } from "../../../store/action";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";
import PhoneNumber from "../../components/phoneNumberValidation";

const ThemesComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [themeSetting, setThemeSetting] = useState({});

  useEffect(() => {
    if (
      settingState.settings &&
      settingState.settings.appearance &&
      settingState.settings.appearance.theme
    ) {
      setThemeSetting({ ...settingState.settings.appearance.theme })
    }
  }, [get(settingState, "settings.appearance.theme")])

  const updateTheme = () => {

    delete theme.__typename;

    dispatch(appearanceThemeUpdateAction(themeSetting));
  };

  const fileChange = (e) => {
    themeSetting.logo = URL.createObjectURL(e.target.files[0]);
    themeSetting.new_logo = e.target.files
    setThemeSetting({ ...themeSetting })
  };
  const handleOnChange = (value) => {
    setThemeSetting({ ...themeSetting, ["phone_number"]: value })
  }

  return (
    <>
      <Alerts />
      {settingState.loading ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div">
            <TextField
              type="color"
              variant="outlined"
              label="Primary Color"
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
            {themeSetting.logo ? (
              <img
                src={themeSetting.logo.startsWith("blob") ? themeSetting.logo : bucketBaseURL + themeSetting.logo}
                className={classes.themeLogoBoxPreview}
                alt="img"
              />
            ) : (
              <img
                src={NoImagePlaceholder}
                className={classes.themeLogoBoxPreview}
                alt="Logo"
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
              {themeSetting.logo ? "Change Logo" : "Add Logo"}
            </label>
          </Box>
          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="Playstore url"
              className={classes.settingInput}
              value={themeSetting.playstore}
              onChange={(e) =>
                setThemeSetting({
                  ...themeSetting,
                  playstore: e.target.value,
                })
              }
            />
          </Box>

          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="Applestore url "
              className={classes.settingInput}
              value={themeSetting.appstore}
              onChange={(e) =>
                setThemeSetting({
                  ...themeSetting,
                  appstore: e.target.value,
                })
              }
            />
          </Box>

          <Box component="div" mb={3}>
            <PhoneNumber handleOnChange={handleOnChange} phoneValue={themeSetting.phone_number} width="300px" />
          </Box>
          <Box component="div">

            <TextField
              type="text"
              variant="outlined"
              label="Email"
              className={classes.settingInput}
              value={themeSetting.email}
              onChange={(e) =>
                setThemeSetting({
                  ...themeSetting,
                  email: e.target.value,
                })
              }
            />
          </Box>

        </Grid>
        <Grid item xs={12}>
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
    </>
  );
};

export default function Themes() {
  return (
    <ThemeProvider theme={theme}>
      <ThemesComponent />
    </ThemeProvider>
  );
}
