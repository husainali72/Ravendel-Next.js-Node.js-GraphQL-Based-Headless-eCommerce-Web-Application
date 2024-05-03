import React, { useState } from "react";
import { Grid, Box, FormControlLabel, Checkbox, Button } from "@mui/material";
import viewStyles from "../../viewStyles";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput } from "./setting-components/";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { get } from "lodash";
import theme from "../../../theme/index.js";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";
import ToggleSwitch from "../../components/switch.js";
import { getValue } from "../../../utils/helper.js";
import { paymentRazorPayUpdateAction } from "../../../store/action/settingAction.js";
import SettingTextArea from "./setting-components/setting-textArea.js";

const RazorPayComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [razorPayInfo, setRazorPayInfo] = useState({ enable: false });

  useEffect(() => {
    setRazorPayInfo({ ...get(settingState, "settings.payment.razorpay", {}) });
  }, [get(settingState, "settings")]);

  const updateRazorPay = () => {
    dispatch(paymentRazorPayUpdateAction(razorPayInfo));
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
                  checked={get(razorPayInfo, "enable")}
                  onChange={(e) =>
                    setRazorPayInfo({
                      ...razorPayInfo,
                      enable: get(e, "target.checked"),
                    })
                  }
                />
              }
              label="Enable RazorPay Standard"
            />
          </Box>
          {get(razorPayInfo, "enable") && (
            <Box component="div">
              <Box component="div">
                <SettingTextInput
                  label="Title"
                  value={get(razorPayInfo, "title")}
                  onSettingInputChange={(val) =>
                    setRazorPayInfo({ ...razorPayInfo, title: val })
                  }
                />
              </Box>

              <Box component="div">
                <SettingTextArea
                  label="Description"
                  placeholder="Description"
                  value={get(razorPayInfo, "description")}
                  onSettingInputChange={(e) => {
                    setRazorPayInfo({
                      ...razorPayInfo,
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

        {get(razorPayInfo, "enable") && (
          <>
            <Grid item md={6} sm={12} xs={12}>
              <Box component="div" className={classes.marginBottom2}>
                <ToggleSwitch
                  color="primary"
                  checked={get(razorPayInfo, "test_mode", false)}
                  onChange={(e) =>
                    setRazorPayInfo({
                      ...razorPayInfo,
                      test_mode: get(e, "target.checked"),
                    })
                  }
                />
              </Box>
              <Box component="div">
                <SettingTextInput
                  label="Sandbox Client Id"
                  name="sandbox_client_id"
                  value={getValue(get(razorPayInfo, "sandbox_client_id", ""))}
                  onSettingInputChange={(val, name) => {
                    setRazorPayInfo({ ...razorPayInfo, [name]: val });
                  }}
                  type="password"
                />
              </Box>
              <Box component="div">
                <SettingTextInput
                  label="Sandbox Secret Key"
                  value={getValue(get(razorPayInfo, "sandbox_secret_key", ""))}
                  name="sandbox_secret_key"
                  onSettingInputChange={(val, name) =>
                    setRazorPayInfo({ ...razorPayInfo, [name]: val })
                  }
                  type="password"
                />
              </Box>
              <Box component="div">
                <SettingTextInput
                  label="Live Client Id"
                  name="live_client_id"
                  value={getValue(get(razorPayInfo, "live_client_id", ""))}
                  onSettingInputChange={(val, name) => {
                    setRazorPayInfo({ ...razorPayInfo, [name]: val });
                  }}
                  type="password"
                />
              </Box>
              <Box component="div">
                <SettingTextInput
                  label="Live Secret Key"
                  value={getValue(get(razorPayInfo, "live_secret_key", ""))}
                  name="live_secret_key"
                  onSettingInputChange={(val, name) =>
                    setRazorPayInfo({ ...razorPayInfo, [name]: val })
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
            onClick={updateRazorPay}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function RazorPay() {
  return (
    <ThemeProvider theme={theme}>
      <RazorPayComponent />
    </ThemeProvider>
  );
}
