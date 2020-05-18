import React, { Fragment, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
} from "@material-ui/core";

import viewStyles from "../../viewStyles.js";
import { paymentPaypalUpdateAction } from "../../../store/action";
import { connect } from "react-redux";

const Paypal = (props) => {
  const classes = viewStyles();

  const [paypalInfo, setPaypalInfo] = useState({
    ...props.settingState.settings.paymnet.paypal,
  });

  const updatePaypal = () => {
    props.paymentPaypalUpdateAction(paypalInfo);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5">Enable/Disable</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={paypalInfo.enable}
                  onChange={(e) =>
                    setPaypalInfo({ ...paypalInfo, enable: e.target.checked })
                  }
                />
              }
              label="Enable PayPal Standard"
            />
          </Box>
          {paypalInfo.enable && (
            <Box>
              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Title
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={paypalInfo.title}
                  onChange={(e) =>
                    setPaypalInfo({ ...paypalInfo, title: e.target.value })
                  }
                  className={classes.simpleSettingInput}
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Description
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={paypalInfo.description}
                  onChange={(e) =>
                    setPaypalInfo({
                      ...paypalInfo,
                      description: e.target.value,
                    })
                  }
                  className={classes.simpleSettingInput}
                  multiline
                  rows="5"
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  PayPal email
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={paypalInfo.paypal_email}
                  onChange={(e) =>
                    setPaypalInfo({
                      ...paypalInfo,
                      paypal_email: e.target.value,
                    })
                  }
                  className={classes.simpleSettingInput}
                  type="email"
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5">IPN Email Notifications</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={paypalInfo.ipn_email_notification}
                      onChange={(e) =>
                        setPaypalInfo({
                          ...paypalInfo,
                          ipn_email_notification: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Enable IPN email notifications"
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Receiver email
                </Typography>
                <TextField
                  type="email"
                  size="small"
                  variant="outlined"
                  value={paypalInfo.receiver_email}
                  onChange={(e) =>
                    setPaypalInfo({
                      ...paypalInfo,
                      receiver_email: e.target.value,
                    })
                  }
                  className={classes.simpleSettingInput}
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  PayPal identity token
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={paypalInfo.paypal_identity_token}
                  onChange={(e) =>
                    setPaypalInfo({
                      ...paypalInfo,
                      paypal_identity_token: e.target.value,
                    })
                  }
                  className={classes.simpleSettingInput}
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Invoice prefix
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={paypalInfo.invoice_prefix}
                  onChange={(e) =>
                    setPaypalInfo({
                      ...paypalInfo,
                      invoice_prefix: e.target.value,
                    })
                  }
                  className={classes.simpleSettingInput}
                />
              </Box>
            </Box>
          )}
        </Grid>

        {/* ===================SandBox ANd Live=================== */}

        {paypalInfo.enable && (
          <Grid item md={6} sm={12} xs={12}>
            <Box component="div" className={classes.marginBottom2}>
              <Typography variant="h5">API credentials</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={paypalInfo.test_mode}
                    onChange={(e) =>
                      setPaypalInfo({
                        ...paypalInfo,
                        test_mode: e.target.checked,
                      })
                    }
                  />
                }
                label="Enable PayPal sandbox"
              />
            </Box>

            <Box>
              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  API username
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.simpleSettingInput}
                  value={paypalInfo.api_username}
                  onChange={(e) =>
                    setPaypalInfo({
                      ...paypalInfo,
                      api_username: e.target.value,
                    })
                  }
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  API password
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.simpleSettingInput}
                  type="password"
                  value={paypalInfo.api_password}
                  onChange={(e) =>
                    setPaypalInfo({
                      ...paypalInfo,
                      api_password: e.target.value,
                    })
                  }
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  API signature
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.simpleSettingInput}
                  value={paypalInfo.api_signature}
                  onChange={(e) =>
                    setPaypalInfo({
                      ...paypalInfo,
                      api_signature: e.target.value,
                    })
                  }
                />
              </Box>
            </Box>
          </Grid>
        )}

        <Grid item md={12}>
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
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { settingState: state.settings };
};

const mapDispatchToProps = {
  paymentPaypalUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Paypal);
