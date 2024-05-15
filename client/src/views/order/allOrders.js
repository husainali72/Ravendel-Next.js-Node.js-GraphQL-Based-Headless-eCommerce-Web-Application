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
      name: 'paymentStatus',
      status: [{
        name: 'pending',
        title: 'Pending'
      },
      {
        name: 'failed',
        title: 'Failed'
      },
      {
        name: 'success',
        title: 'Success'
      },
      {
        name: 'cancelled',
        title: 'Cancelled'
      }
      ]
    },
    {
      name: 'shippingStatus',
      status: [
        {
          name: 'inprogress',
          title: 'Inprogress'
        },
        {
          name: 'shipped',
          title: 'Shipped'
        },
        {
          name: 'outfordelivery',
          title: 'Out For Delivery'
        },
        {
          name: 'delivered',
          title: 'Delivered'
        }
      ]
    },
  ]

  const columndata = [
    {
      name: 'orderNumber',
      type: "text",
      title: "Order Number",
      sortingactive: true
    },
    {
      name: 'date',
      type: 'date',
      title: "Date",
      sortingactive: true
    },
    {
      name: 'name',
      type: "text",
      title: "Customer Name",
      sortingactive: true
    },
    {
      name: 'paymentStatus',
      type: 'badge',
      title: "payment status",
      sortingactive: false
    },
    {
      name: 'shippingStatus',
      type: 'badge',
      title: "shipping status",
      sortingactive: false
    },
    {
      name: 'actions',
      type: 'actions',
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
          orderNumber: order.orderNumber,
          date: order.date,
          name: order.billing.firstname + " " + order.billing.lastname,
          paymentStatus: order.paymentStatus,
          shippingStatus: order.shippingStatus
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
