import React, { Fragment, useState } from "react";
import {
  Grid,
  Box,
  Button,
} from "@material-ui/core";
import { storeMeasuresUpdateAction } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { SettingSelectComponent } from "./setting-components";

const Measurements = () => {
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [measurementVal, setMeasurementVal] = useState({
    ...settingState.settings.store.measurements,
  });
  const updateMeasures = () => {
    dispatch(storeMeasuresUpdateAction(measurementVal));
  };
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component='div' mb={3}>
            <SettingSelectComponent
              label='Weight unit'
              name='weight-unit'
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
          <Box component='div' mb={3}>
            <SettingSelectComponent
              label='Dimensions unit'
              name='dimensions-unit'
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
            size='small'
            color='primary'
            variant='contained'
            onClick={updateMeasures}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Measurements;
