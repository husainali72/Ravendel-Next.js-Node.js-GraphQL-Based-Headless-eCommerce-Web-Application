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
import clsx from "clsx";

const DirectBankTransfer = props => {
  const classes = viewStyles();
  const [bankTransfer, setBankTransfer] = useState(true);
  const [bankTransferInfo, setBankTransferInfo] = useState({
    title: "Direct bank transfer",
    description:
      "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
    instructions: "",
    account_name: "",
    account_number: "",
    bank_name: "",
    sort_code: "",
    IBAN: ""
  });
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
                  checked={bankTransfer}
                  onChange={e => setBankTransfer(e.target.checked)}
                />
              }
              label="Enable bank transfer"
            />
          </Box>
          {bankTransfer && (
            <Box>
              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Title
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={bankTransferInfo.title}
                  onChange={e =>
                    setBankTransferInfo({
                      bankTransferInfo,
                      title: e.target.value
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
                  onChange={e =>
                    setBankTransferInfo({
                      bankTransferInfo,
                      description: e.target.value
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
                  onChange={e =>
                    setBankTransferInfo({
                      bankTransferInfo,
                      instructions: e.target.value
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
                      value={bankTransferInfo.account_name}
                      onChange={e =>
                        setBankTransferInfo({
                          bankTransferInfo,
                          account_name: e.target.value
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
                      value={bankTransferInfo.account_number}
                      onChange={e =>
                        setBankTransferInfo({
                          bankTransferInfo,
                          account_number: e.target.value
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
                      value={bankTransferInfo.bank_name}
                      onChange={e =>
                        setBankTransferInfo({
                          bankTransferInfo,
                          bank_name: e.target.value
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
                      value={bankTransferInfo.sort_code}
                      onChange={e =>
                        setBankTransferInfo({
                          bankTransferInfo,
                          sort_code: e.target.value
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
                      value={bankTransferInfo.IBAN}
                      onChange={e =>
                        setBankTransferInfo({
                          bankTransferInfo,
                          IBAN: e.target.value
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
                    />
                  </Grid>
                </Grid>
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

export default DirectBankTransfer;
