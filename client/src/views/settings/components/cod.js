import React, { useState, useEffect } from "react";
import { Grid, Box, FormControlLabel, Checkbox, Button } from "@mui/material";
import viewStyles from "../../viewStyles.js";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput } from "./setting-components/";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import { get, isEmpty } from "lodash";
import { paymentCodUpdateAction } from "../../../store/action/settingAction.js";
import Alerts from "../../components/Alert.js";
import Loading from "../../components/Loading.js";

const CashOnDeliveryTheme = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [codInfo, setCodInfo] = useState({
    enable: false
  });

  useEffect(() => {
    if (!isEmpty(get(settingState, "settings.payment.cash_on_delivery"))) {
      setCodInfo({ ...get(settingState, "settings.payment.cash_on_delivery") });
    }
  }, [get(settingState, "settings")]);

  const updateCOD = () => {
    dispatch(paymentCodUpdateAction(codInfo));
  };

  const checkBoxOnChange = (index) => {
    let data = codInfo;
    data.enable = !get(data,'enable')
    setCodInfo({ ...data })
  };

  return (
    <>
      <Alerts />
      {get(settingState,'loading') ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div" className={classes.marginBottom2}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={get(codInfo,'enable')}
                  onChange={(e) => {
                    checkBoxOnChange(get(e,'target.checked'))
                  }}
                />
              }
              label="Enable cash on delivery"
            />
          </Box>

          {codInfo.enable ? (
            <Box>
              <Box component="div">
                <SettingTextInput
                  label="Title"
                  value={get(codInfo,'title')}
                  onSettingInputChange={(val) =>
                    setCodInfo({ ...codInfo, title: val })
                  }
                />
              </Box>

              <Box component="div">
                <SettingTextInput
                  label="Description"
                  value={get(codInfo,'description')}
                  onSettingInputChange={(val) =>
                    setCodInfo({ ...codInfo, description: val })
                  }
                />
              </Box>

              <Box component="div">
                <SettingTextInput
                  label="Instructions"
                  value={get(codInfo,'instructions')}
                  onSettingInputChange={(val) =>
                    setCodInfo({ ...codInfo, instructions: val })
                  }
                />
              </Box>
            </Box>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateCOD}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function CashOnDelivery() {
  return (
    <ThemeProvider theme={theme}>
      <CashOnDeliveryTheme />
    </ThemeProvider>
  );
}
