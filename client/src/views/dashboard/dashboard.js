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
} from "@devexpress/dx-react-chart-material-ui";

const DashboardComponent = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const Orders = useSelector((state) => state.orders);
  const data = useSelector((state) => state.dashboardReducer.dashboard_data);

  const [dashBoardCount, setdashBoardCount] = useState({});
  const loader = useSelector((state) => state.dashboardReducer.loading);
  const chartdata = [
    { argument: "Jan", value: 30 },
    { argument: "Feb", value: 20 },
    { argument: "Mar", value: 10 },
    { argument: "Apr", value: 50 },
    { argument: "May", value: 60 },
    { argument: "Jun", value: 60 },
    { argument: "Jul", value: 60 },
    { argument: "Aug", value: 60 },
    { argument: "Sep", value: 60 },
    { argument: "Oct", value: 60 },
    { argument: "Nov", value: 60 },
    { argument: "Dec", value: 60 },
  ];
  useEffect(() => {
    if (isEmpty(data)) {
      dispatch(dashboardAction());
    } else {
      setdashBoardCount({ ...data });
    }
  }, [data]);

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
            count={"$23,000"}
            title={"TOTAL SALES"}
            Icon={({ className }) => (
              <AttachMoneyOutlinedIcon className={className} />
            )}
            loader={loader}
          />
        </Grid>
        <Grid item lg={4} xl={3} md={12} xs={12}>
          <LatestProducts
            products={dashBoardCount.latestProducts}
            loader={loader}
          />
        </Grid>
        <Grid item lg={8} xl={9} md={12} xs={12}>
          <LatestOrder ordersState={Orders} />
        </Grid>
        <Grid item lg={8} xl={9} md={0} xs={12} ml={15}>
          <Paper>
            <Chart data={chartdata} style={{ width: "50%" }}>
              <ArgumentAxis />
              <ValueAxis />
              <BarSeries
                valueField="value"
                argumentField="argument"
                color="#154050"
                className="barChart"
              />
            </Chart>
          </Paper>
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
