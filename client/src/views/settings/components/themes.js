import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Box,
  Button,
} from "@mui/material";
import viewStyles from "../../viewStyles";
import { useDispatch, useSelector } from "react-redux";
import NoImagePlaceholder from "../../../assets/images/no-image-placeholder.png";
import { getBaseUrl, isEmpty } from "../../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import { get } from "lodash";
import { appearanceThemeUpdateAction } from "../../../store/action";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";
import {
  validate,
} from "../../components/validate";
import { ALERT_SUCCESS } from "../../../store/reducers/alertReducer";
const ThemesComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [themeSetting, setThemeSetting] = useState({});
  useEffect(() => {
    if (!isEmpty(get(settingState,'settings.appearance.theme'))) {
      setThemeSetting({
        ...get(settingState, "settings.appearance.theme", {}),
      });
    }
  }, [get(settingState, "settings.appearance.theme")]);
  const updateTheme = () => {
    let errors = validate(
      ["playstore", "appstore", "hours"],
      themeSetting
    );
    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    } else {
      dispatch(appearanceThemeUpdateAction(themeSetting));
    }
  };
  const fileChange = (e) => {
    const files = get(e, "target.files", []);
    if (files?.length > 0) {
      themeSetting.logo = URL.createObjectURL(files[0]);
      themeSetting.new_logo = files;
    }

    setThemeSetting({ ...themeSetting });
  };

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
              value={get(themeSetting,'primary_color')}
              onChange={(e) =>
                setThemeSetting({
                  ...themeSetting,
                  primary_color: e.target.value,
                })
              }
            />
          </Box>
          <Box className={classes.themeLogoWrapper}>
            {get(themeSetting,'logo') ? (
              <img
                src={
                  get(themeSetting, 'logo')?.startsWith("blob")
                    ? get(themeSetting, "logo", "")
                    : getBaseUrl(settingState) + get(themeSetting, "logo", "")
                }
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
              value={get(themeSetting,'playstore')}
              onChange={(e) =>
                setThemeSetting({
                  ...themeSetting,
                  playstore:  get(e,'target.value'),
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
              value={get(themeSetting,'appstore')}
              onChange={(e) =>
                setThemeSetting({
                  ...themeSetting,
                  appstore: get(e,'target.value'),
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
