import React, { useState } from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import { storeAddressUpdateAction } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { useEffect } from "react";
import { SettingTextInput } from "./setting-components";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import Alerts from "../../components/Alert.js";
import Loading from "../../components/Loading.js";
import viewStyles from "../../viewStyles.js";
import PhoneNumber from "../../components/phoneNumberValidation.js";
import SocialMedia from "./socialmedialinks.js";
import { menuItem } from "./setting-components/constant.js";
import {  validatenested } from "../../components/validate";
import { isEmpty } from "../../../utils/helper.js";
import { ALERT_SUCCESS } from "../../../store/reducers/alertReducer.js";

const StoreAddressComponent = () => {
  const settingState = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [address, setAddress] = useState({});
  const classes = viewStyles();
  const [social_media, setSocialMedia] = React.useState([]);
  useEffect(() => {
    setAddress({ ...get(settingState, "settings.store.store_address") });
    setSocialMedia(
      get(settingState, "settings.store.store_address.social_media", [])
    );
  }, [get(settingState, "settings")]);

  const updateStoreAddress = () => {
    if (address) {
      let payload = { ...address, social_media };
      if (get(payload,'social_media') && get(payload,'social_media')?.length > 0) {
        get(payload,'social_media')?.forEach((item) => {
          delete item.__typename;
        });
      }
      delete payload.__typename;

      let nested_validation = validatenested("social_media", ["handle"],payload);
      if (!isEmpty(nested_validation)) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: false,
            message: nested_validation,
            error: true,
          },
        });
      }else{
      dispatch(storeAddressUpdateAction(payload));
      }
    }
  };
  const selectHandleChange = (e) => {
    let obj = get(e,'target.value');
    setSocialMedia(obj);
  };
  const removeInput = (i) => {
    let data = social_media;
    data.splice(i, 1);
    setSocialMedia([...data]);
  };
  const LinkhandleChange = (e, i) => {
    social_media[i].handle =get(e,'target.value');
    setSocialMedia([...social_media]);
  };
  return (
    <>
      <Alerts />
      {get(settingState, "loading") ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div">
            <SettingTextInput
              value={get(address, "addressLine1")}
              label="Address line 1"
              otherClass={classes.marginRight2}
              onSettingInputChange={(val) => {
                setAddress({ ...address, addressLine1: val });
              }}
            />
            <SettingTextInput
              value={get(address, "email")}
              label="Email"
              onSettingInputChange={(val) => {
                setAddress({ ...address, email: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={get(address, "addressLine2")}
              label="Address line 2"
              otherClass={classes.marginRight2}
              onSettingInputChange={(val) => {
                setAddress({ ...address, addressLine2: val });
              }}
            />
            <PhoneNumber
              className="phoneValidation"
              handleOnChange={(val) => {
                setAddress({ ...address, phone_number: val });
              }}
              phoneValue={get(address, "phone_number")}
              width="300px"
            />
          </Box>
          <Box component="div" className={classes.socialMediaContainer}>
            <Box>
              <SettingTextInput
                value={get(address, "city")}
                label="City"
                otherClass={classes.marginRight2}
                onSettingInputChange={(val) => {
                  setAddress({ ...address, city: val });
                }}
              />
            </Box>
            <Box>
              {}
              <SocialMedia
                onhandleChange={selectHandleChange}
                removeInput={removeInput}
                handleChange={LinkhandleChange}
                menuItem={menuItem}
                selectedIcons={social_media}
              />
            </Box>
          </Box>
          <Box component="div">
            <SettingTextInput
              value={get(address, "state")}
              label="State"
              onSettingInputChange={(val) => {
                setAddress({ ...address, state: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={get(address, "country")}
              label="Country"
              onSettingInputChange={(val) => {
                setAddress({ ...address, country: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={get(address, "zip")}
              label="Postcode / ZIP"
              onSettingInputChange={(val) => {
                setAddress({ ...address, zip: val });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={get(address, "hour")}
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
