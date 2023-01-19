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
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const chartdata = [
  { year: "1950", population: 2.525 },
  { year: "1960", population: 3.018 },
  { year: "1970", population: 3.682 },
  { year: "1980", population: 4.44 },
  { year: "1990", population: 5.31 },
  { year: "2000", population: 6.127 },
  { year: "2010", population: 6.93 },
];
const DashboardComponent = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const Orders = useSelector((state) => state.orders);
  const data = useSelector((state) => state.dashboardReducer.dashboard_data);

  const [dashBoardCount, setdashBoardCount] = useState({});
  const loader = useSelector((state) => state.dashboardReducer.loading);
  const chardata = [
    {
      name: "Jan",
      profit: 4000,
      loss: 2400,
      MonthOrders: 2400,
      investment: 2300,
    },
    {
      name: "Feb",
      profit: 3000,
      loss: 1398,
      MonthOrders: 2210,
      investment: 2100,
    },
    {
      name: "Mar",
      profit: 2000,
      loss: 9800,
      MonthOrders: 2290,
      investment: 2200,
    },
    {
      name: "Apr",
      profit: 2780,
      loss: 3908,
      MonthOrders: 2000,
      investment: 1000,
    },
    {
      name: "May",
      profit: 1890,
      loss: 4800,
      MonthOrders: 2181,
      investment: 2000,
    },
    {
      name: "Jun",
      profit: 2390,
      loss: 3800,
      MonthOrders: 2500,
      investment: 2200,
    },
    {
      name: "Jul",
      profit: 3490,
      loss: 4300,
      MonthOrders: 2100,
      investment: 2000,
    },
    {
      name: "Aug",
      profit: 3490,
      loss: 4300,
      MonthOrders: 2100,
      investment: 2000,
    },
    {
      name: "Sep",
      profit: 3490,
      loss: 4300,
      MonthOrders: 2100,
      investment: 1800,
    },
    {
      name: "Oct",
      profit: 3490,
      loss: 4300,
      MonthOrders: 2100,
      investment: 1900,
    },
    {
      name: "Nov",
      profit: 3490,
      loss: 3400,
      MonthOrders: 4300,
      investment: 2100,
    },
    {
      name: "Dec",
      profit: 3490,
      loss: 4300,
      MonthOrders: 2100,
      investment: 1700,
    },
  ];
  useEffect(() => {
    if (isEmpty(data)) {
      dispatch(dashboardAction());
    } else {
      setdashBoardCount({ ...data });
    }
  }, [data]);
  const options = {
    scales: {
      XAxis: [
        {
          color: "red",
        },
      ],
    },
  };
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
            count={`$${dashBoardCount.totalSales}`}
            title={"TOTAL SALES"}
            Icon={({ className }) => (
              <AttachMoneyOutlinedIcon className={className} />
            )}
            loader={loader}
          />
        </Grid>
        <Grid item lg={8} xl={12} md={12} xs={12}>
          <LatestOrder ordersState={Orders} />
        </Grid>

        <Grid item lg={8} xl={9} xs={12} ml={0}>
          {/* <Paper>
            <Chart data={chartdata}>
              <ArgumentAxis />
              <ValueAxis />

              <BarSeries valueField="population" argumentField="year" />
              <Title text="World population" />
              <Animation />
            </Chart>
          </Paper> */}
          <Paper>
            <BarChart
              width={1200}
              height={500}
              data={chardata}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid height={10} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* <Bar dataKey="profit" stackId="a" fill="#00E7FF" width={10} /> */}
              {/* <Bar
                dataKey="loss"
                stackId="a"
                fill="rgb(19, 108, 190)"
                width={10}
              />

              <Bar dataKey="MonthOrders" stackId="a" fill="#154050" /> */}
              <Bar dataKey="MonthOrders" fill="#154050" />
            </BarChart>{" "}
          </Paper>
        </Grid>
        <Grid item lg={4} xl={3} xs={12}>
          <LatestProducts
            products={dashBoardCount.latestProducts}
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
