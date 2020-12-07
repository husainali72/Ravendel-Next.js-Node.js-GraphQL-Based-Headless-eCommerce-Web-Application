import React from 'react';
import {Card, CardHeader, Divider, CardContent, TextField, Box, CardActions, Button} from '@material-ui/core';
import viewStyles from "../../viewStyles.js";

const TaxFormComponent = ({formMode, onInputChange, cancelTaxForm, updateCustomTax, addCustomTax, customTaxClassState}) => {
    const classes = viewStyles();
    return (
        <Card>
        <CardHeader
          title={`${formMode ? "Edit" : "Add"} Tax`}
        />
        <Divider />
        <CardContent>
            <Box component="div" mb={2}>
          <TextField
            type='text'
            label='Name'
            name='name'
            variant='outlined'
            onChange={(e) => onInputChange('name', e.target.value)}
            value={customTaxClassState.name}
            fullWidth
          />
          </Box>
          <Box component="div" mb={2}>
          <TextField
            type='number'
            label='Percentage'
            name='percentage'
            variant='outlined'
            onChange={(e) => onInputChange('percentage', e.target.value)}
            value={customTaxClassState.percentage}
            fullWidth
          />
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            color='primary'
            onClick={formMode ? updateCustomTax : addCustomTax}
            variant='contained'
          >
            {formMode ? "Update" : "Add"}
          </Button>
          <Button
            size='small'
            onClick={cancelTaxForm}
            variant='contained'
            className={classes.cancelBtn}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    );
}

export default TaxFormComponent;