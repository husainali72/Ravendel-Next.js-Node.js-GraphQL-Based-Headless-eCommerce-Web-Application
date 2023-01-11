import React, { useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import  { get } from "lodash";
import { SettingSelectComponent } from "./setting-components";
import { SettingTextInput } from "./setting-components";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import { useEffect } from "react";
const CurrencyOptionsComponent = () => {
  const settingState = useSelector((state) => state.settings);
  const [currencyOption, setCurrencyOption] = useState({
    // ...settingState.settings.store.currency_options,
  });


  //   // ...settingState.settings.store.currency_options,
    
  //   get(settingState, 'settings.store.currency_options')

useEffect(() => {
   
    get(settingState, 'settings.store.currency_options')
  }, [settingState.settings])



  

  const updateStoreCurrency = () => {
    // dispatch(storeCurrencyUpdateAction(currencyOption));
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div" mb={3}>
            <SettingSelectComponent
              label="Currency"
              name="Currency"
              value={currencyOption.currency}
              onSelecteChange={(val) =>
                setCurrencyOption({
                  ...currencyOption,
                  currency: val,
                })
              }
              items={[
                { name: "U.S. Dollar (USD)", value: "dollar" },
                { name: "Euro (EUR)", value: "eur" },
                { name: "British Pound (GBP)", value: "gbp" },
                { name: "Canadian Dollar (CAD)", value: "cad" },
              ]}
            />
          </Box>

          <Box component="div" mb={3}>
            <SettingSelectComponent
              label="Currency Position"
              name="currency-position"
              value={currencyOption.currency_position}
              onSelecteChange={(val) =>
                setCurrencyOption({
                  ...currencyOption,
                  currency_position: val,
                })
              }
              items={[
                { name: "Left", value: "left" },
                { name: "Right", value: "right" },
                { name: "Left with space", value: "left_space" },
                { name: "Right with space", value: "right_space" },
              ]}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={currencyOption.thousand_separator}
              label="Thousand separator"
              onSettingInputChange={(val) => {
                setCurrencyOption({
                  ...currencyOption,
                  thousand_separator: val,
                });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={currencyOption.decimal_separator}
              label="Decimal separator"
              onSettingInputChange={(val) => {
                setCurrencyOption({
                  ...currencyOption,
                  decimal_separator: val,
                });
              }}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              value={currencyOption.number_of_decimals}
              label="Number of decimals"
              onSettingInputChange={(val) => {
                setCurrencyOption({
                  ...currencyOption,
                  number_of_decimals: parseInt(val),
                });
              }}
              type="number"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateStoreCurrency}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function CurrencyOptions() {
  return (
    <ThemeProvider theme={theme}>
      <CurrencyOptionsComponent />
    </ThemeProvider>
  );
}
