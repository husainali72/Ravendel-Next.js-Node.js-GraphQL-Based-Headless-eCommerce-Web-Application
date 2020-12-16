import React, { Fragment, useState } from "react";
import {
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";

import viewStyles from "../../viewStyles";
import { paymentStripeUpdateAction } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput } from "./setting-components/";

const Stripe = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [stripeInfo, setstripeInfo] = useState({
    ...settingState.settings.paymnet.stripe,
  });

  const updateStripe = () => {
    dispatch(paymentStripeUpdateAction(stripeInfo));
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
                  checked={stripeInfo.enable}
                  onChange={(e) =>
                    setstripeInfo({ ...stripeInfo, enable: e.target.checked })
                  }
                />
              }
              label='Enable Stripe'
            />
          </Box>
          {stripeInfo.enable && (
            <Box component='div'>
              <Box component='div'>
                <SettingTextInput
                  label='Title'
                  value={stripeInfo.title}
                  onSettingInputChange={(val) =>
                    setstripeInfo({ ...stripeInfo, title: val })
                  }
                />
              </Box>

              <Box component='div'>
                <SettingTextInput
                  label='Description'
                  value={stripeInfo.description}
                  onSettingInputChange={(val) =>
                    setstripeInfo({ ...stripeInfo, description: val })
                  }
                  multiline
                  rows='5'
                />
              </Box>

              <Box component='div' className={classes.marginBottom2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={stripeInfo.inline_credit_card_form}
                      onChange={(e) =>
                        setstripeInfo({
                          ...stripeInfo,
                          inline_credit_card_form: e.target.checked,
                        })
                      }
                    />
                  }
                  label='Inline Credit Card Form'
                />
              </Box>

              <Box component='div'>
                <SettingTextInput
                  label='Statement Descriptor'
                  value={stripeInfo.statement_descriptor}
                  onSettingInputChange={(val) =>
                    setstripeInfo({ ...stripeInfo, statement_descriptor: val })
                  }
                />
              </Box>

              <Box component='div' className={classes.marginBottom2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={stripeInfo.capture}
                      onChange={(e) =>
                        setstripeInfo({
                          ...stripeInfo,
                          capture: e.target.checked,
                        })
                      }
                    />
                  }
                  label='Capture charge immediately'
                />
              </Box>
            </Box>
          )}
        </Grid>

        {/* ===================SandBox ANd Live=================== */}

        {stripeInfo.enable && (
          <Grid item md={6} sm={12} xs={12}>
            <Box component='div' className={classes.marginBottom2}>
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={stripeInfo.test_mode}
                    onChange={(e) =>
                      setstripeInfo({
                        ...stripeInfo,
                        test_mode: e.target.checked,
                      })
                    }
                  />
                }
                label='Enable Test Mode'
              />
            </Box>

            <Box component='div'>
              <SettingTextInput
                label='Publishable Key'
                value={stripeInfo.publishable_key}
                onSettingInputChange={(val) =>
                  setstripeInfo({
                    ...stripeInfo,
                    publishable_key: val,
                  })
                }
              />
            </Box>

            <Box component='div'>
              <SettingTextInput
                label='Secret Key'
                value={stripeInfo.secret_key}
                onSettingInputChange={(val) =>
                  setstripeInfo({
                    ...stripeInfo,
                    secret_key: val,
                  })
                }
                type='password'
              />
            </Box>

            <Box component='div'>
              <SettingTextInput
                label='Webhook Secret'
                value={stripeInfo.webhook_key}
                onSettingInputChange={(val) =>
                  setstripeInfo({
                    ...stripeInfo,
                    webhook_key: val,
                  })
                }
              />
            </Box>
          </Grid>
        )}

        <Grid item md={12} xs={12}>
          <Button
            size='small'
            color='primary'
            variant='contained'
            onClick={updateStripe}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Stripe;
