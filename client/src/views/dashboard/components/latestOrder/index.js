import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
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
  IconButton
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../../../viewStyles";
import jumpTo from "../../../../utils/navigation";
import convertDefault from "../../../utils/convertDate";

const LatestOrders = props => {
  const { className, ...rest } = props;

  const classes = viewStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Latest Orders" />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.inner}>
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
              {!props.orders ? (
                <TableRow className="text-center">
                  <TableCell>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                props.orders.slice(0, 2).map(order => (
                  <TableRow hover key={order.id}>
                    <TableCell>
                      {order.shipping.firstname + " " + order.shipping.lastname}
                    </TableCell>
                    <TableCell>{convertDefault(order.date)}</TableCell>
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <Divider />
      <CardActions className="flex-end">
        <Link to="/all-orders">
          <Button color="primary" size="small" variant="text">
            View all <ArrowRightIcon />
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
