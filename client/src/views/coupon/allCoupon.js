import React, { Fragment, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  IconButton,
  Button,
  Tooltip
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { couponsAction, couponDeleteAction } from "../../store/action";
import jumpTo from "../../utils/navigation";
import { isEmpty } from "../../utils/helper";
import Alert from "../utils/Alert";
import Loading from "../utils/loading";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../viewStyles";

const AllCoupons = props => {
  const classes = viewStyles();

  useEffect(() => {
    if (isEmpty(props.couponState.coupons)) {
      props.couponsAction();
    }
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Alert />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {props.couponState.loading && <Loading />}
            <CardHeader
              action={
                <Link to="/add-coupon">
                  <Button
                    color="primary"
                    className={classes.addUserBtn}
                    size="small"
                    variant="contained"
                  >
                    Add Coupon
                  </Button>
                </Link>
              }
              title="All Coupons"
            />
            <Divider />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table
                  stickyHeader
                  aria-label="sticky table and Dense Table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Code</TableCell>
                      <TableCell>Coupon type</TableCell>
                      <TableCell>Coupon Amount</TableCell>
                      <TableCell>Expiry date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.couponState.coupons
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(coupon => (
                        <TableRow key={coupon.id} hover>
                          <TableCell>{coupon.code}</TableCell>
                          <TableCell>{coupon.discount_type}</TableCell>
                          <TableCell>{coupon.discount_value}</TableCell>
                          <TableCell>{coupon.expire}</TableCell>
                          <TableCell>
                            <Tooltip
                              title="Edit Coupon"
                              aria-label="edit-coupon"
                            >
                              <IconButton
                                aria-label="Edit"
                                onClick={() =>
                                  jumpTo(`edit-coupon/${coupon.id}`)
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title="Delete Coupon"
                              aria-label="delete-coupon"
                            >
                              <IconButton
                                aria-label="Delete"
                                className={classes.deleteicon}
                                onClick={() =>
                                  props.couponDeleteAction(coupon.id)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={props.couponState.coupons.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { couponState: state.coupons };
};

const mapDispatchToProps = {
  couponsAction,
  couponDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCoupons);
