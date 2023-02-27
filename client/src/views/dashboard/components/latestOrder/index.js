import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  CircularProgress,
  Box,
  Typography,

} from "@mui/material";
import { orderDeleteAction } from "../../../../store/action";
import ActionButton from "../../../components/actionbutton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import DashboardStyles from "../../dashboard-styles";
import { client_app_route_url, isEmpty } from "../../../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../../theme/index";
import { useDispatch } from "react-redux";
import TableComponent from "../../../components/table";
const LatestOrdersTheme = ({ latestOrders, loader }) => {
  const classes = DashboardStyles();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [AllOrder, setAllOrder] = useState([])
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
    { name: 'order_number', title: "Order Number", sortingactive: true },
    { name: 'date', title: "Date", sortingactive: true },
    { name: 'name', title: "Customer Name", sortingactive: true },
    { name: 'payment_status', title: "payment status", sortingactive: false },
    { name: 'shipping_status', title: "shipping status", sortingactive: false },
    {
      name: 'actions', title: "Actions", sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === 'edit') {
          navigate(`${client_app_route_url}view-order/${id}`)
        }
      }
    }]
  useEffect(() => {
    if (!isEmpty(latestOrders)) {
      let data = []
      latestOrders.map((order) => {
        console.log(order)
        let object = {
          id: order._id,
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
  }, [latestOrders])
  const handleOnChangeSearch = (filtereData) => {

    setfilterdData(filtereData)
  }
  return (
    <>
      {
        loader ? (
          <Box component="div" display="flex" justifyContent="center" p={2} >
            <CircularProgress size={20} />
          </Box >
        ) : latestOrders.length > 0 ? (
          <TableComponent
            loading={loader}
            rows={filtered}
            columns={columndata}
            searchdata={AllOrder}
            handleOnChangeSearch={handleOnChangeSearch}
            dropdown={badgefilter}
            showDeleteButton={false}
            title='Latest Orders'
          />
        ) : (
          <Box component="div" display="flex" justifyContent="center" p={2}>
            <Typography className={classes.noRecordFound} variant="caption">
              No records found
            </Typography>
          </Box>
        )
      }

    </>
  );
};


const LatestOrders = ({ latestOrders, loader }) => {

  return (
    <ThemeProvider theme={theme}>
      <LatestOrdersTheme latestOrders={latestOrders} loader={loader} />
    </ThemeProvider>
  );
};
export default LatestOrders;
