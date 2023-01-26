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
import Alerts from "../../components/Alert.js";
export const GeneralTheme = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [timeZone, setTimeZone] = useState(null);
  const [general, setgeneral] = useState({
    date_format: settingState.settings.general.date_format,
    time_zone: settingState.settings.general.time_zone,
  });

//   useEffect(() => {
// dispatch(getDatesAction());

// get (settingState, "settings.general.date_format")
//   }, [settingState.settings]);

  useEffect(() => {
    let timezzz = TimeZones.findIndex((tz) => tz.value === general.time_zone)
    setTimeZone(timezzz);
    dispatch(getDatesAction())
  }, [settingState.settings.general]);

  const changeTimeZone = (val, e) => {
    setgeneral({...general, time_zone: val.value});
  };

  const updateGenral = () => {
    dispatch(generalUpdateAction(general));
  };

  return (
    <>
     <Alerts/>
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
                onChange={(e) =>
                  setgeneral({ ...general, date_format: e.target.value })
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
             id="combo-box-demo"
             options={TimeZones}
             getOptionLabel={(option) => option.name}
             style={{ width: 300 }}
             defaultValue={TimeZones[timeZone]}
             onChange={(event, value) => changeTimeZone(value)}
             renderInput={(params) => (
               <TextField {...params} variant="outlined" />
             )}
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
