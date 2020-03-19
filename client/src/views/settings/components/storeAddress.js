import React, { Fragment, useState } from "react";
import { Grid, TextField, Box, Button, Typography } from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";

const StoreAddress = props => {
  const classes = viewStyles();
  const [address, setAddress] = useState({
    addressLineFirst: "",
    addressLineSecond: "",
    city: "",
    country: "",
    zip: ""
  });
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Typography variant="h5" className={classes.paddingBottom1}>
            Store Address
          </Typography>
          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="Address line 1"
              className={clsx(classes.settingInput)}
              size="small"
              value={address.addressLineFirst}
              onChange={e =>
                setAddress({ ...address, addressLineFirst: e.target.value })
              }
            />
          </Box>
          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="Address line 2"
              className={clsx(classes.settingInput)}
              size="small"
              value={address.addressLineSecond}
              onChange={e =>
                setAddress({ ...address, addressLineSecond: e.target.value })
              }
            />
          </Box>
          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="City"
              className={clsx(classes.settingInput)}
              size="small"
              value={address.city}
              onChange={e => setAddress({ ...address, city: e.target.value })}
            />
          </Box>
          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="Country / State"
              className={clsx(classes.settingInput)}
              size="small"
              value={address.country}
              onChange={e =>
                setAddress({ ...address, country: e.target.value })
              }
            />
          </Box>
          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="Postcode / ZIP"
              className={clsx(classes.settingInput)}
              size="small"
              value={address.zip}
              onChange={e => setAddress({ ...address, zip: e.target.value })}
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

export default StoreAddress;
