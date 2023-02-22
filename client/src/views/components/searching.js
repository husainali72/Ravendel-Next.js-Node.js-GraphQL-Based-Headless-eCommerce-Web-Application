import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';

import { useEffect } from 'react';
import viewStyles from '../viewStyles';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
export function NestedSearching({ searchData, handleOnChangeSearch, searchkey, searchby }) {

    const [search, setsearch] = useState("");

    const classes = viewStyles()

    const handleChangeSearch = (event) => {

        setsearch(event.target.value)

        var filterdata = searchData.filter((val) => {

            if (event.target.value === "") {
                return val;
            }
            if (searchkey) {

                if (val[searchkey][searchby].toLowerCase().includes(event.target.value.toLowerCase())) {
                    return val;
                }
            } else if (val[searchby].toLowerCase().includes(event.target.value.toLowerCase())) {

                return val;
            }
        });

        if (event.target.value === "") {

            handleOnChangeSearch(searchData)
        } else if (filterdata.length > 0) {
            handleOnChangeSearch(filterdata)
        } else {
            handleOnChangeSearch(filterdata)
        }



    }
    const crossButton = () => {
        setsearch("");

        handleOnChangeSearch(searchData)
    };
    return (
        <Box sx={{ flexGrow: 1, }} className={classes.box}>
            <div className={classes.searchWrapper}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <div className={classes.textFieldWrapper}>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Products"
                        inputProps={{ "aria-label": "Search Products" }}
                        className={classes.textfield}
                        value={search}
                        onChange={handleChangeSearch}
                    />
                </div>
                <div className={classes.closeIcon}>
                    <CloseIcon onClick={crossButton} />
                </div>
            </div>
        </Box>

    );
}



