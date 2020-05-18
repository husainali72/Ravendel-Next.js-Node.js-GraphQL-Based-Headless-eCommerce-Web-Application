import React, { Fragment, useState, useEffect } from "react";
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
import { connect } from "react-redux";

const Inventory = (props) => {
  const classes = viewStyles();
  const [inventory, setinventory] = useState({
    ...props.settingState.settings.store.inventory,
    notifications: {
      show_out_of_stock:
        props.settingState.settings.store.inventory.notifications
          .show_out_of_stock,
      alert_for_minimum_stock:
        props.settingState.settings.store.inventory.notifications
          .alert_for_minimum_stock,
    },
  });

  /* useEffect(() => {
    setinventory({
      ...props.settingState.settings.store.inventory,
    });
  }, [props.settingState]); */

  const updateInventory = () => {
    props.storeInventoryUpdateAction(inventory);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5">Manage stock</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={inventory.manage_stock}
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
          </Box>
          {inventory.manage_stock && (
            <Box>
              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5">Notifications</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
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
                  label="Show out of stock products?"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
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
                  label="Alert for Minimum stock."
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Notification recipient(s)
                </Typography>
                <TextField
                  type="email"
                  variant="outlined"
                  size="small"
                  value={inventory.notification_recipients}
                  onChange={(e) =>
                    setinventory({
                      ...inventory,
                      notification_recipients: e.target.value,
                    })
                  }
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Low stock threshold
                </Typography>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  value={inventory.low_stock_threshold}
                  onChange={(e) =>
                    setinventory({
                      ...inventory,
                      low_stock_threshold: parseInt(e.target.value),
                    })
                  }
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Out of stock threshold
                </Typography>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  value={inventory.out_of_stock_threshold}
                  onChange={(e) =>
                    setinventory({
                      ...inventory,
                      out_of_stock_threshold: parseInt(e.target.value),
                    })
                  }
                />
              </Box>
            </Box>
          )}

          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5">Out of stock visibility</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={inventory.out_of_stock_visibility}
                  onChange={(e) =>
                    setinventory({
                      ...inventory,
                      out_of_stock_visibility: e.target.checked,
                    })
                  }
                />
              }
              label="Show out of stock products?"
            />
          </Box>

          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5" className={classes.paddingBottom1}>
              Stock display format
            </Typography>
            <FormControl
              variant="outlined"
              className={clsx(classes.settingInput)}
              size="small"
            >
              <Select
                native
                inputProps={{
                  name: "stock-display-format",
                  id: "stock-display-format",
                }}
                value={inventory.stock_display_format}
                onChange={(e) =>
                  setinventory({
                    ...inventory,
                    stock_display_format: e.target.value,
                  })
                }
              >
                <option value={"inStock"}>
                  Always show quantity remaining in stock e.g. "12 in stock"
                </option>
                <option value={"leftStock"}>
                  Only show quantity remaining in stock when low e.g. "Only 2
                  left in stock"
                </option>
                <option value={"never"}>
                  Never show quantity remaining in stock
                </option>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item md={12}>
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
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { settingState: state.settings };
};

const mapDispatchToProps = {
  storeInventoryUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
