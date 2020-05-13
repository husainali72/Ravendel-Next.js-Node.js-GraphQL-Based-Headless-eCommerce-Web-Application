import React, { Fragment, useState } from "react";
import { Grid, TextField, Box, Button, Typography } from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";
import { storeAddressUpdateAction } from "../../../store/action";
import { connect } from "react-redux";

const StoreAddress = (props) => {
  const classes = viewStyles();
  const [address, setAddress] = useState({
    ...props.settingState.settings.store.store_address,
  });

  const updateStoreAddress = () => {
    props.storeAddressUpdateAction(address);
  };

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
              value={address.address_line1}
              onChange={(e) =>
                setAddress({ ...address, address_line1: e.target.value })
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
              value={address.address_line2}
              onChange={(e) =>
                setAddress({ ...address, address_line2: e.target.value })
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
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
          </Box>
          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="Country"
              className={clsx(classes.settingInput)}
              size="small"
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
            />
          </Box>

          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="State"
              className={clsx(classes.settingInput)}
              size="small"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
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
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateStoreAddress}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { settingState: state.settings };
};

const mapDispatchToProps = {
  storeAddressUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreAddress);
