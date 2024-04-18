import React, { useState } from "react";
import { Grid, Box, FormControlLabel, Checkbox, Button } from "@mui/material";
import viewStyles from "../../viewStyles";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput } from "./setting-components/";
import theme from "../../../theme/index.js";
import { ThemeProvider } from "@mui/material/styles";
import { get } from "lodash";
import { useEffect } from "react";
import { paymentStripeUpdateAction } from "../../../store/action";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";
import ToggleSwitch from "../../components/switch.js";
import { getValue } from "../../../utils/helper.js";

const StripeComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [stripeInfo, setstripeInfo] = useState({ enable: false });
  const striped = get(settingState, "settings.payment.stripe");

  useEffect(() => {
    setstripeInfo({
      ...get(settingState, "settings.payment.stripe", {}),
    });
  }, [striped]);

  const updateStripe = () => {
    dispatch(paymentStripeUpdateAction(stripeInfo));
  };
  const checkStripeMode = () => {
    return get(stripeInfo, "test_mode");
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
                  checked={get(stripeInfo, "enable")}
                  onChange={(e) =>
                    setstripeInfo({
                      ...stripeInfo,
                      enable: get(e, "target.checked"),
                    })
                  }
                />
              }
              label="Enable Stripe"
            />
          </Box>
          {get(stripeInfo, "enable") && (
            <Box component="div">
              <Box component="div">
                <SettingTextInput
                  label="Title"
                  value={get(stripeInfo, "title")}
                  onSettingInputChange={(val) =>
                    setstripeInfo({ ...stripeInfo, title: val })
                  }
                />
              </Box>

              <Box component="div">
                <SettingTextInput
                  label="Description"
                  value={get(stripeInfo, "description")}
                  onSettingInputChange={(val) =>
                    setstripeInfo({ ...stripeInfo, description: val })
                  }
                  multiline
                  rows="5"
                />
              </Box>
            </Box>
          )}
        </Grid>

        {/* ===================SandBox ANd Live=================== */}

        {get(stripeInfo, "enable") && (
          <Grid item md={6} sm={12} xs={12}>
            <Box component="div" className={classes.marginBottom2}>
              <ToggleSwitch
                color="primary"
                checked={get(stripeInfo, "test_mode")}
                onChange={(e) =>
                  setstripeInfo({
                    ...stripeInfo,
                    test_mode: get(e, "target.checked"),
                  })
                }
              />
            </Box>
            <Box component="div">
              <SettingTextInput
                label="Sandbox Secret Key"
                value={getValue(get(stripeInfo, "sandbox_secret_key", ""))}
                name="sandbox_secret_key"
                onSettingInputChange={(val, name) =>
                  setstripeInfo({
                    ...stripeInfo,
                    [name]: val,
                  })
                }
                type="password"
              />
            </Box>
            <Box component="div">
              <SettingTextInput
                label="Live Secret Key"
                value={getValue(get(stripeInfo, "live_secret_key", ""))}
                name="live_secret_key"
                onSettingInputChange={(val, name) =>
                  setstripeInfo({
                    ...stripeInfo,
                    [name]: val,
                  })
                }
                type="password"
              />
            </Box>
          </Grid>
        )}

        <Grid item md={12} xs={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateStripe}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function Stripe() {
  return (
    <ThemeProvider theme={theme}>
      <StripeComponent />
    </ThemeProvider>
  );
}
