import React from "react";
import {
  Grid,
  FormControl,
  FormControlLabel,
  Button,
  Checkbox,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import viewStyles from "../../viewStyles.js";
import theme from "../../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { get } from "lodash";
const GlobalTaxesComponent = ({
  taxGlobalState,
  taxState,
  saveGlobal,
  changeGlobalState,
}) => {
  const classes = viewStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid container spacing={2} className={classes.marginBottom}>
        <Grid item md={6} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={get(taxGlobalState,'is_global',false)}
                    onChange={(e) =>
                      changeGlobalState("is_global", e.target.checked)
                    }
                  />
                }
                label="Global Tax"
              />
            </Grid>

           { get(taxGlobalState,'is_global')&&<Grid item md={6} sm={12} xs={12}>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                style={{ marginBottom: isSmall ? 20 : 0 }}
              >
                <Select
                  name="Tax-name"
                  value={get(taxGlobalState,'taxClass','')}
                  onChange={(e) =>
                    changeGlobalState("taxClass", e.target.value)
                  }
                >
                  {taxState.tax.taxClass.map((tax, index) => {
                    return (
                      <MenuItem value={tax._id} key={index}>
                        {tax.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>}

            {get(taxGlobalState,'is_global') && (
              <Grid item md={12} sm={12} xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={taxGlobalState.overwrite}
                      onChange={(e) =>
                        changeGlobalState("overwrite", e.target.checked)
                      }
                    />
                  }
                  label="Do you want to override the current tax class selection in the existing products?"
                />
              </Grid>
            )}
          </Grid>
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

const GlobalTaxComponent = ({
  taxGlobalState,
  taxState,
  saveGlobal,
  changeGlobalState,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalTaxesComponent
        taxGlobalState={taxGlobalState}
        taxState={taxState}
        saveGlobal={saveGlobal}
        changeGlobalState={changeGlobalState}
      />
    </ThemeProvider>
  );
};
export default GlobalTaxComponent;
