import React, { useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput } from "./setting-components/";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { get } from "lodash";
import theme from "../../../theme/index.js";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";
import { oneSignalUpdateAction } from "../../../store/action/settingAction";
const SellerComponent = () => {
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [onesignal, setOneSignal] = useState({ enable: false });
  useEffect(() => {
    if (get(settingState, "settings.notification.one_signal")) {
      setOneSignal({
        ...get(settingState, "settings.notification.one_signal"),
      });
    }
  }, [get(settingState, "settings")]);
  const updateOneSignal = () => {
    dispatch(oneSignalUpdateAction(onesignal));
  };
  return (
    <>
      <Alerts />
      {get(settingState, "loading") ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <Box component="div">
            <SettingTextInput
              label="APP ID"
              value={get(onesignal, "app_id")}
              onSettingInputChange={(val) =>
                setOneSignal({ ...onesignal, app_id: val })
              }
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              label="API Key"
              value={get(onesignal, "rest_api_key")}
              onSettingInputChange={(val) =>
                setOneSignal({ ...onesignal, rest_api_key: val })
              }
              type="password"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateOneSignal}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function Seller() {
  return (
    <ThemeProvider theme={theme}>
      <SellerComponent />
    </ThemeProvider>
  );
}
