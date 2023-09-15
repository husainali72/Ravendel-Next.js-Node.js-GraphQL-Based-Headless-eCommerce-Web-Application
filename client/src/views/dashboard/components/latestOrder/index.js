import React from "react";
import {
  Card,
  CardHeader,
  Divider,
  CircularProgress,
  Box,
  Typography,
  Grid,

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
const LatestOrdersTheme = ({
  latestOrders,
  loader,
  handleOnChangeSearch,
  filteredLatestOrders
}) => {
  const classes = DashboardStyles();
  const navigate = useNavigate();
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
      name: 'paymentStatus',
      title: "payment status",
      sortingactive: false
    },
    {
      name: 'shippingStatus',
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
        }
      }
    }]
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
            rows={filteredLatestOrders}
            columns={columndata}
            searchdata={latestOrders}
            handleOnChangeSearch={handleOnChangeSearch}
            dropdown={badgefilter}
            showDeleteButton={false}
            title='Latest Orders'
            searchbydate={true}
          />
        ) : (
          <Card className={classes.root}>
            <CardHeader
              title="Latest Orders"
              titleTypographyProps={{ variant: "subtitle" }}
              className={classes.Cardheader}
            />
            <Divider />
            <Box component="div" display="flex" justifyContent="center" p={2}>
              <Typography className={classes.noRecordFound} variant="caption">
                No records found
              </Typography>
            </Box>
          </Card>
        )
      }
    </>
  );
};
const LatestOrders = ({
  latestOrders,
  loader,
  handleOnChangeSearch,
  filteredLatestOrders }) => {
  return (
    <ThemeProvider theme={theme}>
      <LatestOrdersTheme
        latestOrders={latestOrders}
        loader={loader}
        handleOnChangeSearch={handleOnChangeSearch}
        filteredLatestOrders={filteredLatestOrders}
      />
    </ThemeProvider>
  );
};
export default LatestOrders;
