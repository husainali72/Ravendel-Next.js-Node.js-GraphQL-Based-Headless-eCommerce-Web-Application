
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import viewStyles from '../viewStyles';
function a11yProps(index) {

    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ handleOnChangeSearch, statusTabData, searchData }) {
    const [value, setValue] = React.useState('All');
    const classes = viewStyles()
    const handleChange = (event, newValue) => {

        setValue(newValue);
        if (newValue === 'All') {
            handleOnChangeSearch(searchData)
        } else {
            let filterdata = searchData.filter((data) => {

                return data[statusTabData.name] === newValue
            })
            handleOnChangeSearch(filterdata)
        }
    };

    return (
        <Box className={classes.muitabs}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {statusTabData.array.map((item, index) => {

                        return <Tab label={item} value={item} {...a11yProps(index)} />
                    })}

                </Tabs>
            </Box>

        </Box >
    );
}