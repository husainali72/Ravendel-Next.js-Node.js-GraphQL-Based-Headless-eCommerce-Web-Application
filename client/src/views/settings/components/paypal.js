import React, { Fragment, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Button
} from "@material-ui/core";

import viewStyles from "../../viewStyles.js";

const Paypal = props => {
  const classes = viewStyles();
  const [paypal, setPaypal] = useState(true);
  const [sandboxMode, setsandboxMode] = useState(false);
  const [paypalInfo, setPaypalInfo] = useState({
    title: "PayPal",
    description:
      "Pay via PayPal; you can pay with your credit card if you don't have a PayPal account.",
    email: "",
    receiver_email: "",
    identity_token: "",
    invoice_prefix: "",
    IPN_email_notifications: false
  });
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
                  checked={paypal}
                  onChange={e => setPaypal(e.target.checked)}
                />
              }
              label="Enable PayPal Standard"
            />
          </Box>
          {paypal && (
            <Box>
              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Title
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={paypalInfo.title}
                  onChange={e =>
                    setPaypalInfo({ paypalInfo, title: e.target.value })
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
                  onChange={e =>
                    setPaypalInfo({ paypalInfo, description: e.target.value })
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
                  value={paypalInfo.email}
                  onChange={e =>
                    setPaypalInfo({ paypalInfo, email: e.target.value })
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
                      checked={paypalInfo.IPN_email_notifications}
                      onChange={e =>
                        setPaypalInfo({
                          paypalInfo,
                          IPN_email_notifications: e.target.checked
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
                  onChange={e =>
                    setPaypalInfo({
                      paypalInfo,
                      receiver_email: e.target.value
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
                  value={paypalInfo.identity_token}
                  onChange={e =>
                    setPaypalInfo({
                      paypalInfo,
                      identity_token: e.target.value
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
                  onChange={e =>
                    setPaypalInfo({
                      paypalInfo,
                      invoice_prefix: e.target.value
                    })
                  }
                  className={classes.simpleSettingInput}
                />
              </Box>
            </Box>
          )}
        </Grid>

        {/* ===================SandBox ANd Live=================== */}

        <Grid item md={6} sm={12} xs={12}>
          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5">API credentials</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={sandboxMode}
                  onChange={e => setsandboxMode(e.target.checked)}
                />
              }
              label="Enable PayPal sandbox"
            />
          </Box>
          {sandboxMode ? (
            <Box>
              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Sandbox API username
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.simpleSettingInput}
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Sandbox API password
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.simpleSettingInput}
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Sandbox API signature
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.simpleSettingInput}
                />
              </Box>
            </Box>
          ) : (
            <Box>
              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Live API username
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.simpleSettingInput}
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Live API password
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.simpleSettingInput}
                  type="password"
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Live API signature
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.simpleSettingInput}
                />
              </Box>
            </Box>
          )}
        </Grid>

        <Grid item md={12}>
          <Button size="small" color="primary" variant="contained">
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Paypal;
