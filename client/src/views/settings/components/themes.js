import React, { Fragment, useState } from "react";
import { Grid, TextField, Box, Button } from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";

const Themes = props => {
  const classes = viewStyles();
  const [themeSetting, setThemeSetting] = useState({
    primary_color: "#154050"
  });
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
              onChange={e =>
                setThemeSetting({
                  ...themeSetting,
                  primary_color: e.target.value
                })
              }
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

export default Themes;
