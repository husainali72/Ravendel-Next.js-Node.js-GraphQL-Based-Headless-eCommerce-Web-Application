import React from "react";
import {
  Grid,
  FormControlLabel,
  FormControl,
  Select,
  RadioGroup,
  Radio,
  Button,
  Checkbox,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import viewStyles from "../../viewStyles.js";
import theme from "../../../theme/index.js";
import { ThemeProvider } from "@mui/material/styles";
import { get } from "lodash";
const GlobalShippingComponentComponent = ({
  shippingGlobalState,
  onGlobalShippingInputChange,
  saveGlobal,
  shippingState,
}) => {
  const classes = viewStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Grid container spacing={1} className={classes.marginBottom}>
        <Grid item md={6} sm={12} xs={12}>
          <Grid container spacing={1}>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={get(shippingGlobalState, "is_global", false)}
                    onChange={(e) =>
                      onGlobalShippingInputChange("is_global", e.target.checked)
                    }
                  />
                }
                label="Global Shipping"
              />
            </Grid>
            {get(shippingGlobalState, "is_global") && (
              <Grid item md={6} sm={12} xs={12}>
                <FormControl
                  variant="outlined"
                  size="small"
                  fullWidth
                  style={{ marginBottom: isSmall ? 20 : 0 }}
                >
                  <Select
                    labelId="Shipping-name"
                    id="Shipping-name"
                    name="Shipping-name"
                    value={get(shippingGlobalState, "shippingClass")}
                    onChange={(e) =>
                      onGlobalShippingInputChange(
                        "shippingClass",
                        e.target.value
                      )
                    }
                  >
                    {shippingState.shipping.shippingClass.map(
                      (shipping, index) => {
                        return (
                          <MenuItem value={shipping._id} key={index}>
                            {shipping.name}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
          {shippingGlobalState?.is_global && (
            <Grid item md={12} sm={12} xs={12}>
              <RadioGroup
                aria-label="taxOption"
                value={
                  shippingGlobalState.is_per_order ? "per_order" : "per_product"
                }
                onChange={(e) =>
                  onGlobalShippingInputChange(
                    "is_per_order",
                    e.target.value === "per_order"
                  )
                }
              >
                <FormControlLabel
                  value="per_order"
                  control={<Radio color="primary" />}
                  label="Per Order"
                />
                <FormControlLabel
                  value="per_product"
                  control={<Radio color="primary" />}
                  label="Per Product"
                />
              </RadioGroup>
            </Grid>
          )}

          {shippingGlobalState.is_global && (
            <Grid item md={12} sm={12} xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={shippingGlobalState.overwrite}
                    onChange={(e) =>
                      onGlobalShippingInputChange("overwrite", e.target.checked)
                    }
                  />
                }
                label="Do you want to override the current shipping class selection in the existing products?"
              />
            </Grid>
          )}
        </Grid>
      </Grid>

      <Button
        size="small"
        color="primary"
        onClick={saveGlobal}
        variant="contained"
      >
        Save Changes
      </Button>
    </>
  );
};

const GlobalShippingComponent = ({
  shippingGlobalState,
  onGlobalShippingInputChange,
  saveGlobal,
  shippingState,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalShippingComponentComponent
        shippingGlobalState={shippingGlobalState}
        onGlobalShippingInputChange={onGlobalShippingInputChange}
        saveGlobal={saveGlobal}
        shippingState={shippingState}
      />
    </ThemeProvider>
  );
};
export default GlobalShippingComponent;
