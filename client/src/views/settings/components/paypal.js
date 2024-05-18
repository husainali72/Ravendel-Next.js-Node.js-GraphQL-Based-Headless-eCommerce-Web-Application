import React, { useState } from "react";
import { Grid, Box, FormControlLabel, Checkbox, Button } from "@mui/material";
import viewStyles from "../../viewStyles";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput } from "./setting-components/";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { get } from "lodash";
import theme from "../../../theme/index.js";
import { paymentPaypalUpdateAction } from "../../../store/action";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";
import ToggleSwitch from "../../components/switch.js";
import { getValue } from "../../../utils/helper.js";
import SettingTextArea from "./setting-components/setting-textArea.js";

const PaypalComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [paypalInfo, setPaypalInfo] = useState({ enable: false });

  useEffect(() => {
    setPaypalInfo({ ...get(settingState, "settings.payment.paypal", {}) });
  }, [get(settingState, "settings")]);

  const updatePaypal = () => {
    dispatch(paymentPaypalUpdateAction(paypalInfo));
  };

  return (
    <>
      <Alerts />
      {get(settingState, "loading") ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <Box component="div" className={classes.marginBottom2}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={get(paypalInfo, "enable")}
                  onChange={(e) =>
                    setPaypalInfo({
                      ...paypalInfo,
                      enable: get(e, "target.checked"),
                    })
                  }
                />
              }
              label="Enable PayPal"
            />
          </Box>
          {get(paypalInfo, "enable") && (
            <Box component="div">
              <Box component="div">
                <SettingTextInput
                  label="Title"
                  value={get(paypalInfo, "title")}
                  onSettingInputChange={(val) =>
                    setPaypalInfo({ ...paypalInfo, title: val })
                  }
                />
              </Box>

              <Box component="div">
                <SettingTextArea
                  label="Description"
                  placeholder="Description"
                  value={get(paypalInfo, "description")}
                  onSettingInputChange={(e) => {
                    setPaypalInfo({
                      ...paypalInfo,
                      description: get(e, "target.value"),
                    });
                  }}
                  minRows={3}
                  className={classes.settingTextArea}
                />
              </Box>
            </Box>
          )}
        </Grid>

        {/* ===================SandBox ANd Live=================== */}

        {get(paypalInfo, "enable") && (
          <>
            <Grid item md={6} sm={12} xs={12}>
              <Box component="div" className={classes.marginBottom2}>
                <ToggleSwitch
                  color="primary"
                  checked={get(paypalInfo, "test_mode", false)}
                  onChange={(e) =>
                    setPaypalInfo({
                      ...paypalInfo,
                      test_mode: get(e, "target.checked"),
                    })
                  }
                />
              </Box>
              <Box component="div">
                <SettingTextInput
                  label="Sandbox Client Id"
                  name="sandbox_client_id"
                  value={getValue(get(paypalInfo, "sandbox_client_id", ""))}
                  onSettingInputChange={(val, name) => {
                    setPaypalInfo({ ...paypalInfo, [name]: val });
                  }}
                  type="password"
                />
              </Box>
              <Box component="div">
                <SettingTextInput
                  label="Live Client Id"
                  name="live_client_id"
                  value={getValue(get(paypalInfo, "live_client_id", ""))}
                  onSettingInputChange={(val, name) => {
                    setPaypalInfo({ ...paypalInfo, [name]: val });
                  }}
                  type="password"
                />
              </Box>
              <Box component="div">
                <SettingTextInput
                  label="Sandbox Secret Key"
                  value={getValue(get(paypalInfo, "sandbox_secret_key", ""))}
                  name="sandbox_secret_key"
                  onSettingInputChange={(val, name) =>
                    setPaypalInfo({ ...paypalInfo, [name]: val })
                  }
                  type="password"
                />
              </Box>
              <Box component="div">
                <SettingTextInput
                  label="Live Secret Key"
                  value={getValue(get(paypalInfo, "live_secret_key", ""))}
                  name="live_secret_key"
                  onSettingInputChange={(val, name) =>
                    setPaypalInfo({ ...paypalInfo, [name]: val })
                  }
                  type="password"
                />
              </Box>
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updatePaypal}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function Paypal() {
  return (
    <ThemeProvider theme={theme}>
      <PaypalComponent />
    </ThemeProvider>
  );
}
