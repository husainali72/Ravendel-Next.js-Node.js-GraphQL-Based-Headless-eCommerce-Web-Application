import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import viewStyles from '../viewStyles';
export default function BasicDatePicker({ endDateHandleChange, startDateHandleChange, startDate, endDate, searchData, classname }) {
    const classes = viewStyles()
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}  >
            <div className={classname ? classes.datepicker : classes.Datepickerclass}>
                <DatePicker
                    label="Start date"
                    value={startDate}
                    onChange={(newValue) => {
                        startDateHandleChange(newValue);
                    }}
                    renderInput={(params) => {
                        return <TextField size="small"{...params} />
                    }}
                />
            </div>
            <div className={classname ? classes.enddatepicker : classes.Datepickerclass}>
                <DatePicker
                    label="End date"
                    value={endDate}
                    onChange={(newValue) => {

                        endDateHandleChange(newValue);
                    }}

                    renderInput={(params) => <TextField size="small"{...params} />}
                />
            </div>
        </LocalizationProvider >
    );
}