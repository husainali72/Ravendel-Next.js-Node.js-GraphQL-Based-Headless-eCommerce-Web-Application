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
import clsx from "clsx";
import { paymentBankUpdateAction } from "../../../store/action";
import { connect } from "react-redux";

const DirectBankTransfer = (props) => {
  const classes = viewStyles();

  const [bankTransferInfo, setBankTransferInfo] = useState({
    ...props.settingState.settings.paymnet.bank_transfer,
  });

  const updateBank = () => {
    delete bankTransferInfo.account_details.__typename;
    props.paymentBankUpdateAction(bankTransferInfo);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5">Enable/Disable</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={bankTransferInfo.enable}
                  onChange={(e) =>
                    setBankTransferInfo({
                      ...bankTransferInfo,
                      enable: e.target.checked,
                    })
                  }
                />
              }
              label="Enable bank transfer"
            />
          </Box>
          {bankTransferInfo.enable && (
            <Box>
              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Title
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={bankTransferInfo.title}
                  onChange={(e) =>
                    setBankTransferInfo({
                      ...bankTransferInfo,
                      title: e.target.value,
                    })
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
                  value={bankTransferInfo.description}
                  onChange={(e) =>
                    setBankTransferInfo({
                      ...bankTransferInfo,
                      description: e.target.value,
                    })
                  }
                  multiline
                  rows="5"
                  className={classes.simpleSettingInput}
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Instructions
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={bankTransferInfo.instructions}
                  onChange={(e) =>
                    setBankTransferInfo({
                      ...bankTransferInfo,
                      instructions: e.target.value,
                    })
                  }
                  className={classes.simpleSettingInput}
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Account details:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <TextField
                      size="small"
                      variant="outlined"
                      label="Accoun Name"
                      value={bankTransferInfo.account_details.account_name}
                      onChange={(e) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...bankTransferInfo.account_details,
                            account_name: e.target.value,
                          },
                        })
                      }
                      className={clsx(classes.width100, classes.marginBottom1)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      size="small"
                      variant="outlined"
                      label="Account number"
                      value={bankTransferInfo.account_details.account_number}
                      onChange={(e) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...bankTransferInfo.account_details,
                            account_number: e.target.value,
                          },
                        })
                      }
                      className={clsx(classes.width100, classes.marginBottom1)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      size="small"
                      variant="outlined"
                      label="Bank name"
                      value={bankTransferInfo.account_details.bank_name}
                      onChange={(e) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...bankTransferInfo.account_details,
                            bank_name: e.target.value,
                          },
                        })
                      }
                      className={clsx(classes.width100, classes.marginBottom1)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      size="small"
                      variant="outlined"
                      label="Sort code"
                      value={bankTransferInfo.account_details.short_code}
                      onChange={(e) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...bankTransferInfo.account_details,
                            short_code: e.target.value,
                          },
                        })
                      }
                      className={clsx(classes.width100, classes.marginBottom1)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      size="small"
                      variant="outlined"
                      label="IBAN"
                      value={bankTransferInfo.account_details.iban}
                      onChange={(e) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...bankTransferInfo.account_details,
                            iban: e.target.value,
                          },
                        })
                      }
                      className={clsx(classes.width100, classes.marginBottom1)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      size="small"
                      variant="outlined"
                      label="BIC / Swift"
                      className={clsx(classes.width100, classes.marginBottom1)}
                      value={bankTransferInfo.account_details.bic_swift}
                      onChange={(e) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...bankTransferInfo.account_details,
                            bic_swift: e.target.value,
                          },
                        })
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item md={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateBank}
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
  paymentBankUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectBankTransfer);
