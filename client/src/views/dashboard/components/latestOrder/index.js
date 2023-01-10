import React from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  CircularProgress,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import jumpTo from "../../../../utils/navigation";
import { convertDateToStringFormat } from "../../../utils/convertDate";
import DashboardStyles from "../../dashboard-styles";
import { client_app_route_url } from "../../../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../../theme/index";
const LatestOrdersTheme = ({ ordersState }) => {
  const classes = DashboardStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Latest Orders"
        titleTypographyProps={{ variant: "subtitle" }}
        className={classes.Cardheader}
      />
      <Divider />
      <CardContent className={classes.content}>
        {ordersState.loading ? (
          <Box component="div" display="flex" justifyContent="center" p={2}>
            <CircularProgress size={20} />
          </Box>
        ) : ordersState.orders.lenght > 0 ? (
          <Table aria-label="sticky table and Dense Table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersState.orders.slice(0, 2).map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>
                    {order.shipping.firstname + " " + order.shipping.lastname}
                  </TableCell>
                  <TableCell>{convertDateToStringFormat(order.date)}</TableCell>
                  <TableCell>
                    <span className={"product-status-chip " + order.status}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit Order" aria-label="edit">
                      <IconButton
                        aria-label="Edit"
                        onClick={() =>
                          jumpTo(
                            `${client_app_route_url}view-order/${order.id}`
                          )
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box component="div" display="flex" justifyContent="center" p={2}>
            <Typography className={classes.noRecordFound} variant="caption">
              No records found
            </Typography>
          </Box>
        )}
      </CardContent>

      {ordersState.orders.lenght > 0 ? (
        <>
          <Divider />
          <CardActions className="flex-end">
            <Link to={`${client_app_route_url}all-orders`}>
              <Button color="primary" size="small" variant="primary">
                View all <ArrowRightIcon />
              </Button>
            </Link>
          </CardActions>
        </>
      ) : null}
    </Card>
  );
};

const LatestOrders = ({ ordersState }) => {
  return (
    <ThemeProvider theme={theme}>
      <LatestOrdersTheme ordersState={ordersState} />
    </ThemeProvider>
  );
};
export default LatestOrders;
