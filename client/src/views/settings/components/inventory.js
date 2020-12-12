import React, { Fragment, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Select,
  FormControl,
  Button,
} from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";
import { storeInventoryUpdateAction } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import {
  SettingTextInput,
  SettingSelectComponent,
  SettingBlock,
} from "./setting-components";

const Inventory = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [inventory, setinventory] = useState({
    ...settingState.settings.store.inventory,
    notifications: {
      show_out_of_stock:
        settingState.settings.store.inventory.notifications.show_out_of_stock,
      alert_for_minimum_stock:
        settingState.settings.store.inventory.notifications
          .alert_for_minimum_stock,
    },
  });

  const updateInventory = () => {
    dispatch(storeInventoryUpdateAction(inventory));
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SettingBlock label='Manage stock' noBottomMargin>
            <Box component='div' className={classes.marginBottom2}>
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={inventory.manage_stock}
                    onChange={(e) =>
                      setinventory({
                        ...inventory,
                        manage_stock: e.target.checked,
                      })
                    }
                  />
                }
                label='Do you want to track the inventory?'
              />
            </Box>
          </SettingBlock>
          {inventory.manage_stock ? (
            <SettingBlock label='Notifications' noBottomMargin>
              <Box component='div' className={classes.marginBottom2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={inventory.notifications.show_out_of_stock}
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
                  label='Show out of stock products?'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={inventory.notifications.alert_for_minimum_stock}
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
                  label='Alert for Minimum stock.'
                />
              </Box>

              <Box component='div'>
                <SettingTextInput
                  value={inventory.notification_recipients}
                  label='Notification recipient(s)'
                  onSettingInputChange={(val) => {
                    setinventory({
                      ...inventory,
                      notification_recipients: val,
                    });
                  }}
                />
              </Box>

              <Box component='div'>
                <SettingTextInput
                  value={inventory.low_stock_threshold}
                  label='Low stock threshold'
                  onSettingInputChange={(val) => {
                    setinventory({
                      ...inventory,
                      low_stock_threshold: parseInt(val),
                    });
                  }}
                />
              </Box>

              <Box component='div'>
                <SettingTextInput
                  value={inventory.out_of_stock_threshold}
                  label='Out of stock threshold'
                  onSettingInputChange={(val) => {
                    setinventory({
                      ...inventory,
                      out_of_stock_threshold: parseInt(val),
                    });
                  }}
                />
              </Box>
            </SettingBlock>
          ) : null}

          <Box component='div' className={classes.marginBottom2}>
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  checked={inventory.out_of_stock_visibility}
                  onChange={(e) =>
                    setinventory({
                      ...inventory,
                      out_of_stock_visibility: e.target.checked,
                    })
                  }
                />
              }
              label='Show out of stock products?'
            />
          </Box>

          <Box component='div' className={classes.marginBottom2}>
            <SettingSelectComponent
              label='Stock display format'
              name='currency-position'
              value={inventory.stock_display_format}
              onSelecteChange={(val) =>
                setinventory({
                  ...inventory,
                  stock_display_format: val,
                })
              }
              items={[
                {
                  name:
                    "Always show quantity remaining in stock e.g. '12 in stock'",
                  value: "inStock",
                },
                {
                  name:
                    "Only show quantity remaining in stock when low e.g. 'Only 2 left in stock'",
                  value: "leftStock",
                },
                {
                  name: "Never show quantity remaining in stock",
                  value: "never",
                },
              ]}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            size='small'
            color='primary'
            variant='contained'
            onClick={updateInventory}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Inventory;
