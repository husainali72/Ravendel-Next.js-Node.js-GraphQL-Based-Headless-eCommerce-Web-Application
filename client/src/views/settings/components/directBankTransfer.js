import React, { Fragment, useState } from "react";
import {
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
  useMediaQuery
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import viewStyles from "../../viewStyles";
import { paymentBankUpdateAction } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput, SettingBlock } from "./setting-components/";

const DirectBankTransfer = (props) => {
  const classes = viewStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [bankTransferInfo, setBankTransferInfo] = useState({
    ...settingState.settings.paymnet.bank_transfer,
  });

  const updateBank = () => {
    delete bankTransferInfo.account_details.__typename;
    dispatch(paymentBankUpdateAction(bankTransferInfo));
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component='div' className={classes.marginBottom2}>
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  checked={bankTransferInfo.enable}
                  onChange={(e) =>
                    setBankTransferInfo({
                      ...bankTransferInfo,
                      enable: e.target.checked,
                    })
                  }
                />
              }
              label='Enable bank transfer'
            />
          </Box>
          {bankTransferInfo.enable && (
            <Box>
              <Box component='div'>
                <SettingTextInput
                  label='Title'
                  value={bankTransferInfo.title}
                  onSettingInputChange={(val) =>
                    setBankTransferInfo({
                      ...bankTransferInfo,
                      title: val,
                    })
                  }
                />
              </Box>

              <Box component='div'>
                <SettingTextInput
                  label='Description'
                  value={bankTransferInfo.description}
                  onSettingInputChange={(val) =>
                    setBankTransferInfo({
                      ...bankTransferInfo,
                      description: val,
                    })
                  }
                />
              </Box>

              <Box component='div'>
                <SettingTextInput
                  label='Instructions'
                  value={bankTransferInfo.description}
                  onSettingInputChange={(val) =>
                    setBankTransferInfo({
                      ...bankTransferInfo,
                      instructions: val,
                    })
                  }
                />
              </Box>

              <SettingBlock label='Account details'>
                <Grid container spacing={isSmall ? 0 : 2}>
                  <Grid item lg={4} md={6} xs={12}>
                    <SettingTextInput
                      label='Account Name'
                      value={bankTransferInfo.account_details.account_name}
                      onSettingInputChange={(val) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...bankTransferInfo.account_details,
                            account_name: val,
                          },
                        })
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={4} md={6} xs={12}>
                    <SettingTextInput
                      label='Account number'
                      value={bankTransferInfo.account_details.account_number}
                      onSettingInputChange={(val) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...bankTransferInfo.account_details,
                            account_number: val,
                          },
                        })
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={4} md={6} xs={12}>
                    <SettingTextInput
                      label='Bank name'
                      value={bankTransferInfo.account_details.bank_name}
                      onSettingInputChange={(val) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...bankTransferInfo.account_details,
                            bank_name: val,
                          },
                        })
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={4} md={6} xs={12}>
                    <SettingTextInput
                      label='Sort code'
                      value={bankTransferInfo.account_details.short_code}
                      onSettingInputChange={(val) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...bankTransferInfo.account_details,
                            short_code: val,
                          },
                        })
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={4} md={6} xs={12}>
                    <SettingTextInput
                      label='IBAN'
                      value={bankTransferInfo.account_details.iban}
                      onSettingInputChange={(val) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...bankTransferInfo.account_details,
                            iban: val,
                          },
                        })
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={4} md={6} xs={12}>
                    <SettingTextInput
                      label='BIC / Swift'
                      value={bankTransferInfo.account_details.bic_swift}
                      onSettingInputChange={(val) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...bankTransferInfo.account_details,
                            bic_swift: val,
                          },
                        })
                      }
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </SettingBlock>
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            size='small'
            color='primary'
            variant='contained'
            onClick={updateBank}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DirectBankTransfer;
