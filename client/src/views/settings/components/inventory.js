import React, { useState } from "react";
import {
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import viewStyles from "../../viewStyles.js";
import { useSelector, useDispatch } from "react-redux";
import {
  SettingTextInput,
  SettingSelectComponent,
  SettingBlock,
} from "./setting-components";
import { ThemeProvider } from "@mui/material/styles";
import { get } from "lodash";
import theme from "../../../theme/index.js";
import { storeInventoryUpdateAction } from "../../../store/action/settingAction.js";
import Alerts from "../../components/Alert.js";
import Loading from "../../components/Loading.js";
import clsx from "clsx";
import "../../../App.css";
const stockOptions = [
  {
    name: "Always show quantity remaining in stock e.g. '12 in stock'",
    value: "inStock",
  },
  {
    name: "Only show quantity remaining in stock when low e.g. 'Only 2 left in stock'",
    value: "leftStock",
  },
  {
    name: "Never show quantity remaining in stock",
    value: "never",
  },
];
const InventoryComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [inventory, setinventory] = useState({
    ...get(settingState, "settings.store.inventory"),
    notifications: {
      show_out_of_stock: get(
        settingState,
        "settings.store.inventory.notifications.show_out_of_stock"
      ),
      alert_for_minimum_stock: get(
        settingState,
        "settings.store.inventory.notifications.alert_for_minimum_stock"
      ),
    },
  });

  const updateInventory = () => {
    dispatch(storeInventoryUpdateAction(inventory));
  };

  return (
    <>
      <Alerts />
      {get(settingState, "loading") ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SettingBlock label="Manage stock" noBottomMargin>
            <Box component="div" className={classes.marginBottom2}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={get(inventory, "manage_stock", false)}
                    onChange={(e) =>
                      setinventory({
                        ...inventory,
                        manage_stock: e.target.checked,
                      })
                    }
                  />
                }
                label="Do you want to track the inventory?"
              />
              {get(inventory, "manage_stock") && (
                <Box component="div" className={classes.marginBottom2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={get(
                          inventory,
                          "notifications.show_out_of_stock",
                          false
                        )}
                        onChange={(e) =>
                          setinventory({
                            ...inventory,
                            notifications: {
                              ...inventory.notifications,
                              show_out_of_stock: e.target.checked,
                            },
                          })
                        }
                      />
                    }
                    label="Show out of stock products?"
                  />
                </Box>
              )}
            </Box>
          </SettingBlock>
          {get(inventory, "manage_stock") ? (
            <SettingBlock label="Notifications" noBottomMargin>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={get(
                      inventory,
                      "notifications.alert_for_minimum_stock",
                      false
                    )}
                    onChange={(e) =>
                      setinventory({
                        ...inventory,
                        notifications: {
                          ...inventory.notifications,
                          alert_for_minimum_stock: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Alert for Minimum stock."
              />
              {get(
                inventory,
                "notifications.alert_for_minimum_stock",
                false
              ) && (
                <>
                  {" "}
                  <Box component="div">
                    <SettingTextInput
                      value={get(inventory, "notification_recipients", "")}
                      label="Notification recipient(s)"
                      onSettingInputChange={(val) => {
                        setinventory({
                          ...inventory,
                          notification_recipients: val,
                        });
                      }}
                    />
                  </Box>
                  <Box component="div">
                    <SettingTextInput
                      value={get(inventory, "low_stock_threshold", 0)}
                      label="Low stock threshold"
                      onSettingInputChange={(val) => {
                        setinventory({
                          ...inventory,
                          low_stock_threshold: parseInt(val || 0),
                        });
                      }}
                    />
                  </Box>
                </>
              )}
              <Box component="div">
                <SettingTextInput
                  value={get(inventory, "out_of_stock_threshold", 1)}
                  label="Out of stock threshold"
                  onSettingInputChange={(val) => {
                    setinventory({
                      ...inventory,
                      out_of_stock_threshold: parseInt(val || 0),
                    });
                  }}
                />
              </Box>
            </SettingBlock>
          ) : null}
          {get(inventory, "manage_stock") && (
            <Box component="div" className={classes.marginBottom2}>
              <SettingSelectComponent
                label="Stock display format"
                name="currency-position"
                value={get(inventory, "stock_display_format")}
                otherClass={classes.marginRight2}
                onSelecteChange={(val) =>
                  setinventory({
                    ...inventory,
                    stock_display_format: val,
                  })
                }
                items={stockOptions}
              />

              {get(inventory, "stock_display_format") === "leftStock" && (
                <SettingTextInput
                  value={get(inventory, "left_quantity", 0)}
                  label="Quantity"
                  otherClass={classes.marginRight}
                  onSettingInputChange={(val) => {
                    setinventory({
                      ...inventory,
                      left_quantity: parseInt(val || 0),
                    });
                  }}
                />
              )}
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateInventory}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function Inventory() {
  return (
    <ThemeProvider theme={theme}>
      <InventoryComponent />
    </ThemeProvider>
  );
}
