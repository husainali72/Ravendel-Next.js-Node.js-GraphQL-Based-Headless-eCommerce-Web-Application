import React, { Fragment, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Button
} from "@material-ui/core";

import viewStyles from "../../viewStyles.js";

const CashOnDelivery = props => {
  const classes = viewStyles();
  const [cod, setCod] = useState(false);
  const [codInfo, setCodInfo] = useState({
    title: "Cash On Delivery",
    description: "Pay with cash upon delivery.",
    instructions: "Pay with cash upon delivery."
  });
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
                  checked={cod}
                  onChange={e => setCod(e.target.checked)}
                />
              }
              label="Enable cash on delivery"
            />
          </Box>
          {cod && (
            <Box>
              <Box component="div" className={classes.marginBottom2}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Title
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={codInfo.title}
                  onChange={e => setCodInfo({ codInfo, title: e.target.value })}
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
                  onChange={e =>
                    setCodInfo({ codInfo, description: e.target.value })
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
                  onChange={e =>
                    setCodInfo({ codInfo, instructions: e.target.value })
                  }
                  className={classes.simpleSettingInput}
                />
              </Box>
            </Box>
          )}
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

export default CashOnDelivery;
