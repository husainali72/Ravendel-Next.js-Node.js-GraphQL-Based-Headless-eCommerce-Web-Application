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

const PaypalComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [paypalInfo, setPaypalInfo] = useState({ enable: false });

  useEffect(() => {
    if (get(settingState, "settings.payment.paypal")) {
      setPaypalInfo({ ...get(settingState, "settings.payment.paypal") });
    }
  }, [get(settingState, "settings")]);

  const updatePaypal = () => {
    dispatch(paymentPaypalUpdateAction(paypalInfo));
  };
  const checkPaypalMode = () => {
    return get(paypalInfo, "test_mode");
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
              label="Enable PayPal Standard"
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
                <SettingTextInput
                  label="Description"
                  value={get(paypalInfo, "description")}
                  onSettingInputChange={(val) =>
                    setPaypalInfo({ ...paypalInfo, description: val })
                  }
                  multiline
                  rows="5"
                />
              </Box>

              <Box component="div">
                <SettingTextInput
                  label="PayPal email"
                  value={get(paypalInfo, "paypal_email")}
                  onSettingInputChange={(val) =>
                    setPaypalInfo({ ...paypalInfo, paypal_email: val })
                  }
                  type="email"
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={get(paypalInfo, "ipn_email_notification")}
                      onChange={(e) =>
                        setPaypalInfo({
                          ...paypalInfo,
                          ipn_email_notification: get(e, "target.checked"),
                        })
                      }
                    />
                  }
                  label="Enable IPN email notifications"
                />
              </Box>

              <Box component="div">
                <SettingTextInput
                  label="Receiver email"
                  value={get(paypalInfo, "receiver_email")}
                  onSettingInputChange={(val) =>
                    setPaypalInfo({ ...paypalInfo, receiver_email: val })
                  }
                  type="email"
                />
              </Box>

              <Box component="div">
                <SettingTextInput
                  label="PayPal identity token"
                  value={get(paypalInfo, "paypal_identity_token")}
                  onSettingInputChange={(val) =>
                    setPaypalInfo({ ...paypalInfo, paypal_identity_token: val })
                  }
                />
              </Box>

              <Box component="div">
                <SettingTextInput
                  label="Invoice prefix"
                  value={get(paypalInfo, "invoice_prefix")}
                  onSettingInputChange={(val) =>
                    setPaypalInfo({ ...paypalInfo, invoice_prefix: val })
                  }
                />
              </Box>
            </Box>
          )}
        </Grid>

        {/* ===================SandBox ANd Live=================== */}

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
              label={checkPaypalMode() ? "Sandbox Client Id" : "Live Client Id"}
              name={checkPaypalMode() ? "sandbox_client_id" : "live_client_id"}
              value={getValue(get(
                paypalInfo,
                checkPaypalMode() ? "sandbox_client_id" : "live_client_id",
                ""
              ))}
              onSettingInputChange={(val, name) => {
                setPaypalInfo({ ...paypalInfo, [name]: val });
              }}
              type="password"
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              label={
                checkPaypalMode() ? "Sandbox Secret Key" : "Live Secret Key"
              }
              value={getValue(get(
                paypalInfo,
                checkPaypalMode() ? "sandbox_secret_key" : "live_secret_key",
                ""
              ))}
              name={
                checkPaypalMode() ? "sandbox_secret_key" : "live_secret_key"
              }
              onSettingInputChange={(val, name) =>
                setPaypalInfo({ ...paypalInfo, [name]: val })
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
