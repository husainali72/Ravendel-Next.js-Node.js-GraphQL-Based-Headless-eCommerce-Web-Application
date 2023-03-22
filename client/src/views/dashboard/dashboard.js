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
  const [year, setYear] = useState("")
  const data = useSelector((state) => state.dashboardReducer);
  const [chartdata, setChartdata] = useState([])
  const [dashBoardData, setdashBoardData] = useState({});
  const loader = useSelector((state) => state.dashboardReducer.loading);
  const [latestOrders, setlatestOrders] = useState([])
  const [filteredLatestOrders, setFilteredLatestOrders] = useState([])
  useEffect(() => {
    if (isEmpty(get(data, "dashboard_data"))) {
      dispatch(dashboardAction());
    }
  }, []);
  useEffect(() => {
    if (!isEmpty(get(data, "dashboard_data"))) {
      let latestdata = []
      data.dashboard_data.latestOrders.map((order) => {
        let object = {
          id: order._id,
          order_number: order.order_number,
          date: order.date,
          name: order.billing.firstname + " " + order.billing.lastname,
          payment_status: order.payment_status,
          shipping_status: order.shipping_status
        }
        latestdata.push(object)
      })
      setlatestOrders(latestdata)
      setFilteredLatestOrders(latestdata)
      setdashBoardData({ ...dashBoardData, ...get(data, "dashboard_data") });
      const OrderChartData = get(data, "dashboard_data.ordersByYearMonth")
      if (!isEmpty(OrderChartData)) {
        setChartdata(OrderChartData[0].months)
        setYear(OrderChartData[0].year)
      }
    } else {
      setdashBoardData({})
      setlatestOrders([])
      setFilteredLatestOrders([])
      setChartdata([])
      setYear('')
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
  const handleOnChangeSearch = (filtereData) => {
    setFilteredLatestOrders(filtereData)
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
            latestOrders={latestOrders || []}
            filteredLatestOrders={filteredLatestOrders || []}
            loader={loader}
            handleOnChangeSearch={handleOnChangeSearch}
          />
        </Grid>
        <Grid item lg={8} xl={9} xs={12}  >
          <Paper sx={{ paddingRight: "15px", pl: '20px' }} >
            <Box sx={{ width: 120, }}>
              <FormControl fullWidth size="small" sx={{ width: 120, m: 2 }}>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={year}
                  label="Year"
                  onChange={(e) => handleChangeChart(e)}
                >
                  {dashBoardData.ordersByYearMonth && dashBoardData.ordersByYearMonth.length > 0 ? dashBoardData.ordersByYearMonth.map((chart) => {
                    return <MenuItem value={chart.year}>{chart.year}</MenuItem>
                  }) : null}
                </Select>
              </FormControl>
            </Box>
            <ResponsiveContainer width="100%" height={250}  >
              <BarChart data={chartdata} margins={{ top: 50, right: 1, bottom: 100, left: 1 }} >
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid />
                <Legend />
                <Tooltip offset={10} />
                <Bar name="Payment Success NetSales" dataKey="paymentSuccessNetSales" stackId="x" fill="#FFB26B" barSize={30} />
                <Bar name="Net Sales" dataKey="NetSales" barSize={9} stackId="x" fill="#89C4E1" />
                <Bar name="Payment Success NetSales" dataKey="paymentSuccessNetSales" stackId="x" fill="#0081B4" barSize={30} />
                <Bar name="Gross Sales" dataKey="GrossSales" stackId="x" barSize={30} fill="#F55050" />
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
