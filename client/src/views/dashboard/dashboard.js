import React, { useEffect, useState } from "react";
import { Grid, Box, useMediaQuery, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/styles";
import LatestOrder from "./components/latestOrder";
import LatestProducts from "./components/latestProduct";
import DashboardCard from "./components/dashboardCard";

import { useSelector, useDispatch } from "react-redux";
import theme from "../../theme";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { ThemeProvider } from "@mui/material/styles";
import { dashboardAction } from "../../store/action/dashboardAction";
import { isEmpty } from "lodash";
import Paper from "@mui/material/Paper";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend

} from "recharts";
import { currencyFormat } from "../order/CurrencyFormat";
import { get } from "lodash";

const DashboardComponent = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [year, setYear] = useState(2023)
  const data = useSelector((state) => state.dashboardReducer);
  const [chartdata, setChartdata] = useState([])
  const [dashBoardData, setdashBoardData] = useState({});
  const loader = useSelector((state) => state.dashboardReducer.loading);
  useEffect(() => {
    if (isEmpty(get(data, "dashboard_data"))) {
      dispatch(dashboardAction());
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(get(data, "dashboard_data"))) {

      setdashBoardData({ ...dashBoardData, ...get(data, "dashboard_data") });
      const OrderChartData = get(data, "dashboard_data.ordersByYearMonth")
      if (!isEmpty(OrderChartData))

        OrderChartData.map((OrderChart) => {
          if (OrderChart.year === year) {
            setChartdata(OrderChart.months)
          }
        })

    }
  }, [get(data, "dashboard_data")]);

  const handleChangeChart = (e) => {
    const { value } = e.target

    setYear(value)
    dashBoardData.ordersByYearMonth.map((arr) => {

      if (arr.year == value) {
        setChartdata(arr.months)
      }
    })

  }

  return (
    <Box component="div" p={isSmall ? 1 : 4}>
      <Grid container spacing={isSmall ? 1 : 4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <DashboardCard
            count={dashBoardData.userCount}
            title={"TOTAL USERS"}
            Icon={({ className }) => (
              <PeopleAltOutlinedIcon className={className} />
            )}
            loader={loader}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <DashboardCard
            count={dashBoardData.productCount}
            title={"TOTAL PRODUCTS"}
            Icon={({ className }) => (
              <StorefrontOutlinedIcon className={className} />
            )}
            loader={loader}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <DashboardCard
            count={dashBoardData.customerCount}
            title={"TOTAL CUSTOMERS"}
            Icon={({ className }) => (
              <PeopleAltOutlinedIcon className={className} />
            )}
            loader={loader}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <DashboardCard
            count={currencyFormat(dashBoardData.totalSales)}
            title={"TOTAL SALES"}
            Icon={({ className }) => (
              <AttachMoneyOutlinedIcon className={className} />
            )}
            loader={loader}
          />
        </Grid>
        <Grid item lg={8} xl={12} md={12} xs={12}>
          <LatestOrder
            latestOrders={dashBoardData.latestOrders || []}
            loader={loader}
          />
        </Grid>

        <Grid item lg={8} xl={9} xs={12} ml={0} >

          <Paper>

            <Box sx={{ width: 120, }}>

              <FormControl fullWidth size="small" sx={{ width: 120, m: 3 }}>

                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select

                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={year}
                  label="Categories"
                  onChange={(e) => handleChangeChart(e)}

                >
                  {dashBoardData.ordersByYearMonth && dashBoardData.ordersByYearMonth.length > 0 ? dashBoardData.ordersByYearMonth.map((chart) => {

                    return <MenuItem value={chart.year}>{chart.year}</MenuItem>
                  }) : null}



                </Select>
              </FormControl>
            </Box>


            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartdata} margins={{ top: 50, right: 0, bottom: 100, left: 0 }} >
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid />
                <Legend />
                <Tooltip offset={10} />
                <Bar dataKey="paymentSuccessNetSales" stackId="a" fill="#82AAE3" barSize={30} />
                <Bar dataKey="NetSales" barSize={9} stackId="a" fill="#91D8E4" />
                <Bar dataKey="paymentSuccessNetSales" stackId="a" fill="#1D7874" barSize={30} />
                <Bar dataKey="GrossSales" stackId="a" barSize={30} fill="#FCAC89" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>

        </Grid>
        <Grid item lg={4} xl={3} xs={12}>
          <LatestProducts
            products={dashBoardData.latestProducts || []}
            loader={loader}
          />
        </Grid>
      </Grid>
    </Box >
  );
};

const Dashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <DashboardComponent />
    </ThemeProvider>
  );
};
export default Dashboard;
