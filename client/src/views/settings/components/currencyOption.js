import React, { Fragment, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Button,
  Typography,
  FormControl,
  Select,
} from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";
import { storeCurrencyUpdateAction } from "../../../store/action";
import { connect } from "react-redux";

const CurrencyOptions = (props) => {
  const classes = viewStyles();
  const [currencyOption, setCurrencyOption] = useState({
    ...props.settingState.settings.store.currency_options,
  });

  const updateStoreCurrency = () => {
    props.storeCurrencyUpdateAction(currencyOption);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5" className={classes.paddingBottom1}>
              Currency 123
            </Typography>
            <FormControl variant="outlined" size="small">
              <Select
                native
                value={currencyOption.currency}
                onChange={(e) =>
                  setCurrencyOption({
                    ...currencyOption,
                    currency: e.target.value,
                  })
                }
                inputProps={{
                  name: "stock-display-format",
                  id: "stock-display-format",
                }}
                className={classes.simpleSettingInput}
              >
                <option value={"dollar"}>Dollar $</option>
                <option value={"g"}>g</option>
                <option value={"lbs"}>lbs</option>
                <option value={"oz"}>oz</option>
              </Select>
            </FormControl>
          </Box>

          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5" className={classes.paddingBottom1}>
              Currency Position
            </Typography>
            <FormControl variant="outlined" size="small">
              <Select
                native
                value={currencyOption.currency_position}
                onChange={(e) =>
                  setCurrencyOption({
                    ...currencyOption,
                    currency_position: e.target.value,
                  })
                }
                inputProps={{
                  name: "stock-display-format",
                  id: "stock-display-format",
                }}
                className={classes.simpleSettingInput}
              >
                <option value={"left"}>Left</option>
                <option value={"right"}>Right</option>
                <option value={"left_space"}>Left with space</option>
                <option value={"right_space"}>Right with space</option>
              </Select>
            </FormControl>
          </Box>

          <Box component="div">
            <Typography variant="h5" className={classes.paddingBottom1}>
              Thousand separator
            </Typography>
            <TextField
              type="text"
              variant="outlined"
              className={clsx(classes.marginBottom2)}
              size="small"
              value={currencyOption.thousand_separator}
              onChange={(e) =>
                setCurrencyOption({
                  ...currencyOption,
                  thousand_separator: e.target.value,
                })
              }
            />
          </Box>
          <Box component="div">
            <Typography variant="h5" className={classes.paddingBottom1}>
              Decimal separator
            </Typography>
            <TextField
              type="text"
              variant="outlined"
              className={clsx(classes.marginBottom2)}
              size="small"
              value={currencyOption.decimal_separator}
              onChange={(e) =>
                setCurrencyOption({
                  ...currencyOption,
                  decimal_separator: e.target.value,
                })
              }
            />
          </Box>
          <Box component="div">
            <Typography variant="h5" className={classes.paddingBottom1}>
              Number of decimals
            </Typography>
            <TextField
              type="number"
              variant="outlined"
              className={clsx(classes.marginBottom2)}
              size="small"
              value={currencyOption.number_of_decimals}
              onChange={(e) =>
                setCurrencyOption({
                  ...currencyOption,
                  number_of_decimals: parseInt(e.target.value),
                })
              }
            />
          </Box>
        </Grid>
        <Grid item md={12}>
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
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { settingState: state.settings };
};

const mapDispatchToProps = {
  storeCurrencyUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyOptions);
