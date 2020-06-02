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
import { paymentStripeUpdateAction } from "../../../store/action";
import { connect } from "react-redux";

const Stripe = (props) => {
  const classes = viewStyles();
  const [stripeInfo, setstripeInfo] = useState({
    ...props.settingState.settings.paymnet.stripe,
  });

  const updateStripe = () => {
    props.paymentStripeUpdateAction(stripeInfo);
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
                  checked={stripeInfo.enable}
                  onChange={(e) =>
                    setstripeInfo({ ...stripeInfo, enable: e.target.checked })
                  }
                />
              }
              label="Enable Stripe"
            />
          </Box>
          {stripeInfo.enable && (
            <Box>
              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Title
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={stripeInfo.title}
                  onChange={(e) =>
                    setstripeInfo({ ...stripeInfo, title: e.target.value })
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
                  onChange={(e) =>
                    setstripeInfo({
                      ...stripeInfo,
                      description: e.target.value,
                    })
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
                      onChange={(e) =>
                        setstripeInfo({
                          ...stripeInfo,
                          inline_credit_card_form: e.target.checked,
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
                  onChange={(e) =>
                    setstripeInfo({
                      ...stripeInfo,
                      statement_descriptor: e.target.value,
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
                      onChange={(e) =>
                        setstripeInfo({
                          ...stripeInfo,
                          capture: e.target.checked,
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

        {stripeInfo.enable && (
          <Grid item md={6} sm={12} xs={12}>
            <Box component="div" className={classes.marginBottom2}>
              <Typography variant="h5">Test mode</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={stripeInfo.test_mode}
                    onChange={(e) =>
                      setstripeInfo({
                        ...stripeInfo,
                        test_mode: e.target.checked,
                      })
                    }
                  />
                }
                label="Enable Test Mode"
              />
            </Box>

            <Box>
              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Publishable Key
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.simpleSettingInput}
                  value={stripeInfo.publishable_key}
                  onChange={(e) =>
                    setstripeInfo({
                      ...stripeInfo,
                      publishable_key: e.target.value,
                    })
                  }
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Secret Key
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.simpleSettingInput}
                  type="password"
                  value={stripeInfo.secret_key}
                  onChange={(e) =>
                    setstripeInfo({
                      ...stripeInfo,
                      secret_key: e.target.value,
                    })
                  }
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
                  value={stripeInfo.webhook_key}
                  onChange={(e) =>
                    setstripeInfo({
                      ...stripeInfo,
                      webhook_key: e.target.value,
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
            onClick={updateStripe}
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
  paymentStripeUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stripe);
