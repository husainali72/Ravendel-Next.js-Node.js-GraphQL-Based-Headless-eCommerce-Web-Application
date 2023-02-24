import React, { useState } from 'react';
import {
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from '@mui/material';
import viewStyles from '../viewStyles';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { convertDateToStringFormat } from '../utils/convertDate';
import BasicDatePicker from './datepicker';
import BasicTabs from './muitabs';

export function Searching({ searchData, handleOnChangeSearch, dropdown, statusTabData, classname }) {

    const [search, setsearch] = useState("");
    const [paymentstatus, setpaymentstatus] = useState('')
    const [shippingstatus, setshippingstatus] = useState('')
    const classes = viewStyles()
    const handlesearch = (event) => {
        setsearch(event.target.value)
        if (event.target.value !== "") {
            let filterdata = searchData.filter(data => Object.keys(data).some(key => {
                if (key === 'date') {
                    return String(convertDateToStringFormat(data[key])).toLowerCase().includes(event.target.value.toLowerCase())
                } else {
                    return String(data[key]).toLowerCase().includes(event.target.value.toLowerCase())
                }
            }))
            handleOnChangeSearch(filterdata)
        } else {
            handleOnChangeSearch(searchData)
        }
    }

    const handlepaymentstatus = (event) => {

        setpaymentstatus(event.target.value)
        if (event.target.value != '') {

            let filterdata = searchData.filter((data) => {

                if (shippingstatus !== '') {
                    return data['payment_status'].toLowerCase().includes(event.target.value) && data['shipping_status'].toLowerCase().includes(shippingstatus)
                } else {
                    return data['payment_status'].toLowerCase().includes(event.target.value)
                }
            })

            handleOnChangeSearch(filterdata)
        } else {

            handleOnChangeSearch(searchData)
        }
    }

    const handleshippingstatus = (event) => {
        setshippingstatus(event.target.value)
        if (event.target.value != '') {

            let filterdata = searchData.filter((data) => {

                if (paymentstatus !== '') {
                    return data['shipping_status'].toLowerCase().includes(event.target.value) && data['payment_status'].toLowerCase().includes(paymentstatus)
                } else {

                    return data['shipping_status'].toLowerCase().includes(event.target.value)
                }
            })

            handleOnChangeSearch(filterdata)
        } else {

            handleOnChangeSearch(searchData)
        }
    }
    const crossButton = () => {
        setsearch("");

        handleOnChangeSearch(searchData)
    };
    return (
        <div className={classes.search}>
            {statusTabData ? <BasicTabs statusTabData={statusTabData} handleOnChangeSearch={handleOnChangeSearch} searchData={searchData} /> : null}
            <BasicDatePicker handleOnChangeSearch={handleOnChangeSearch} searchData={searchData} Alldata={searchData} classname={classname} />

            {dropdown && dropdown.length > 0 ?
                <>
                    <Box sx={{ minWidth: 120, width: '200px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{ ml: '20px' }}>payment status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={paymentstatus}
                                label="payment status"
                                onChange={handlepaymentstatus}
                                sx={{ ml: '20px' }}
                            >
                                {dropdown.map((arr) => {

                                    return arr.name === 'payment_status' ?
                                        arr.title.map((obj) => {

                                            return <MenuItem value={obj}>{obj}</MenuItem>
                                        }) : null
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, width: '200px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{ ml: '20px' }}>shipping status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={shippingstatus}
                                label="payment status"
                                onChange={handleshippingstatus}
                                sx={{ ml: '20px' }}
                            >
                                {dropdown.map((arr) => {

                                    return arr.name === 'shipping_status' ?
                                        arr.title.map((obj) => {

                                            return <MenuItem value={obj}>{obj}</MenuItem>
                                        }) : null
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </> : null}
            <Box sx={{ flexGrow: 1, ml: '10px' }} className={classes.box}>
                <div className={classes.searchWrapper}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <div className={classes.textFieldWrapper}>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search... "
                            inputProps={{ "aria-label": "Search " }}
                            className={classes.textfield}
                            value={search}
                            onChange={handlesearch}
                        />
                    </div>
                    <div className={classes.closeIcon}>
                        <CloseIcon onClick={crossButton} />
                    </div>
                </div>
            </Box>
        </div>
    );
}



