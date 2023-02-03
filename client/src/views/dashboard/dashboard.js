import React, { useEffect, useState } from "react";
import { Grid, Box, useMediaQuery } from "@mui/material";
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
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,

} from "recharts";
import { currencyFormat } from "../order/CurrencyFormat";
import { get } from "lodash";

const DashboardComponent = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const Orders = useSelector((state) => state.orders);
  const data = useSelector((state) => state.dashboardReducer);

  const [dashBoardCount, setdashBoardCount] = useState({});
  const loader = useSelector((state) => state.dashboardReducer.loading);
  const chartData = [
    {
      month: "Jan",
      GrossSales: 675,
      NetSales: 756,
      count: 1000,
      paymentSuccessGrossSales: 2000,
      paymentSuccessNetSales: 3000,
    },
    {
      month: "Feb",
      GrossSales: 675,
      NetSales: 756,
      count: 1000,
      paymentSuccessGrossSales: 2000,
      paymentSuccessNetSales: 3000,
    },
    {
      month: "Mar",
      GrossSales: 675,
      NetSales: 756,
      count: 1000,
      paymentSuccessGrossSales: 2000,
      paymentSuccessNetSales: 3000,
    },
    {
      month: "Apr",
      GrossSales: 675,
      NetSales: 756,
      count: 1000,
      paymentSuccessGrossSales: 2000,
      paymentSuccessNetSales: 3000,
    },
    {
      month: "May",
      GrossSales: 675,
      NetSales: 756,
      count: 1000,
      paymentSuccessGrossSales: 2000,
      paymentSuccessNetSales: 3000,
    },
    {
      month: "Jun",
      GrossSales: 675,
      NetSales: 756,
      count: 1000,
      paymentSuccessGrossSales: 2000,
      paymentSuccessNetSales: 3000,
    },
    {
      month: "Jul",
      GrossSales: 675,
      NetSales: 756,
      count: 1000,
      paymentSuccessGrossSales: 2000,
      paymentSuccessNetSales: 3000,
    },
    {
      month: "Aug",
      GrossSales: 675,
      NetSales: 756,
      count: 1000,
      paymentSuccessGrossSales: 2000,
      paymentSuccessNetSales: 3000,
    },
    {
      month: "sep",
      GrossSales: 675,
      NetSales: 756,
      count: 1000,
      paymentSuccessGrossSales: 2000,
      paymentSuccessNetSales: 3000,
    },
    {
      month: "Oct",
      GrossSales: 675,
      NetSales: 756,
      count: 1000,
      paymentSuccessGrossSales: 2000,
      paymentSuccessNetSales: 3000,
    },
    {
      month: "Nov",
      GrossSales: 675,
      NetSales: 756,
      count: 1000,
      paymentSuccessGrossSales: 2000,
      paymentSuccessNetSales: 3000,
    },
    {
      month: "Dec",
      GrossSales: 675,
      NetSales: 756,
      count: 1000,
      paymentSuccessGrossSales: 2000,
      paymentSuccessNetSales: 3000,
    },
  ];

  useEffect(() => {
    if (isEmpty(get(data, "dashboard_data"))) {
      dispatch(dashboardAction());
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(get(data, "dashboard_data"))) {
      setdashBoardCount({ ...dashBoardCount, ...get(data, "dashboard_data") });
    }
  }, [get(data, "dashboard_data")]);

  return (
    <Box component="div" p={isSmall ? 1 : 4}>
      <Grid container spacing={isSmall ? 1 : 4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <DashboardCard
            count={dashBoardCount.userCount}
            title={"TOTAL USERS"}
            Icon={({ className }) => (
              <PeopleAltOutlinedIcon className={className} />
            )}
            loader={loader}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <DashboardCard
            count={dashBoardCount.productCount}
            title={"TOTAL PRODUCTS"}
            Icon={({ className }) => (
              <StorefrontOutlinedIcon className={className} />
            )}
            loader={loader}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <DashboardCard
            count={dashBoardCount.customerCount}
            title={"TOTAL CUSTOMERS"}
            Icon={({ className }) => (
              <PeopleAltOutlinedIcon className={className} />
            )}
            loader={loader}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <DashboardCard
            count={currencyFormat(dashBoardCount.totalSales)}
            title={"TOTAL SALES"}
            Icon={({ className }) => (
              <AttachMoneyOutlinedIcon className={className} />
            )}
            loader={loader}
          />
        </Grid>
        <Grid item lg={8} xl={12} md={12} xs={12}>
          <LatestOrder
            latestOrders={dashBoardCount.latestOrders || []}
            loader={loader}
          />
        </Grid>

        <Grid item lg={8} xl={9} xs={12} ml={0}>
          <Paper>
            <BarChart
              width={1200}
              height={500}
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid height={10} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="profit" stackId="a" fill="#00E7FF" width={10} />
              <Bar
                dataKey="GrossSales"
                stackId="a"
                fill="rgb(19, 108, 190)"
                width={10}
              />
              <Bar dataKey="NetSales" stackId="a" fill="#154050" />
              <Bar dataKey="count" stackId="a" fill="#FE938C" />
              <Bar
                dataKey="paymentSuccessGrossSales"
                stackId="a"
                fill="#D496A7"
              />
              <Bar dataKey="paymentSuccessNetSales" fill="#5D576B" />
            </BarChart>{" "}
          </Paper>
        </Grid>
        <Grid item lg={4} xl={3} xs={12}>
          <LatestProducts
            products={dashBoardCount.latestProducts || []}
            loader={loader}
          />
        </Grid>
      </Grid>
    </Box>
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
