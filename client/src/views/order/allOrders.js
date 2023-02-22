import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,

} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { orderDeleteAction, ordersAction, } from "../../store/action";
import { isEmpty, } from "../../utils/helper";
import Alerts from "../components/Alert";
import Loading from "../utils/loading";
import viewStyles from "../viewStyles";

import theme from "../../theme/index";
import { Searching } from "../components/searching";
import { get } from 'lodash'
import TableComponent from "../components/table";
const AllOrdersComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const [AllOrder, setAllOrder] = useState([])
  const [tablehead, setTableHead] = useState([])
  const [loading, setloading] = useState(false)
  const columndata = [{ name: 'order_number', title: "Order Number", sortingactive: true },
  { name: 'date', title: "Date", sortingactive: true },
  { name: 'name', title: "Customer Name", sortingactive: true },
  { name: 'payment_status', title: "payment status", sortingactive: false },
  { name: 'payment_status', title: "payment status", sortingactive: false },
  { name: 'actions', title: "Actions", sortingactive: false },]
  useEffect(() => {
    if (isEmpty(get(orders, 'orders'))) {
      dispatch(ordersAction());
    }
  }, []);
  useEffect(() => {
    if (!isEmpty(get(orders, 'orders'))) {
      let data = []
      orders.orders.map((order) => {
        let object = {
          id: order.id,
          order_number: order.order_number,
          date: order.date,
          name: order.billing.firstname + " " + order.billing.lastname,
          payment_status: order.payment_status,
          shipping_status: order.shipping_status
        }
        data.push(object)
      })

      setAllOrder([...data])


    }
  }, [get(orders, 'orders')])
  useEffect(() => {
    if (!isEmpty(get(orders, 'loading')))
      setloading(get(orders, 'loading'))
  }, [get(orders, 'loading')])


  return (
    <>


      <TableComponent
        loading={loading}
        columns={columndata}
        rows={AllOrder}
        editpage='view-order'
        deletefunction={orderDeleteAction}
        title="All Orders"
      />
    </>
  );
};

export default function AllOrders() {
  return (
    <ThemeProvider theme={theme}>
      <AllOrdersComponent />
    </ThemeProvider>
  );
}
