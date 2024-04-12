import React, { useState } from "react";
import {
  Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import viewStyles from "../../viewStyles";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput } from "./setting-components/";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { get } from "lodash";
import theme from "../../../theme/index.js";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";
import { orderOptionUpdateAction } from "../../../store/action/settingAction";
const OrderOptionComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [orderOption, setOrderOption] = useState({});

  useEffect(() => {
    if (get(settingState, "settings.store.order_options")) {
      setOrderOption({ ...get(settingState, "settings.store.order_options") });
    }
  }, [get(settingState, "settings")]);
  const updateOneSignal = () => {
    delete theme.__typename;
    dispatch(orderOptionUpdateAction(orderOption));
  };
  return (
    <>
      <Alerts />
      {settingState?.loading ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <Box component="div">
            <SettingTextInput
              type="number"
              label="Order Digits"
              value={get(orderOption, "order_digits")}
              onSettingInputChange={(val) =>
                setOrderOption({ ...orderOption, order_digits: parseInt(val) })
              }
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              label="Order Prefix"
              value={get(orderOption, "order_prefix")}
              onSettingInputChange={(val) =>
                setOrderOption({ ...orderOption, order_prefix: val })
              }
              type="text"
            />
          </Box>
          <Box component="div" className={classes.orderOptionContainer}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" size="small">
                Order Prefix List
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={get(orderOption, "order_prefix")}
                label="Order Prefix List"
                size="small"
                onChange={(e) => {
                  setOrderOption({
                    ...orderOption,
                    order_prefix: e.target.value,
                  });
                }}
              >
                {get(orderOption, "order_prefix_list")?.length > 0 ? (
                  get(orderOption, "order_prefix_list")?.map((orderPrefix) => {
                    return (
                      <MenuItem value={orderPrefix}>{orderPrefix}</MenuItem>
                    );
                  })
                ) : (
                  <p className={classes.noOptions}>No options available</p>
                )}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateOneSignal}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function OrderOption() {
  return (
    <ThemeProvider theme={theme}>
      <OrderOptionComponent />
    </ThemeProvider>
  );
}
