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
import { connect } from "react-redux";

const Inventory = (props) => {
  const classes = viewStyles();
  const [manageStock, setManageStock] = useState(false);
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
                  value={manageStock}
                  onChange={(e) => setManageStock(e.target.checked)}
                />
              }
              label="Do you want to track the inventory?"
            />
          </Box>
          {manageStock && (
            <Box>
              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5">Notifications</Typography>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Show out of stock products?"
                />
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Alert for Minimum stock."
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Notification recipient(s)
                </Typography>
                <TextField type="email" variant="outlined" size="small" />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Low stock threshold
                </Typography>
                <TextField type="number" variant="outlined" size="small" />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Out of stock threshold
                </Typography>
                <TextField type="number" variant="outlined" size="small" />
              </Box>
            </Box>
          )}

          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5">Out of stock visibility</Typography>
            <FormControlLabel
              control={<Checkbox color="primary" />}
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
          <Button size="small" color="primary" variant="contained">
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
