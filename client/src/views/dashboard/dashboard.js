import React, { useEffect } from "react";
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
import { connect } from "react-redux";
import { isEmpty } from "../../utils/helper";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = props => {
  const classes = useStyles();

  useEffect(() => {
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
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers userslength={props.users.users.length} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalProducts productslength={props.products.products.length} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalCustomers customerlength={props.customers.customers.length} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalSales />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <LatestProducts products={props.products.products} />
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
