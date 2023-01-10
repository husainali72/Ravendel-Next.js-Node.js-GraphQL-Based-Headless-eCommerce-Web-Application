import React, { Fragment, useEffect, useState } from "react";
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
} from"@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { couponsAction, couponDeleteAction } from "../../store/action";
import jumpTo from "../../utils/navigation";
import { isEmpty } from "../../utils/helper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import viewStyles from "../viewStyles";
import {Alert, Loading} from '../components';
import {convertDateToStringFormat} from '../utils/convertDate';
import {client_app_route_url} from '../../utils/helper';

const AllCoupons = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const Coupons = useSelector(state => state.coupons)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (isEmpty(Coupons.coupons)) {
      // dispatch(couponsAction());
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Alert />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {Coupons.loading && <Loading />}
            <CardHeader
              action={
                <Link to={`${client_app_route_url}add-coupon`}>
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
                  aria-label="allcoupons-table"
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
                    {Coupons.coupons
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(coupon => (
                        <TableRow key={coupon.id} hover>
                          <TableCell>{coupon.code}</TableCell>
                          <TableCell>{coupon.discount_type}</TableCell>
                          <TableCell>{coupon.discount_value}</TableCell>
                          <TableCell>{convertDateToStringFormat(coupon.expire)}</TableCell>
                          <TableCell>
                            <Tooltip
                              title="Edit Coupon"
                              aria-label="edit-coupon"
                            >
                              <IconButton
                                aria-label="Edit"
                                onClick={() =>
                                  jumpTo(`${client_app_route_url}edit-coupon/${coupon.id}`)
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
                                  dispatch(couponDeleteAction(coupon.id))
                                }
                                disabled
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
                count={Coupons.coupons.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AllCoupons;
