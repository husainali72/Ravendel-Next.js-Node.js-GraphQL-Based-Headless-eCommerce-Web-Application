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
  Badge
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { convertDateToStringFormat } from "../../../utils/convertDate";
import DashboardStyles from "../../dashboard-styles";
import { client_app_route_url } from "../../../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../../theme/index";
import { badgeColor } from "../../../components/BadgeColor";
const LatestOrdersTheme = ({ latestOrders, loader }) => {
  const classes = DashboardStyles();
  const navigate = useNavigate();

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Latest Orders"
        titleTypographyProps={{ variant: "subtitle" }}
        className={classes.Cardheader}
      />
      <Divider />
      <CardContent className={classes.content}>
        {loader ? (
          <Box component="div" display="flex" justifyContent="center" p={2}>
            <CircularProgress size={20} />
          </Box>
        ) : latestOrders.length > 0 ? (
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
                <TableCell>Payment Status</TableCell>
                <TableCell>Shipping Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {latestOrders.slice(0, 2).map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>
                    {order.shipping.firstname + " " + order.shipping.lastname}
                  </TableCell>
                  <TableCell>{convertDateToStringFormat(order.date)}</TableCell>

                  <TableCell>
                    <Badge badgeContent={order.payment_status} color={badgeColor(order.payment_status)} sx={{ ml: '40px' }} className={"product-status-chip " + order.status} />

                  </TableCell>
                  <TableCell>
                    <Badge badgeContent={order.shipping_status} color={badgeColor(order.shipping_status)} sx={{ ml: '40px' }} className={"product-status-chip " + order.status} />

                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit Order" aria-label="edit">
                      <IconButton
                        aria-label="Edit"
                        onClick={() =>
                          navigate(
                            `${client_app_route_url}view-order/${order._id}`
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

      {latestOrders.length > 0 ? (
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

const LatestOrders = ({ latestOrders, loader }) => {
  return (
    <ThemeProvider theme={theme}>
      <LatestOrdersTheme latestOrders={latestOrders} loader={loader} />
    </ThemeProvider>
  );
};
export default LatestOrders;
