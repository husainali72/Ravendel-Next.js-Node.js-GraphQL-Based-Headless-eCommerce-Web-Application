import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch } from 'react-redux';
import viewStyles from '../viewStyles';
export default function BasicDatePicker({ handleOnChangeSearch, searchData, classname }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const classes = viewStyles()
    const startDateHandleChange = (newvalue) => {

        let startconvetdate = new Date(newvalue.$d)


        setStartDate(new Date(newvalue.$d))
        if (newvalue != '') {

            let filterdata = searchData.filter(data => Object.keys(data).some(key => {

                if (key === 'date') {

                    if (endDate) {

                        let endconvetdate = new Date(endDate)
                        let getenddate = new Date(endDate).getDate()
                        endconvetdate.setDate(getenddate + 1)

                        return new Date(data[key]) >= startconvetdate && new Date(data[key]) <= endconvetdate
                    }
                    else {
                        return new Date(data[key]) >= startconvetdate
                    }
                }
            }

            ))
            handleOnChangeSearch(filterdata)
        } else {

            handleOnChangeSearch(searchData)
        }

    }
    const endDateHandleChange = (newvalue) => {

        let endconvetdate = new Date(newvalue.$d)
        let getdate = new Date(newvalue.$d).getDate()
        endconvetdate.setDate(getdate + 1)

        setEndDate(new Date(newvalue))


        if (newvalue != '') {

            let filterdata = searchData.filter(data => Object.keys(data).some(key => {

                if (key === 'date') {
                    if (startDate) {


                        return new Date(data[key]) >= startDate && new Date(data[key]) <= endconvetdate

                    }
                    else return new Date(data[key]) <= endconvetdate
                }
            }))
            handleOnChangeSearch(filterdata)
        } else {

            handleOnChangeSearch(searchData)
        }


    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}  >
            <div className={classname ? classes.datepicker : null}>
                <DatePicker
                    label="Start date"
                    value={startDate}
                    onChange={(newValue) => {
                        startDateHandleChange(newValue);
                    }}

                    renderInput={(params) => <TextField {...params} />}
                />
            </div>
            <div className={classname ? classes.enddatepicker : classes.Datepickerclass}>
                <DatePicker
                    label="End date"
                    value={endDate}
                    onChange={(newValue) => {

                        endDateHandleChange(newValue);
                    }}

                    renderInput={(params) => <TextField {...params} />}
                />
            </div>

        </LocalizationProvider >
    );
}