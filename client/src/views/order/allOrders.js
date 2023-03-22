import React, { useEffect, useState } from "react";
import { client_app_route_url } from "../../utils/helper"; import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { orderDeleteAction, ordersAction, } from "../../store/action";
import { isEmpty, } from "../../utils/helper";
import { Grid } from "@mui/material";
import ActionButton from "../components/actionbutton";
import theme from "../../theme/index";
import { get } from 'lodash'
import viewStyles from "../viewStyles";
import TableComponent from "../components/table";
import { useNavigate } from "react-router-dom";
const AllOrdersComponent = () => {
  const dispatch = useDispatch();
  const classes = viewStyles()
  const orders = useSelector((state) => state.orders);
  const [AllOrder, setAllOrder] = useState([])
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [filtered, setfilterdData] = useState([])
  const badgefilter = [
    {
      name: 'payment_status',
      title: ['pending', 'failed', 'success', 'cancelled']
    },
    {
      name: 'shipping_status',
      title: ['inprogress', 'shipped', 'outfordelivery', 'delivered']
    },
  ]

  const columndata = [
    {
      name: 'order_number',
      title: "Order Number",
      sortingactive: true
    },
    {
      name: 'date',
      title: "Date",
      sortingactive: true
    },
    {
      name: 'name',
      title: "Customer Name",
      sortingactive: true
    },
    {
      name: 'payment_status',
      title: "payment status",
      sortingactive: false
    },
    {
      name: 'shipping_status',
      title: "shipping status",
      sortingactive: false
    },
    {
      name: 'actions',
      title: "Actions",
      sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === 'edit') {
          navigate(`${client_app_route_url}view-order/${id}`)
        } else if (type === "delete") {
          dispatch(orderDeleteAction(id))
        }
      }

    },]
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

      setAllOrder(data)
      setfilterdData(data)

    } else {
      setAllOrder([])
      setfilterdData([])
    }
  }, [get(orders, 'orders')])
  useEffect(() => {
    if (!isEmpty(get(orders, 'loading')))
      setloading(get(orders, 'loading'))
  }, [get(orders, 'loading')])
  const handleOnChangeSearch = (filtereData) => {

    setfilterdData(filtereData)
  }

  return (
    <>
      <Grid container spacing={0} className={classes.mainrow}>
        <Grid item xl={12} md={12} >
          <TableComponent
            loading={loading}
            rows={filtered}
            columns={columndata}
            searchdata={AllOrder}
            handleOnChangeSearch={handleOnChangeSearch}
            dropdown={badgefilter}
            showDeleteButton={true}
            searchbydate={true}
            title="All Orders"
          />
        </Grid>
      </Grid >
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
