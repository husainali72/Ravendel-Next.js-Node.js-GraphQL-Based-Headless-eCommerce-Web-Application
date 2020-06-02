import React, { Fragment, useState } from "react";
import { Grid, TextField, Box, Button } from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";

import { appearanceThemeUpdateAction } from "../../../store/action";
import { connect } from "react-redux";
import { isEmpty } from "../../../utils/helper";

const Themes = (props) => {
  const classes = viewStyles();
  const [themeSetting, setThemeSetting] = useState({
    ...props.settingState.settings.appearance.theme,
  });

  const updateTheme = () => {
    props.appearanceThemeUpdateAction(themeSetting);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box component="div">
            <TextField
              type="color"
              variant="outlined"
              label="Primary Color"
              className={clsx(classes.settingInput)}
              value={themeSetting.primary_color}
              onChange={(e) =>
                setThemeSetting({
                  ...themeSetting,
                  primary_color: e.target.value,
                })
              }
            />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateTheme}
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
  appearanceThemeUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Themes);
