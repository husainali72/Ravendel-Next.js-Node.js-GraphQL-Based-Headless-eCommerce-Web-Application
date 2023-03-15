import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import viewStyles from "../../viewStyles.js";
import TimeZones from "./timeZones";
import Autocomplete from "@mui/material/Autocomplete";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import { generalUpdateAction, getDatesAction } from "../../../store/action/settingAction.js";
import Alerts from "../../components/Alert.js"
import Loading from "../../components/Loading.js";
const GeneralTheme = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [timeZone, setTimeZone] = useState(null);
  const [general, setgeneral] = useState({
    date_format: settingState.settings.general.date_format,
    time_zone: settingState.settings.general.time_zone,
  });
  useEffect(() => {
    if (general.time_zone === null) {
      setTimeZone(-1);
    } else {
      let timeIndex = TimeZones.findIndex((tz) => tz.value === general.time_zone)
      setTimeZone(timeIndex);
    }
    dispatch(getDatesAction())
  }, [get(settingState, "settings.general")]);


  const changeTimeZone = (val, e) => {
    if (val == null) {
      setgeneral({ ...general, time_zone: null });
    }
    else {
      let timeIndex = TimeZones.findIndex((tz) => tz.value === val.value)
      setTimeZone(timeIndex);
      setgeneral({ ...general, time_zone: val.value });
    }
  };

  const updateGenral = () => {
    dispatch(generalUpdateAction(general));
  };
  return (
    <>
      <Alerts />
      {settingState.loading ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Box component="div" className={classes.marginBottom2}>
            <FormControl component="fieldset">
              <FormLabel component="legend" className={classes.marginBottom1}>
                <Typography variant="h5">Date Format</Typography>
              </FormLabel>
              <RadioGroup
                aria-label="Format"
                name="dates"
                value={general.date_format}
                onChange={(e) => {
                  setgeneral({ ...general, date_format: e.target.value })
                }
                }
              >
                {settingState.date_formats.map((format) => (
                  <FormControlLabel
                    key={format.id}
                    value={format.id}
                    control={<Radio color="primary" size="small" />}
                    label={format.value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          {timeZone ?
            <Box component="div" className={classes.marginBottom2}>
              <Typography variant="h5" className={classes.marginBottom2}>
                Time Zone
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={TimeZones}
                getOptionLabel={(option) => option.name}
                value={TimeZones[timeZone]}
                sx={{ width: 300 }}
                onChange={(event, value) =>
                  changeTimeZone(value)}
                renderInput={(params) => <TextField {...params} label="Select Timezone" />}
              />
            </Box>
            : null}

        </Grid>
        <Grid item md={12} xs={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateGenral}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function General() {
  return (
    <ThemeProvider theme={theme}>
      <GeneralTheme />
    </ThemeProvider>
  );
}
