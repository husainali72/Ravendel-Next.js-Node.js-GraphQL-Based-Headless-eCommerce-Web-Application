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

const Stripe = props => {
  const classes = viewStyles();
  const [stripe, setStripe] = useState(false);
  const [testMode, settestMode] = useState(false);
  const [stripeInfo, setstripeInfo] = useState({
    title: "Credit Card (Stripe)",
    description: "Pay with your credit card via Stripe.",
    inline_credit_card_form: false,
    statement_descriptor: "",
    capture: false
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
                  checked={stripe}
                  onChange={e => setStripe(e.target.checked)}
                />
              }
              label="Enable Stripe"
            />
          </Box>
          {stripe && (
            <Box>
              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Title
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={stripeInfo.title}
                  onChange={e =>
                    setstripeInfo({ stripeInfo, title: e.target.value })
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
                  value={stripeInfo.description}
                  onChange={e =>
                    setstripeInfo({ stripeInfo, description: e.target.value })
                  }
                  className={classes.simpleSettingInput}
                  multiline
                  rows="5"
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5">Inline Credit Card Form</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={stripeInfo.inline_credit_card_form}
                      onChange={e =>
                        setstripeInfo({
                          stripeInfo,
                          inline_credit_card_form: e.target.checked
                        })
                      }
                    />
                  }
                  label="Inline Credit Card Form"
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Statement Descriptor
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={stripeInfo.statement_descriptor}
                  onChange={e =>
                    setstripeInfo({
                      stripeInfo,
                      statement_descriptor: e.target.value
                    })
                  }
                  className={classes.simpleSettingInput}
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5">Capture</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={stripeInfo.capture}
                      onChange={e =>
                        setstripeInfo({
                          stripeInfo,
                          capture: e.target.checked
                        })
                      }
                    />
                  }
                  label="Capture charge immediately"
                />
              </Box>
            </Box>
          )}
        </Grid>

        {/* ===================SandBox ANd Live=================== */}

        {stripe && (
          <Grid item md={6} sm={12} xs={12}>
            <Box component="div" className={classes.marginBottom2}>
              <Typography variant="h5">Test mode</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={testMode}
                    onChange={e => settestMode(e.target.checked)}
                  />
                }
                label="Enable Test Mode"
              />
            </Box>
            {testMode ? (
              <Box>
                <Box component="div" className={classes.marginBottom2}>
                  <Typography variant="h5" className={classes.paddingBottom1}>
                    Test Publishable Key
                  </Typography>
                  <TextField
                    size="small"
                    variant="outlined"
                    className={classes.simpleSettingInput}
                  />
                </Box>

                <Box component="div" className={classes.marginBottom2}>
                  <Typography variant="h5" className={classes.paddingBottom1}>
                    Test Secret Key
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
                    Test Webhook Secret
                  </Typography>
                  <TextField
                    size="small"
                    variant="outlined"
                    className={classes.simpleSettingInput}
                    type="password"
                  />
                </Box>
              </Box>
            ) : (
              <Box>
                <Box component="div" className={classes.marginBottom2}>
                  <Typography variant="h5" className={classes.paddingBottom1}>
                    Live Publishable Key
                  </Typography>
                  <TextField
                    size="small"
                    variant="outlined"
                    className={classes.simpleSettingInput}
                  />
                </Box>

                <Box component="div" className={classes.marginBottom2}>
                  <Typography variant="h5" className={classes.paddingBottom1}>
                    Live Secret Key
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
                    Webhook Secret
                  </Typography>
                  <TextField
                    size="small"
                    variant="outlined"
                    className={classes.simpleSettingInput}
                    type="password"
                  />
                </Box>
              </Box>
            )}
          </Grid>
        )}

        <Grid item md={12}>
          <Button size="small" color="primary" variant="contained">
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Stripe;
