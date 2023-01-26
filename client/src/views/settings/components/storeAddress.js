import React, { Fragment, useState } from "react";
import { Grid, TextField, Box, Button, Typography } from"@mui/material";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";
import { storeAddressUpdateAction } from "../../../store/action";

import { useDispatch, useSelector } from "react-redux";
import {get} from "lodash";
import { useEffect } from "react";

import { SettingTextInput } from "./setting-components";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../../../theme/index.js";
import Alerts from "../../components/Alert.js";
const StoreAddressComponent = () => {
  const settingState = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [address, setAddress] = useState({
    ...settingState.settings.store.store_address,
  });

  useEffect(() => {
    get(settingState, "settings.store.store_address")
    }, [settingState.settings])

  const updateStoreAddress = () => {
    dispatch(storeAddressUpdateAction(address));
  };

  return (
    <>
     <Alerts/>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div">
            <SettingTextInput
              value={address.address_line1}
              label="Address line 1"
              onSettingInputChange={(val) => {
                setAddress({ ...address, address_line1: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={address.address_line2}
              label="Address line 2"
              onSettingInputChange={(val) => {
                setAddress({ ...address, address_line2: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={address.city}
              label="City"
              onSettingInputChange={(val) => {
                setAddress({ ...address, city: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={address.state}
              label="State"
              onSettingInputChange={(val) => {
                setAddress({ ...address, state: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={address.country}
              label="Country"
              onSettingInputChange={(val) => {
                setAddress({ ...address, country: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={address.zip}
              label="Postcode / ZIP"
              onSettingInputChange={(val) => {
                setAddress({ ...address, zip: val });
              }}
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
    </>
  );
};

export default function StoreAddress() {
  return (
    <ThemeProvider theme={theme}>
      <StoreAddressComponent />
    </ThemeProvider>
  );
}
