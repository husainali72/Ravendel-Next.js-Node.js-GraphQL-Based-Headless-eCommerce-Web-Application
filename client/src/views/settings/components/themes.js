import React, { useState, useEffect } from "react";
import { Grid, TextField, Box, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import viewStyles from "../../viewStyles";
import { useDispatch, useSelector } from "react-redux";
import NoImagePlaceholder from "../../../assets/images/no-image-placeholder.png";
import { bucketBaseURL, getBaseUrl, isEmpty } from "../../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import { get } from "lodash";
import { appearanceThemeUpdateAction } from "../../../store/action";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";
import PhoneNumber from "../../components/phoneNumberValidation";
import { validatePhone, validate, validatenested } from "../../components/validate";
import { ALERT_SUCCESS } from "../../../store/reducers/alertReducer";
import SocialMedia from "./socialmedialinks";
const ThemesComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [themeSetting, setThemeSetting] = useState({});
  const [social_media, setSocialMedia] = React.useState([]);
  const menuItem = ([
    { name: 'instagram', handle: '' },
    { name: 'facebook', handle: '' },
    { name: 'twitter', handle: '' },
    { name: 'youtube', handle: '' },
  ])
  useEffect(() => {
    if (!isEmpty(get(settingState.settings.appearance, 'theme'))) {
      setThemeSetting({ ...settingState.settings.appearance.theme })
      setSocialMedia([...settingState.settings.appearance.theme.social_media])
      setSocialMedia(settingState.settings.appearance.theme.social_media)
    }
  }, [get(settingState, "settings.appearance.theme")])
  const updateTheme = () => {
    themeSetting.social_media = social_media
    for (let i in themeSetting.social_media) {
      delete themeSetting.social_media[i].__typename;
    }
    delete theme.__typename;
    let errors = validate(['playstore', "appstore", "email", 'hours'], themeSetting);
    let phoneNumberError = validatePhone(["phone_number"], themeSetting)
    let nested_validation = validatenested("social_media", ["handle"], themeSetting);
    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }
    else if (!isEmpty(phoneNumberError)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: phoneNumberError,
          error: true,
        },
      });
    }
    else if (!isEmpty(nested_validation)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: nested_validation,
          error: true,
        },
      });
    }

    else {
      dispatch(appearanceThemeUpdateAction(themeSetting));
    }
  };
  const fileChange = (e) => {
    const files = get(e, 'target.files', []);
    if (files.length>0) {
    themeSetting.logo = URL.createObjectURL(files[0]);
    themeSetting.new_logo = files  
  }
  
    setThemeSetting({ ...themeSetting })
  };
  const handleOnChange = (value) => {
    setThemeSetting({ ...themeSetting, ["phone_number"]: value })
  }
  const LinkhandleChange = (e, i) => {
    social_media[i].handle = e.target.value;
    setSocialMedia([...social_media]);
  }
  const selectHandleChange = (e) => {
    let obj = e.target.value;
    setSocialMedia(obj);

  };
  const removeInput = (i) => {
    let data = social_media
    data.splice(i, 1)
    setSocialMedia([...data])
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
                src={themeSetting.logo.startsWith("blob") ? themeSetting.logo : getBaseUrl(settingState) + themeSetting.logo}
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
            <PhoneNumber
              handleOnChange={handleOnChange}
              phoneValue={themeSetting.phone_number}
              width="300px" />
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
          <Box component="div" mb={3}>

            <SocialMedia
              onhandleChange={selectHandleChange}
              removeInput={removeInput}
              handleChange={LinkhandleChange}
              menuItem={menuItem}
              selectedIcons={social_media} />
          </Box>
        </Grid >
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
      </Grid >
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
