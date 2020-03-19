import React, { Fragment, useState } from "react";
import {
  Grid,
  FormControl,
  Box,
  Button,
  Select,
  Typography
} from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";

const Measurements = props => {
  const classes = viewStyles();
  const [measurementVal, setMeasurementVal] = useState({
    weight: "kg",
    dimensions: "cm"
  });
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5" className={classes.paddingBottom1}>
              Weight unit
            </Typography>
            <FormControl variant="outlined" size="small">
              <Select
                native
                value={measurementVal.weight}
                onChange={e =>
                  setMeasurementVal({
                    ...measurementVal,
                    weight: e.target.value
                  })
                }
                inputProps={{
                  name: "stock-display-format",
                  id: "stock-display-format"
                }}
                className={classes.simpleSettingInput}
              >
                <option value={"kg"}>kg</option>
                <option value={"g"}>g</option>
                <option value={"lbs"}>lbs</option>
                <option value={"oz"}>oz</option>
              </Select>
            </FormControl>
          </Box>
          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5" className={classes.paddingBottom1}>
              Dimensions unit
            </Typography>
            <FormControl variant="outlined" size="small">
              <Select
                native
                onChange={e =>
                  setMeasurementVal({
                    ...measurementVal,
                    dimensions: e.target.value
                  })
                }
                inputProps={{
                  name: "stock-display-format",
                  id: "stock-display-format"
                }}
                className={classes.simpleSettingInput}
              >
                <option value={"m"}>m</option>
                <option value={"cm"}>cm</option>
                <option value={"mm"}>mm</option>
                <option value={"in"}>in</option>
                <option value={"yd"}>yd</option>
                <option value={"cm"}>cm</option>
              </Select>
            </FormControl>
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

export default Measurements;
