import React, { Fragment, useState } from "react";
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
  Button
} from "@material-ui/core";
import viewStyles from "../../viewStyles.js";
import TimeZones from "./timeZones";
import Autocomplete from "@material-ui/lab/Autocomplete";

const General = props => {
  const classes = viewStyles();
  const [dateFormat, setDateFormat] = useState("March 19, 2020");
  const [timeZone, setTimeZone] = useState(15);

  const changeTimeZone = val => {
    var getIndex = TimeZones.findIndex(timezone => timezone === val);
    setTimeZone(getIndex);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box component="div" className={classes.marginBottom2}>
            <FormControl component="fieldset">
              <FormLabel component="legend" className={classes.marginBottom1}>
                <Typography variant="h5">Date Format</Typography>
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={dateFormat}
                onChange={e => setDateFormat(e.target.value)}
              >
                <FormControlLabel
                  value="March 19, 2020"
                  control={<Radio color="primary" size="small" />}
                  label="March 19, 2020"
                />
                <FormControlLabel
                  value="2020-03-19"
                  control={<Radio color="primary" size="small" />}
                  label="2020-03-19"
                />
                <FormControlLabel
                  value="03/19/2020"
                  control={<Radio color="primary" size="small" />}
                  label="03/19/2020"
                />
                <FormControlLabel
                  value="19/03/2020"
                  control={<Radio color="primary" size="small" />}
                  label="19/03/2020"
                />
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
              getOptionLabel={option => option.name}
              style={{ width: 300 }}
              defaultValue={TimeZones[timeZone]}
              onChange={(event, value) => changeTimeZone(value)}
              renderInput={params => (
                <TextField {...params} variant="outlined" />
              )}
            />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Button size="small" color="primary" variant="contained">
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default General;
