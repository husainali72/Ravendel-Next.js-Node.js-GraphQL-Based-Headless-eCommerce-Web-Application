import React, { useEffect, useState } from 'react';
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
    const startDateHandleChange = (newvalue) => {
        setStartDate(new Date(newvalue.$d))
    }
    const endDateHandleChange = (newvalue) => {
        setEndDate(new Date(newvalue))
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
    const searchfilter = (searchvalue) => {
        let search = ''
        if (searchvalue === 'search') {
            search = ''
        } else {
            search = searchState
        }
        if (!search && MuiTabsvalue === 'All' && !shippingstatus && !paymentstatus && !startDate && !endDate) {
            handleOnChangeSearch(searchData)
        } else {
            let filterdata = searchData.filter(data => Object.keys(data).some(key => {
                if (startDate || endDate) {
                    if (startDate && endDate) {
                        let endconvetdate = new Date(endDate)
                        let getenddate = new Date(endDate).getDate()
                        endconvetdate.setDate(getenddate + 1)
                        if (shippingstatus || paymentstatus) {
                            if (shippingstatus && paymentstatus) {
                                if (search) {
                                    if (MuiTabsvalue !== 'All') {
                                        return new Date(data['date']) >= startDate
                                            && new Date(data['date']) <= endconvetdate
                                            && data['shipping_status'].toLowerCase().includes(shippingstatus)
                                            && data['payment_status'].toLowerCase().includes(paymentstatus)
                                            && String(data[key]).toLowerCase().includes(search.toLowerCase())
                                            && data[statusTabData.name] === MuiTabsvalue
                                    } else {
                                        return new Date(data['date']) >= startDate
                                            && new Date(data['date']) <= endconvetdate
                                            && data['shipping_status'].toLowerCase().includes(shippingstatus)
                                            && data['payment_status'].toLowerCase().includes(paymentstatus)
                                            && String(data[key]).toLowerCase().includes(search.toLowerCase())
                                    }
                                } else {
                                    return new Date(data['date']) >= startDate
                                        && new Date(data['date']) <= endconvetdate
                                        && data['shipping_status'].toLowerCase().includes(shippingstatus)
                                        && data['payment_status'].toLowerCase().includes(paymentstatus)
                                }
                            } else if (shippingstatus) {
                                if (search) {
                                    return new Date(data['date']) >= startDate
                                        && new Date(data['date']) <= endconvetdate
                                        && data['shipping_status'].toLowerCase().includes(shippingstatus)

                                        && String(data[key]).toLowerCase().includes(search.toLowerCase())
                                } else {
                                    return new Date(data['date']) >= startDate
                                        && new Date(data['date']) <= endconvetdate
                                        && data['shipping_status'].toLowerCase().includes(shippingstatus)
                                }
                            }
                            else if (paymentstatus) {
                                if (search) {
                                    return new Date(data['date']) >= startDate
                                        && new Date(data['date']) <= endconvetdate
                                        && data['payment_status'].toLowerCase().includes(paymentstatus)

                                        && String(data[key]).toLowerCase().includes(search.toLowerCase())
                                } else {
                                    return new Date(data['date']) >= startDate
                                        && new Date(data['date']) <= endconvetdate
                                        && data['payment_status'].toLowerCase().includes(paymentstatus)
                                }
                            }
                        } else if (search) {

                            if (MuiTabsvalue !== 'All') {
                                return new Date(data['date']) >= startDate
                                    && new Date(data['date']) <= endconvetdate
                                    && String(data[key]).toLowerCase().includes(search.toLowerCase())
                                    && data[statusTabData.name] === MuiTabsvalue
                            } else {
                                return new Date(data['date']) >= startDate
                                    && new Date(data['date']) <= endconvetdate
                                    && String(data[key]).toLowerCase().includes(search.toLowerCase())
                            }
                        } else if (MuiTabsvalue !== 'All') {
                            return new Date(data['date']) >= startDate
                                && new Date(data['date']) <= endconvetdate
                                && data[statusTabData.name] === MuiTabsvalue
                        } else {
                            return new Date(data['date']) >= startDate
                                && new Date(data['date']) <= endconvetdate
                        }
                    }
                    else if (startDate) {
                        if (shippingstatus || paymentstatus) {
                            if (shippingstatus && paymentstatus) {
                                if (search) {
                                    return new Date(data['date']) >= startDate
                                        && data['shipping_status'].toLowerCase().includes(shippingstatus)
                                        && data['payment_status'].toLowerCase().includes(paymentstatus)
                                        && String(data[key]).toLowerCase().includes(search.toLowerCase())
                                } else {
                                    return new Date(data['date']) >= startDate
                                        && data['shipping_status'].toLowerCase().includes(shippingstatus)
                                        && data['payment_status'].toLowerCase().includes(paymentstatus)
                                }
                            } else if (shippingstatus) {
                                if (search) {
                                    return new Date(data['date']) >= startDate
                                        && data['shipping_status'].toLowerCase().includes(shippingstatus)
                                        && String(data[key]).toLowerCase().includes(search.toLowerCase())
                                } else {
                                    return new Date(data['date']) >= startDate
                                        && data['shipping_status'].toLowerCase().includes(shippingstatus)
                                }
                            }
                            else if (paymentstatus) {
                                if (search) {
                                    return new Date(data['date']) >= startDate
                                        && data['payment_status'].toLowerCase().includes(paymentstatus)
                                        && String(data[key]).toLowerCase().includes(search.toLowerCase())
                                } else {
                                    return new Date(data['date']) >= startDate
                                        && data['payment_status'].toLowerCase().includes(paymentstatus)
                                }
                            }
                        } else if (search) {
                            if (MuiTabsvalue !== 'All') {
                                return new Date(data['date']) >= startDate
                                    && String(data[key]).toLowerCase().includes(search.toLowerCase())
                                    && data[statusTabData.name] === MuiTabsvalue
                            }
                            else {
                                return new Date(data['date']) >= startDate
                                    && String(data[key]).toLowerCase().includes(search.toLowerCase())
                            }
                        }
                        else if (MuiTabsvalue !== 'All') {
                            return new Date(data['date']) >= startDate
                                && data[statusTabData.name] === MuiTabsvalue
                        } else {
                            return new Date(data['date']) >= startDate
                        }
                    }
                    else if (endDate) {
                        let endconvetdate = new Date(endDate)
                        let getenddate = new Date(endDate).getDate()
                        endconvetdate.setDate(getenddate + 1)
                        if (shippingstatus || paymentstatus) {
                            if (shippingstatus && paymentstatus) {
                                if (search) {

                                    return new Date(data['date']) <= endconvetdate
                                        && data['shipping_status'].toLowerCase().includes(shippingstatus)
                                        && data['payment_status'].toLowerCase().includes(paymentstatus)
                                        && String(data[key]).toLowerCase().includes(search.toLowerCase())
                                } else {
                                    return new Date(data['date']) <= endconvetdate
                                        && data['shipping_status'].toLowerCase().includes(shippingstatus)
                                        && data['payment_status'].toLowerCase().includes(paymentstatus)
                                }
                            } else if (shippingstatus) {
                                if (search) {
                                    return new Date(data['date']) <= endconvetdate
                                        && data['shipping_status'].toLowerCase().includes(shippingstatus)
                                        && String(data[key]).toLowerCase().includes(search.toLowerCase())
                                } else {
                                    return new Date(data['date']) <= endconvetdate
                                        && data['shipping_status'].toLowerCase().includes(shippingstatus)
                                }
                            }
                            else if (paymentstatus) {
                                if (search) {
                                    return new Date(data['date']) <= endconvetdate
                                        && data['payment_status'].toLowerCase().includes(paymentstatus)

                                        && String(data[key]).toLowerCase().includes(search.toLowerCase())
                                } else {
                                    return new Date(data['date']) <= endconvetdate
                                        && data['payment_status'].toLowerCase().includes(paymentstatus)
                                }
                            }
                        } else if (search) {
                            if (MuiTabsvalue !== 'All') {
                                return new Date(data['date']) <= endconvetdate
                                    && String(data[key]).toLowerCase().includes(search.toLowerCase())
                                    && data[statusTabData.name] === MuiTabsvalue
                            } else {
                                return new Date(data['date']) <= endconvetdate
                                    && String(data[key]).toLowerCase().includes(search.toLowerCase())
                            }
                        }
                        else if (MuiTabsvalue !== 'All') {
                            return new Date(data['date']) <= endconvetdate
                                && data[statusTabData.name] === MuiTabsvalue
                        } else {
                            return new Date(data['date']) <= endconvetdate
                        }
                    }
                }
                else if (shippingstatus || paymentstatus) {
                    if (shippingstatus && paymentstatus) {
                        if (search) {
                            return data['shipping_status'].toLowerCase().includes(shippingstatus)
                                && data['payment_status'].toLowerCase().includes(paymentstatus)
                                && String(data[key]).toLowerCase().includes(search.toLowerCase())
                        } else {
                            return data['shipping_status'].toLowerCase().includes(shippingstatus)
                                && data['payment_status'].toLowerCase().includes(paymentstatus)
                        }
                    } else if (shippingstatus) {
                        if (search) {
                            return data['shipping_status'].toLowerCase().includes(shippingstatus)
                                && String(data[key]).toLowerCase().includes(search.toLowerCase())
                        } else {
                            return data['shipping_status'].toLowerCase().includes(shippingstatus)
                        }
                    }
                    else if (paymentstatus) {
                        if (search) {
                            return data['payment_status'].toLowerCase().includes(paymentstatus)
                                && String(data[key]).toLowerCase().includes(search.toLowerCase())
                        } else {
                            return data['payment_status'].toLowerCase().includes(paymentstatus)
                        }
                    }
                }
                else if (search) {
                    if (MuiTabsvalue !== 'All') {
                        return String(data[key]).toLowerCase().includes(search.toLowerCase())
                            && data[statusTabData.name] === MuiTabsvalue
                    } else {
                        return String(data[key]).toLowerCase().includes(search.toLowerCase())
                    }
                }
                else if (MuiTabsvalue !== 'All') {
                    return data[statusTabData.name] === MuiTabsvalue
                }
            }))
            handleOnChangeSearch(filterdata)
        }
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
                            value={searchState}
                            onChange={handlesearch}
                        />
                    </div>
                    <div className={classes.closeIcon}>
                        <CloseIcon onClick={crossButton} />
                    </div>
                </div>
            </Box>
            {searchState || startDate || endDate || shippingstatus || paymentstatus || MuiTabsvalue !== 'All' ?
                <Button color='error' onClick={removeAllFilter} className={classes.removefilter}>remove </Button> : null}
        </div>
    );
}



