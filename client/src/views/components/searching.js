import React, { useState } from 'react';
import {
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
} from '@mui/material';
import viewStyles from '../viewStyles';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { convertDateToStringFormat } from '../utils/convertDate';
import BasicDatePicker from './datepicker';
import BasicTabs from './muitabs';

export function Searching({ searchData, handleOnChangeSearch, dropdown, statusTabData, classname }) {
    const classes = viewStyles()
    const [search, setsearch] = useState("");
    const [paymentstatus, setpaymentstatus] = useState('')
    const [shippingstatus, setshippingstatus] = useState('')
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const startDateHandleChange = (newvalue) => {
        if (newvalue) {
            let startconvetdate = new Date(newvalue.$d)
            setStartDate(new Date(newvalue.$d))
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
            }))
            handleOnChangeSearch(filterdata)
        } else {
            handleOnChangeSearch(searchData)
        }
    }
    const endDateHandleChange = (newvalue) => {
        if (newvalue) {
            let endconvetdate = new Date(newvalue.$d)
            let getdate = new Date(newvalue.$d).getDate()
            endconvetdate.setDate(getdate + 1)
            setEndDate(new Date(newvalue))
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
    const removeAllFilter = () => {
        setpaymentstatus("")
        setshippingstatus("")
        setsearch("")
        setStartDate(null)
        setEndDate(null)
        handleOnChangeSearch(searchData)
    }
    return (
        <div className={classes.search}>
            {statusTabData ? <BasicTabs statusTabData={statusTabData} handleOnChangeSearch={handleOnChangeSearch} searchData={searchData} /> : null}
            <BasicDatePicker startDateHandleChange={startDateHandleChange} endDateHandleChange={endDateHandleChange} searchData={searchData} Alldata={searchData} classname={classname} startDate={startDate} endDate={endDate} />
            {dropdown && dropdown.length > 0 ?
                <>
                    <Box sx={{ minWidth: 120, width: '160px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{ ml: '20px' }} size="small">Payment status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={paymentstatus}
                                label="payment status"
                                onChange={handlepaymentstatus}
                                sx={{ ml: '20px', }}
                                size="small"
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
                    <Box sx={{ minWidth: 120, width: '160px' }} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{ ml: '20px' }} size="small">Shipping status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={shippingstatus}
                                label="payment status"
                                onChange={handleshippingstatus}
                                sx={{ ml: '20px' }}
                                size="small"
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
            <Button color='error' onClick={removeAllFilter} className={classes.removefilter}>remove </Button>
        </div>
    );
}



