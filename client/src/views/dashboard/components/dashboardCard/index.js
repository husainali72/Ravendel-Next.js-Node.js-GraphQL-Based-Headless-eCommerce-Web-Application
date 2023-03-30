import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  CircularProgress,
  Button,
} from "@mui/material";
import DashboardStyles from "../../dashboard-styles";
import theme from "../../../../theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { isEmpty } from "../../../../utils/helper";
import { currencySetter, getPrice } from "../../../order/CurrencyFormat";
import { useDispatch } from "react-redux";
import { getSettings } from "../../../../store/action";
const DashboardCardComponent = ({ count, title, Icon, loader, totalsale }) => {

  const classes = DashboardStyles();
  const dispatch = useDispatch()
  const currencyState = useSelector((state) => state.settings)
  const [currency, setcurrency] = useState('usd')
  const [decimal, setdecimal] = useState(2)
  useEffect(() => {
    dispatch(getSettings())
  }, [])
  useEffect(() => {
    if (!isEmpty(get(currencyState, 'settings'))) {
      if (!isEmpty(get(currencyState.settings, 'store'))) {
        setcurrency(get(currencyState.settings.store.currency_options, 'currency'))
        setdecimal(get(currencyState.settings.store.currency_options, 'number_of_decimals'))
      }
    }
  }, [get(currencyState, 'settings')])
  return (
    <Card className={classes.dashboardcardroot}>
      <CardContent>
        <Grid container justifyContent="space-between" >
          <Grid item >
            <Typography
              className={classes.dashboardcardtitle}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              {title}
            </Typography>
            {loader ? (
              <CircularProgress size={20} />
            ) : count ? (
              <Typography variant="h5">{count}</Typography>
            ) :
              totalsale ? (
                <Typography variant="h5" sx={{ display: 'flex' }}>{currencySetter(currency, '20px')}{getPrice(totalsale, decimal)}</Typography>
              ) :
                (
                  <Typography className={classes.noRecordFound} variant="caption">
                    No records found
                  </Typography>

                )}

          </Grid>
          <Grid item >

            <Avatar className={classes.dashboardcardavatar}>
              <Icon className={classes.dashboardcardicon} />
            </Avatar>

          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default function DashboardCard({ count, title, Icon, loader, totalsale }) {
  return (
    <ThemeProvider theme={theme}>
      <DashboardCardComponent
        count={count}
        title={title}
        Icon={Icon}
        loader={loader}
        totalsale={totalsale}
      />
    </ThemeProvider>
  );
}
