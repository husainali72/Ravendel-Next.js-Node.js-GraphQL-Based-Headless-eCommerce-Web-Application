import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import LatestOrder from "./components/latestOrder";
import TotalUsers from "./components/totalUsers";
import TotalProducts from "./components/totalProducts";
import LatestProducts from "./components/latestProduct";
import TotalCustomers from "./components/totalCustomer";
import TotalSales from "./components/totalSales";
import {
  usersAction,
  productsAction,
  customersAction,
  ordersAction
} from "../../store/action";
import { getDashboardData } from "../../utils/service";
import { connect } from "react-redux";
import { isEmpty } from "../../utils/helper";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = props => {
  const classes = useStyles();
  const [dashBoardCount,setdashBoardCount] = useState({});
  

  useEffect(()=>{
    async function fetchData() {
      // You can await here      
      setdashBoardCount(await getDashboardData());
    }
    fetchData();      
  }, []);

  /* useEffect(() => {
    if (isEmpty(props.users.users)) {
      props.usersAction();
    }
  }, []);

  useEffect(() => {
    if (isEmpty(props.products.products)) {
      props.productsAction();
    }
  }, []);

  useEffect(() => {
    if (isEmpty(props.customers.customers)) {
      props.customersAction();
    }
  }, []);

  useEffect(() => {
    if (isEmpty(props.orders.orders)) {
      props.ordersAction();
    }
  }, []); */

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers userslength={dashBoardCount.user_count} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalProducts productslength={dashBoardCount.product_count} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalCustomers customerlength={dashBoardCount.customer_count} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalSales />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <LatestProducts products={dashBoardCount.latest_products} />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <LatestOrder orders={props.orders.orders} />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users,
    products: state.products,
    customers: state.customers,
    orders: state.orders
  };
};

const mapDispatchToProps = {
  usersAction,
  productsAction,
  customersAction,
  ordersAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
