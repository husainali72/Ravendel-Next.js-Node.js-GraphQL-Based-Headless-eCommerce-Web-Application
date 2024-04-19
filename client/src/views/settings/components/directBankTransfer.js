import React, { useState } from "react";
import {
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import viewStyles from "../../viewStyles";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput, SettingBlock } from "./setting-components/";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import { useEffect } from "react";
import { get } from "lodash";
import { paymentBankUpdateAction } from "../../../store/action";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";

const DirectBankTransferTheme = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const settingState = useSelector((state) => state.settings);
  const [bankTransferInfo, setBankTransferInfo] = useState({ enable: false });

  useEffect(() => {
    if (get(settingState, "settings.payment.bank_transfer")) {
      setBankTransferInfo({
        ...get(settingState, "settings.payment.bank_transfer"),
      });
    }
  }, [get(settingState, "settings")]);

  const updateBank = () => {
    delete bankTransferInfo.account_details.__typename;
    dispatch(paymentBankUpdateAction(bankTransferInfo));
  };

  return (
    <>
      <Alerts />
      {get(settingState, "loading") ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div" className={classes.marginBottom2}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={get(bankTransferInfo, "enable")}
                  onChange={(e) =>
                    setBankTransferInfo({
                      ...bankTransferInfo,
                      enable: get(e, "target.checked"),
                    })
                  }
                />
              }
              label="Enable bank transfer"
            />
          </Box>
          {get(bankTransferInfo, "enable") && (
            <Box>
              <Box component="div">
                <SettingTextInput
                  label="Title"
                  value={get(bankTransferInfo, "title")}
                  onSettingInputChange={(val) =>
                    setBankTransferInfo({
                      ...bankTransferInfo,
                      title: val,
                    })
                  }
                />
              </Box>

              <Box component="div">
                <SettingTextInput
                  label="Description"
                  value={get(bankTransferInfo, "description")}
                  onSettingInputChange={(val) =>
                    setBankTransferInfo({
                      ...bankTransferInfo,
                      description: val,
                    })
                  }
                />
              </Box>

              {/* <Box component="div">
                <SettingTextInput
                  label="Instructions"
                  value={get(bankTransferInfo, "instruction")}
                  onSettingInputChange={(val) =>
                    setBankTransferInfo({
                      ...bankTransferInfo,
                      instructions: val,
                    })
                  }
                />
              </Box> */}

              <SettingBlock label="Account details">
                <Grid container spacing={isSmall ? 0 : 2}>
                  <Grid item lg={4} md={6} xs={12}>
                    <SettingTextInput
                      label="Account Name"
                      value={get(
                        bankTransferInfo,
                        "account_details.account_name"
                      )}
                      onSettingInputChange={(val) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...get(bankTransferInfo, "account_details"),
                            account_name: val,
                          },
                        })
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={4} md={6} xs={12}>
                    <SettingTextInput
                      label="Account number"
                      value={get(
                        bankTransferInfo,
                        "account_details.account_number"
                      )}
                      onSettingInputChange={(val) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...get(bankTransferInfo, "account_details"),
                            account_number: val,
                          },
                        })
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={4} md={6} xs={12}>
                    <SettingTextInput
                      label="Bank name"
                      value={get(bankTransferInfo, "account_details.bank_name")}
                      onSettingInputChange={(val) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...get(bankTransferInfo, "account_details"),
                            bank_name: val,
                          },
                        })
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={4} md={6} xs={12}>
                    <SettingTextInput
                      label="Sort code"
                      value={get(
                        bankTransferInfo,
                        "account_details.short_code"
                      )}
                      onSettingInputChange={(val) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...get(bankTransferInfo, "account_details"),
                            short_code: val,
                          },
                        })
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={4} md={6} xs={12}>
                    <SettingTextInput
                      label="IBAN"
                      value={get(bankTransferInfo, "account_details.iban")}
                      onSettingInputChange={(val) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...get(bankTransferInfo, "account_details"),
                            iban: val,
                          },
                        })
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={4} md={6} xs={12}>
                    <SettingTextInput
                      label="BIC / Swift"
                      value={get(bankTransferInfo, "account_details.bic_swift")}
                      onSettingInputChange={(val) =>
                        setBankTransferInfo({
                          ...bankTransferInfo,
                          account_details: {
                            ...get(bankTransferInfo, "account_details"),
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
            size="small"
            color="primary"
            variant="contained"
            onClick={updateBank}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function DirectBankTransfer() {
  return (
    <ThemeProvider theme={theme}>
      <DirectBankTransferTheme />
    </ThemeProvider>
  );
}
