import React, { Fragment, useState } from "react";
import {
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import viewStyles from "../../viewStyles";
import { paymentPaypalUpdateAction } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput } from "./setting-components/";

const Paypal = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [paypalInfo, setPaypalInfo] = useState({
    ...settingState.settings.paymnet.paypal,
  });

  const updatePaypal = () => {
    dispatch(paymentPaypalUpdateAction(paypalInfo));
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <Box component='div' className={classes.marginBottom2}>
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  checked={paypalInfo.enable}
                  onChange={(e) =>
                    setPaypalInfo({ ...paypalInfo, enable: e.target.checked })
                  }
                />
              }
              label='Enable PayPal Standard'
            />
          </Box>
          {paypalInfo.enable && (
            <Box component='div'>
              <Box component='div'>
                <SettingTextInput
                  label='Title'
                  value={paypalInfo.title}
                  onSettingInputChange={(val) =>
                    setPaypalInfo({ ...paypalInfo, title: val })
                  }
                />
              </Box>

              <Box component='div'>
                <SettingTextInput
                  label='Description'
                  value={paypalInfo.description}
                  onSettingInputChange={(val) =>
                    setPaypalInfo({ ...paypalInfo, description: val })
                  }
                  multiline
                  rows='5'
                />
              </Box>

              <Box component='div'>
                <SettingTextInput
                  label='PayPal email'
                  value={paypalInfo.paypal_email}
                  onSettingInputChange={(val) =>
                    setPaypalInfo({ ...paypalInfo, paypal_email: val })
                  }
                  type='email'
                />
              </Box>

              <Box component='div' className={classes.marginBottom2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={paypalInfo.ipn_email_notification}
                      onChange={(e) =>
                        setPaypalInfo({
                          ...paypalInfo,
                          ipn_email_notification: e.target.checked,
                        })
                      }
                    />
                  }
                  label='Enable IPN email notifications'
                />
              </Box>

              <Box component='div'>
                <SettingTextInput
                  label='Receiver email'
                  value={paypalInfo.receiver_email}
                  onSettingInputChange={(val) =>
                    setPaypalInfo({ ...paypalInfo, receiver_email: val })
                  }
                  type='email'
                />
              </Box>

              <Box component='div'>
                <SettingTextInput
                  label='PayPal identity token'
                  value={paypalInfo.paypal_identity_token}
                  onSettingInputChange={(val) =>
                    setPaypalInfo({ ...paypalInfo, paypal_identity_token: val })
                  }
                />
              </Box>

              <Box component='div'>
                <SettingTextInput
                  label='Invoice prefix'
                  value={paypalInfo.invoice_prefix}
                  onSettingInputChange={(val) =>
                    setPaypalInfo({ ...paypalInfo, invoice_prefix: val })
                  }
                />
              </Box>
            </Box>
          )}
        </Grid>

        {/* ===================SandBox ANd Live=================== */}

        {paypalInfo.enable && (
          <Grid item md={6} sm={12} xs={12}>
            <Box component='div' className={classes.marginBottom2}>
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={paypalInfo.test_mode}
                    onChange={(e) =>
                      setPaypalInfo({
                        ...paypalInfo,
                        test_mode: e.target.checked,
                      })
                    }
                  />
                }
                label='Enable PayPal sandbox'
              />
            </Box>

            <Box component='div'>
              <SettingTextInput
                label='API Username'
                value={paypalInfo.api_username}
                onSettingInputChange={(val) =>
                  setPaypalInfo({ ...paypalInfo, api_username: val })
                }
              />
            </Box>

            <Box component='div'>
              <SettingTextInput
                label='API password'
                value={paypalInfo.api_password}
                onSettingInputChange={(val) =>
                  setPaypalInfo({ ...paypalInfo, api_password: val })
                }
                type='password'
              />
            </Box>

            <Box component='div'>
              <SettingTextInput
                label='API signature'
                value={paypalInfo.api_signature}
                onSettingInputChange={(val) =>
                  setPaypalInfo({ ...paypalInfo, api_signature: val })
                }
                type='password'
              />
            </Box>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            size='small'
            color='primary'
            variant='contained'
            onClick={updatePaypal}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Paypal;
