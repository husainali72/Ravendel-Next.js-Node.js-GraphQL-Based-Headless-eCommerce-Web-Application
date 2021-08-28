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
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import jumpTo from "../../../../utils/navigation";
import {convertDateToStringFormat} from "../../../utils/convertDate";
import DashboardStyles from "../../dashboard-styles";

const LatestOrders = ({ ordersState }) => {
  const classes = DashboardStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Latest Orders" />
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
                        onClick={() => jumpTo(`view-order/${order.id}`)}
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
        <React.Fragment>
          <Divider />
          <CardActions className="flex-end">
            <Link to="/all-orders">
              <Button color="primary" size="small" variant="text">
                View all <ArrowRightIcon />
              </Button>
            </Link>
          </CardActions>
        </React.Fragment>
      ) : null}
    </Card>
  );
};

export default LatestOrders;
