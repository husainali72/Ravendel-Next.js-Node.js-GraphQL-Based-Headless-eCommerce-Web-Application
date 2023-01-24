import React, { useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import {get} from "lodash";

import { useSelector, useDispatch } from "react-redux";
import { SettingSelectComponent } from "./setting-components";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import { storeMeasuresUpdateAction } from "../../../store/action";

const MeasurementsComponent = () => {
  const settingState = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [measurementVal, setMeasurementVal] = useState({
    ...settingState.settings.store.measurements,
  });

  useEffect(() => {
   get(settingState, "settings.store.measurements")
  }, [settingState.settings])

  const updateMeasures = () => {
    dispatch(storeMeasuresUpdateAction(measurementVal));
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div" mb={3}>
            <SettingSelectComponent
              label="Weight unit"
              name="weight-unit"
              value={measurementVal.weight_unit}
              onSelecteChange={(val) =>
                setMeasurementVal({
                  ...measurementVal,
                  weight_unit: val,
                })
              }
              items={[
                { name: "Kilo Gram (KG)", value: "kg" },
                { name: "Gram (G)", value: "g" },
                { name: "LBS", value: "lbs" },
                { name: "OZ", value: "oz" },
              ]}
            />
          </Box>
          <Box component="div" mb={3}>
            <SettingSelectComponent
              label="Dimensions unit"
              name="dimensions-unit"
              value={measurementVal.dimensions_unit}
              onSelecteChange={(val) =>
                setMeasurementVal({
                  ...measurementVal,
                  dimensions_unit: val,
                })
              }
              items={[
                { name: "M", value: "m" },
                { name: "CM", value: "cm" },
                { name: "MM", value: "mm" },
                { name: "Inch", value: "in" },
                { name: "Yard", value: "yd" },
              ]}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateMeasures}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function Measurements() {
  return (
    <ThemeProvider theme={theme}>
      <MeasurementsComponent />
    </ThemeProvider>
  );
}
