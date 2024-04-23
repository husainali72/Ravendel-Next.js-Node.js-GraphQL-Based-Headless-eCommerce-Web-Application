import React, {useState } from "react";
import { Grid, Box, Button, } from"@mui/material";
import { storeAddressUpdateAction } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import {get} from "lodash";
import { useEffect } from "react";
import { SettingTextInput } from "./setting-components";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import Alerts from "../../components/Alert.js";
import Loading from "../../components/Loading.js";

const StoreAddressComponent = () => {
  const settingState = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [address, setAddress] = useState({});

  useEffect(() => {
      setAddress({...get(settingState,'settings.store.store_address')})

  }, [get(settingState, "settings")])

  const updateStoreAddress = () => {
    dispatch(storeAddressUpdateAction(address));
  };

  return (
    <>
     <Alerts/>
     {settingState.loading ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div">
            <SettingTextInput
              value={get(address,'addressLine1')}
              label="Address line 1"
              onSettingInputChange={(val) => {
                setAddress({ ...address, addressLine1: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={get(address,'addressLine2')}
              label="Address line 2"
              onSettingInputChange={(val) => {
                setAddress({ ...address, addressLine2: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={get(address,'city')}
              label="City"
              onSettingInputChange={(val) => {
                setAddress({ ...address, city: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={get(address,'state')}
              label="State"
              onSettingInputChange={(val) => {
                setAddress({ ...address, state: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={get(address,'country')}
              label="Country"
              onSettingInputChange={(val) => {
                setAddress({ ...address, country: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={get(address,'zip')}
              label="Postcode / ZIP"
              onSettingInputChange={(val) => {
                setAddress({ ...address, zip: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={get(address,'hour')}
              label="Hour"
              onSettingInputChange={(val) => {
                setAddress({ ...address, hour: val });
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
