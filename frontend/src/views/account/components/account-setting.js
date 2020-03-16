import React, { Fragment } from "react";
import {
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  CardActions
} from "@material-ui/core";

const AccountSetting = props => {
  const handleChangedAccount = e => {
    console.log("e", e.target.name);
  };

  const updateDeatils = () => {
    console.log("Update");
  };

  const accountInput = (label, name, type, value) => {
    return (
      <TextField
        type={type}
        label={label}
        name={name}
        variant="outlined"
        size="small"
        value={value}
        onChange={handleChangedAccount}
        className="width-100"
      />
    );
  };

  return (
    <Fragment>
      <Grid container className="margin-top-3 margin-bottom-3">
        <Grid item md={12} xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={3} xs={12}>
                  {accountInput("First Name", "first_name", "text", "")}
                </Grid>
                <Grid item md={3} xs={12}>
                  {accountInput("Last Name", "last_name", "text", "")}
                </Grid>
                <Grid item md={3} xs={12}>
                  {accountInput("Company", "company", "text", "")}
                </Grid>
                <Grid item md={3} xs={12}>
                  {accountInput("Phone", "phone", "tel", "")}
                </Grid>
                <Grid item md={3} xs={12}>
                  {accountInput("Email", "email", "email", "")}
                </Grid>
                <Grid item md={3} xs={12}>
                  {accountInput("Password", "password", "password", "")}
                </Grid>
                <Grid item md={3} xs={12}>
                  {accountInput(
                    "Confirm Password",
                    "cnfrm_password",
                    "password",
                    ""
                  )}
                </Grid>
                <Grid item md={3} xs={12}>
                  {accountInput(
                    "Current Password",
                    "current_password",
                    "password",
                    ""
                  )}
                </Grid>
              </Grid>
            </CardContent>
            <CardActions className="justify-center">
              <Button
                size="small"
                color="primary"
                onClick={updateDeatils}
                variant="contained"
              >
                Update Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AccountSetting;
