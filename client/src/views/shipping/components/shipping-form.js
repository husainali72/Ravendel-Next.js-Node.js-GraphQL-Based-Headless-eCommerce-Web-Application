import React from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  TextField,
  Box,
  CardActions,
  Button,
} from "@material-ui/core";
import viewStyles from "../../viewStyles.js";

const ShippingFormComponent = ({
  formMode,
  onInputChange,
  cancelShipping,
  updateCustomShipping,
  addCustomShipping,
  customShippingClass,
}) => {
  const classes = viewStyles();
  return (
    <Card>
      <CardHeader title={`${formMode ? "Edit" : "Add"} Shipping`} />
      <Divider />
      <CardContent>
        <Box component='div' mb={2}>
          <TextField
            type='text'
            label='Name'
            name='name'
            variant='outlined'
            onChange={(e) => onInputChange("name", e.target.value)}
            value={customShippingClass.name}
            fullWidth
          />
        </Box>
        <Box component='div' mb={2}>
          <TextField
            type='number'
            label='Amount'
            name='amount'
            variant='outlined'
            onChange={(e) => onInputChange("amount", e.target.value)}
            value={customShippingClass.amount}
            fullWidth
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          color='primary'
          onClick={formMode ? updateCustomShipping : addCustomShipping}
          variant='contained'
        >
          {formMode ? "Update" : "Add"}
        </Button>
        <Button
          size='small'
          onClick={cancelShipping}
          variant='contained'
          className={classes.cancelBtn}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default ShippingFormComponent;
