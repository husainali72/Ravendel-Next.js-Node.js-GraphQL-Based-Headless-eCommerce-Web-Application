import React, { Fragment, useState, useEffect } from "react";
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
} from "@material-ui/core";
import viewStyles from "../../viewStyles.js";
import TimeZones from "./timeZones";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getDatesAction, generalUpdateAction } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";

const General = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector(state => state.settings);
  const [timeZone, setTimeZone] = useState(15);
  const [general, setgeneral] = useState({
    date_format: settingState.settings.general.date_format,
  });

  useEffect(() => {
    dispatch(getDatesAction());
  }, []);

  const changeTimeZone = (val) => {
    setgeneral({ ...general, time_zone: val.value });
  };

  const updateGenral = () => {
    dispatch(generalUpdateAction(general));
  };

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default General;
