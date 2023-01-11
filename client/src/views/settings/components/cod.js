import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
} from"@mui/material";
import viewStyles from "../../viewStyles.js";
import { paymentCodUpdateAction } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import {SettingTextInput} from './setting-components/';
import  { get } from "lodash";

const CashOnDelivery = (props) => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [codInfo, setCodInfo] = useState({});
  // const [codInfo, setCodInfo] = useState({
  //   ...settingState.settings.paymnet.cash_on_delivery,
  // });

  useEffect(() => {
    // if(settingState.settings && settingState.settings.paymnet && settingState.settings.paymnet.cash_on_delivery){
    //   setCodInfo({ ...settingState.settings.paymnet.cash_on_delivery })
    // }
    get(settingState, 'settings.paymnet.cash_on_delivery')
  }, [settingState.settings])

  const updateCOD = () => {
    // dispatch(paymentCodUpdateAction(codInfo));
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component='div' className={classes.marginBottom2}>
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  checked={codInfo.enable}
                  onChange={(e) =>
                    setCodInfo({ ...codInfo, enable: e.target.checked })
                  }
                />
              }
              label='Enable cash on delivery'
            />
          </Box>
          {codInfo.enable && (
            <Box>
              <Box component='div'>
                <SettingTextInput
                  label='Title'
                  value={codInfo.title}
                  onSettingInputChange={(val) =>
                    setCodInfo({ ...codInfo, title: val })
                  }
                />
              </Box>

              <Box component='div'>
                <SettingTextInput
                  label='Description'
                  value={codInfo.description}
                  onSettingInputChange={(val) =>
                    setCodInfo({ ...codInfo, description: val })
                  }
                />
              </Box>

              <Box component='div'>
                <SettingTextInput
                  label='Instructions'
                  value={codInfo.instructions}
                  onSettingInputChange={(val) =>
                    setCodInfo({ ...codInfo, instructions: val })
                  }
                />
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            size='small'
            color='primary'
            variant='contained'
            onClick={updateCOD}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CashOnDelivery;
