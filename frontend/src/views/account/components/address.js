import React, { Fragment, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Icon,
  Collapse,
  TextField,
  CardHeader,
  Divider,
  Fade,
  FormControlLabel,
  Checkbox,
  Tooltip
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const Address = props => {
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const addressInput = (label, name, type, value) => {
    return (
      <TextField
        type={type}
        label={label}
        name={name}
        variant="outlined"
        size="small"
        value={value}
        onChange={handleChangeEditAdd}
        className="width-100"
      />
    );
  };
  const addAddress = () => {
    setAddMode(true);
    setEditMode(false);
  };

  const editAddress = adress => {
    console.log(adress);
    setEditMode(true);
    setAddMode(false);
  };

  const handleChangeEditAdd = e => {
    console.log("e", e.target.name);
  };

  const updateAddress = () => {
    setEditMode(false);
  };

  const addNewAddress = () => {
    setAddMode(false);
    setEditMode(false);
  };

  const deleteAddressBook = _id => {
    console.log("delete");
  };

  const cancelAddress = () => {
    setEditMode(false);
    setAddMode(false);
  };

  return (
    <Fragment>
      <Grid container spacing={2} className="margin-bottom-2">
        <Grid item md={12} xs={12}>
          <Collapse in={editMode || addMode ? true : false}>
            <Card>
              <CardHeader title={`${editMode ? "Edit" : "Add"} Adress`} />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item md={3} xs={12}>
                    {addressInput("First Name", "first_name", "text", "")}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    {addressInput("Last Name", "last_name", "text", "")}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    {addressInput("Company", "company", "text", "")}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    {addressInput("Phone", "phone", "tel", "")}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    {addressInput("Address line1", "address_line1", "text", "")}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    {addressInput("Address line2", "address_line2", "text", "")}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    {addressInput("City", "city", "text", "")}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    {addressInput("Country", "country", "text", "")}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    {addressInput("State", "state", "text", "")}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    {addressInput("Pincode", "pincode", "text", "")}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControlLabel
                      control={<Checkbox name="checkedB" color="primary" />}
                      label="Make it Default Address"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={editMode ? updateAddress : addNewAddress}
                  variant="contained"
                >
                  {editMode ? "Update" : "Add"}
                </Button>
                <Button
                  size="small"
                  onClick={cancelAddress}
                  variant="contained"
                >
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </Collapse>
          <Fade in={!addMode} className={editMode ? "margin-top-2" : ""}>
            <Button
              size="small"
              color="primary"
              onClick={addAddress}
              variant="contained"
            >
              Add New Address
            </Button>
          </Fade>
        </Grid>

        <Grid item md={6}>
          <Card>
            <CardContent>
              <Grid container spacing={2} className="position-relative">
                <Tooltip
                  className="default-address"
                  title={
                    1 === 1
                      ? "Default Address"
                      : "Edit the address and check the 'Default Address' option to make it your default address."
                  }
                  aria-label="Default-Address"
                >
                  <Button>
                    <Rating name="Default Address" value={1} max={1} readOnly />
                  </Button>
                </Tooltip>
                <Grid item>
                  <Icon>face</Icon>
                </Grid>
                <Grid item>
                  <Typography variant="body1">FirstName, LastName</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item>
                  <Icon>home</Icon>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    AddressLine 1, AddressLine 2
                  </Typography>
                  <Typography variant="body1">City, State, Pincode</Typography>
                  <Typography variant="body1">Country</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item>
                  <Icon>call</Icon>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Phone No.</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item>
                  <Icon>email</Icon>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Email</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item>
                  <Icon>business</Icon>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Company Name</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => editAddress("address")}
              >
                EDIT
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => deleteAddressBook("ID")}
              >
                DELETE
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Address;
