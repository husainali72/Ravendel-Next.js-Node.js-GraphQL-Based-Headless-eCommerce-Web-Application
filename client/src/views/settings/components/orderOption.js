import React, { useState } from "react";
import { Grid, Box, FormControlLabel, Checkbox, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import viewStyles from "../../viewStyles";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput } from "./setting-components/";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { get } from "lodash";
import theme from "../../../theme/index.js";
import { paymentPaypalUpdateAction } from "../../../store/action";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";
import { orderOptionUpdateAction } from "../../../store/action/settingAction";
const OrderOptionComponent = () => {
    const OrderOption = ['$', '*']
    const classes = viewStyles();
    const dispatch = useDispatch();
    const settingState = useSelector((state) => state.settings);
    const [orderOption, setOrderOption] = useState({});

    useEffect(() => {
        if (settingState.settings && settingState.settings.paymnet && settingState.settings.paymnet.paypal) {
            setOrderOption({ ...settingState.settings.store.order_options })
        }
    }, [get(settingState, "settings")])
    const updateOneSignal = () => {
        delete theme.__typename;
        dispatch(orderOptionUpdateAction(orderOption));
    };
    return (
        <>
            <Alerts />
            {settingState.loading ? <Loading /> : null}
            <Grid container spacing={2}>
                <Grid item md={6} sm={12} xs={12}>
                    <Box component="div">
                        <SettingTextInput
                            type='number'
                            label="Order Digits"
                            value={orderOption.order_digits}
                            onSettingInputChange={(val) =>
                                setOrderOption({ ...orderOption, order_digits: parseInt(val) })
                            }

                        />
                    </Box>
                    <Box component="div">
                        <SettingTextInput
                            label="Order Prefix"
                            value={orderOption.order_prefix}
                            onSettingInputChange={(val) =>
                                setOrderOption({ ...orderOption, order_prefix: val })
                            }
                            type="text"
                        />
                    </Box>
                    <Box component="div" sx={{ minWidth: 120, width: '300px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" size='small'>Order Prefix List</InputLabel>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={orderOption.order_prefix}
                                label="Order Prefix List"
                                size='small'
                                onChange={(e) => {
                                    setOrderOption({ ...orderOption, order_prefix: e.target.value })
                                }}
                            >
                                {orderOption.order_prefix_list && orderOption.order_prefix_list.length > 0 ?
                                    orderOption.order_prefix_list.map((orderPrefix) => {
                                        return <MenuItem value={orderPrefix}>{orderPrefix}</MenuItem>
                                    }) : null
                                }
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={updateOneSignal}
                    >
                        Save Change
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default function OrderOption() {
    return (
        <ThemeProvider theme={theme}>
            <OrderOptionComponent />
        </ThemeProvider>
    );
}
