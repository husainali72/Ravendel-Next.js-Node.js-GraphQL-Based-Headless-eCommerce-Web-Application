import React, { useEffect, useState } from 'react';
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import { useDispatch } from "react-redux";
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
import BasicDatePicker from './datepicker';
import BasicTabs from './muitabs';
export function Searching({ searchData, handleOnChangeSearch, dropdown, statusTabData, classname, searchbydate }) {

    const classes = viewStyles()
    const [searchState, setsearch] = useState("");
    const [MuiTabsvalue, setMuiTabsValue] = React.useState('All');
    const [paymentstatus, setpaymentstatus] = useState('')
    const [shippingstatus, setshippingstatus] = useState('')
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        setpaymentstatus("")
        setshippingstatus("")
        setMuiTabsValue("All");
        setsearch("")
        setStartDate(null)
        setEndDate(null)
        handleOnChangeSearch(searchData)
    }, [searchData])
    const startDateHandleChange = (newvalue) => {
        if (endDate) {
            if (new Date(newvalue.$d) < endDate) {
                setStartDate(new Date(newvalue.$d))
            }
            else {
                dispatch({
                    type: ALERT_SUCCESS,
                    payload: {
                        boolean: false,
                        message: "Invalid date",
                        error: true,
                    },
                });
            }
        }
        else {
            setStartDate(new Date(newvalue.$d))
        }
    }

    const endDateHandleChange = (newvalue) => {
        if (startDate) {
            if (new Date(newvalue) > startDate) {
                setEndDate(new Date(newvalue))
            }
            else {
                dispatch({
                    type: ALERT_SUCCESS,
                    payload: {
                        boolean: false,
                        message: "Invalid date",
                        error: true,
                    },
                });
            }
        }
        else {
            setEndDate(new Date(newvalue))
        }
    }

    const handlesearch = (event) => {
        setsearch(event.target.value)
    }
    const handlepaymentstatus = (event) => {
        setpaymentstatus(event.target.value)
    }
    const handleshippingstatus = (event) => {
        setshippingstatus(event.target.value)
    }

    const handleChangeMuiTabs = (event, newValue) => {
        setMuiTabsValue(newValue);
    };
    const crossButton = () => {
        setsearch("");
        searchfilter('search')
    };
    useEffect(() => {
        searchfilter()
    }, [searchState, startDate, endDate, MuiTabsvalue, paymentstatus, shippingstatus])
    const searchfilter = () => {

        const filterdata = searchData?.filter(data => {
            const matchesSearch = searchState ? Object.values(data).some(val => String(val).toLowerCase().includes(searchState.toLowerCase())) : true;
            const matchesTabs = MuiTabsvalue === 'All' || data[statusTabData.name] === MuiTabsvalue;
            const matchesPaymentStatus = !paymentstatus || data['paymentStatus'].toLowerCase().includes(paymentstatus);
            const matchesShippingStatus = !shippingstatus || data['shippingStatus'].toLowerCase().includes(shippingstatus);
            const currentDate = new Date(data['date']);
            currentDate.setHours(0, 0, 0, 0); // Reset time to midnight
            const startDateWithoutTime = startDate ? new Date(startDate) : null;
            const endDateWithoutTime = endDate ? new Date(endDate) : null;
            if (startDateWithoutTime) startDateWithoutTime.setHours(0, 0, 0, 0);
            if (endDateWithoutTime) endDateWithoutTime.setHours(0, 0, 0, 0);
            const matchesDateRange =
                (!startDateWithoutTime || currentDate >= startDateWithoutTime) &&
                (!endDateWithoutTime || currentDate <= endDateWithoutTime);


            return matchesSearch && matchesTabs && matchesPaymentStatus && matchesShippingStatus && matchesDateRange;
        });

        handleOnChangeSearch(filterdata);
    };

    const removeAllFilter = () => {
        setpaymentstatus("")
        setshippingstatus("")
        setMuiTabsValue("All");
        setsearch("")
        setStartDate(null)
        setEndDate(null)
        handleOnChangeSearch(searchData)
    }
    return (
        <div className={classes.search}>
            {statusTabData ? <BasicTabs handleChangeMuiTabs={handleChangeMuiTabs} statusTabData={statusTabData} value={MuiTabsvalue} handleOnChangeSearch={handleOnChangeSearch} searchData={searchData} /> : null}
            {searchbydate ? <BasicDatePicker startDateHandleChange={startDateHandleChange} endDateHandleChange={endDateHandleChange} searchData={searchData} Alldata={searchData} classname={classname} startDate={startDate} endDate={endDate} /> : null}
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
                                    return arr.name === 'paymentStatus' ?
                                        arr.status.map((obj) => {
                                            return <MenuItem value={obj.name}>{obj.title.charAt(0).toUpperCase() + obj.title.slice(1)}</MenuItem>
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
                                    return arr.name === 'shippingStatus' ?
                                        arr.status.map((obj) => {
                                            return <MenuItem value={obj.name}>{obj.title.charAt(0).toUpperCase() + obj.title.slice(1)}</MenuItem>
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
                            value={searchState}
                            onChange={handlesearch}
                        />
                    </div>
                    <div className={classes.closeIcon}>
                        <CloseIcon onClick={crossButton} />
                    </div>
                </div>
            </Box>
            {searchState || startDate || endDate || shippingstatus || paymentstatus ?
                <Button color='error' onClick={removeAllFilter} className={classes.removefilter}>remove </Button> : null}
        </div>
    );
}

