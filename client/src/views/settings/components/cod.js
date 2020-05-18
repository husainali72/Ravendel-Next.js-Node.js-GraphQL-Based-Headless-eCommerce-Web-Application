import React, { Fragment, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
} from "@material-ui/core";

import viewStyles from "../../viewStyles.js";

import { paymentCodUpdateAction } from "../../../store/action";
import { connect } from "react-redux";

const CashOnDelivery = (props) => {
  const classes = viewStyles();

  const [codInfo, setCodInfo] = useState({
    ...props.settingState.settings.paymnet.cash_on_delivery,
  });

  const updateCOD = () => {
    props.paymentCodUpdateAction(codInfo);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5">Enable/Disable</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={codInfo.enable}
                  onChange={(e) =>
                    setCodInfo({ ...codInfo, enable: e.target.checked })
                  }
                />
              }
              label="Enable cash on delivery"
            />
          </Box>
          {codInfo.enable && (
            <Box>
              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Title
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={codInfo.title}
                  onChange={(e) =>
                    setCodInfo({ ...codInfo, title: e.target.value })
                  }
                  className={classes.simpleSettingInput}
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Description
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={codInfo.description}
                  onChange={(e) =>
                    setCodInfo({ ...codInfo, description: e.target.value })
                  }
                  className={classes.simpleSettingInput}
                  multiline
                  rows="5"
                />
              </Box>

              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Instructions
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={codInfo.instructions}
                  onChange={(e) =>
                    setCodInfo({ ...codInfo, instructions: e.target.value })
                  }
                  className={classes.simpleSettingInput}
                />
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item md={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateCOD}
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
  paymentCodUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CashOnDelivery);
