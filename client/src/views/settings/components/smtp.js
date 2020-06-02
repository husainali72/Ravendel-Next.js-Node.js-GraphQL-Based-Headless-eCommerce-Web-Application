import React, { Fragment, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Select,
  Button,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";
import { smtpUpdateAction } from "../../../store/action";
import { connect } from "react-redux";

const SMTP = (props) => {
  const classes = viewStyles();
  const [smtp, setSmptp] = useState({ ...props.settingState.settings.smtp });

  const updateSmtp = () => {
    props.smtpUpdateAction(smtp);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="SMTP server"
              className={clsx(classes.settingInput, classes.marginRight2)}
              size="small"
              value={smtp.server}
              onChange={(e) => setSmptp({ ...smtp, server: e.target.value })}
            />
          </Box>
          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="SMTP username"
              className={clsx(classes.settingInput)}
              size="small"
              value={smtp.username}
              onChange={(e) => setSmptp({ ...smtp, username: e.target.value })}
            />
          </Box>
          <Box component="div">
            <TextField
              type="password"
              variant="outlined"
              label="SMTP username"
              className={clsx(classes.settingInput)}
              size="small"
              value={smtp.password}
              onChange={(e) => setSmptp({ ...smtp, password: e.target.value })}
            />
          </Box>
          <Box component="div">
            <FormControl
              variant="outlined"
              className={clsx(classes.settingInput)}
              size="small"
            >
              <InputLabel htmlFor="smtp-port">SMTP Port</InputLabel>
              <Select
                native
                label="SMTP Port "
                inputProps={{
                  name: "smtp-port",
                  id: "smtp-port",
                }}
                value={smtp.port}
                onChange={(e) =>
                  setSmptp({ ...smtp, port: parseInt(e.target.value) })
                }
              >
                <option value={465}>465 (SSL)</option>
                <option value={587}>587 (TLS)</option>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item md={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateSmtp}
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
  smtpUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SMTP);
