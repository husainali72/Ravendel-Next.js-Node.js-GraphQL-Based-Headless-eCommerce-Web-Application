import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Box,
  Container,
  Grid,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  TableHead,
  Button,
} from "@material-ui/core";
import PageTitle from "../components/pageTitle";
import { isEmpty } from "../../utils/helper";
import { Link } from "react-router-dom";

const Thankyou = (props) => {
  const [checkoutDetails, setCheckoutDetails] = useState({});

  useEffect(() => {
    setCheckoutDetails(props.checkoutDetail.chekoutDetails);
  }, [props.checkoutDetail]);

  return (
    <Fragment>
      <PageTitle title="Thankyou" />
      {!isEmpty(checkoutDetails) ? (
        <Container className="margin-top-3 margin-bottom-3">
          <Grid container spacing={4}>
            <Grid item xs={12} className="text-center margin-bottom-3">
              <Typography variant="h2">
                Your order has been received.
              </Typography>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Typography variant="h4" className="margin-bottom-2">
                Order Info
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Order Number</Typography>
                      </TableCell>
                      <TableCell>452011245</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Date</Typography>
                      </TableCell>
                      <TableCell>
                        {/* {checkoutDetails.checkoutDate} */}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Total</Typography>
                      </TableCell>
                      <TableCell>${checkoutDetails.total}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Payment Method</Typography>
                      </TableCell>
                      <TableCell>
                        <span className="text-capitalize">
                          {checkoutDetails.paymentMethod}
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item lg={6} xs={12}>
              {checkoutDetails.billing && (
                <Box component="div">
                  <Typography variant="h4" className="margin-bottom-2">
                    Billing Address
                  </Typography>
                  <Typography variant="h5">
                    {checkoutDetails.billing.firstname}{" "}
                    {checkoutDetails.billing.lastname}
                  </Typography>
                  <Typography variant="subtitle2">
                    {checkoutDetails.billing.email}
                  </Typography>
                  <Typography variant="subtitle2">
                    {checkoutDetails.billing.phone}
                  </Typography>
                  <Typography variant="body1">
                    {checkoutDetails.billing.address_line_1},
                  </Typography>
                  <Typography variant="body1">
                    {checkoutDetails.billing.address_line_2},
                  </Typography>
                  <Typography variant="body1">
                    {checkoutDetails.billing.city}, &nbsp;
                    {checkoutDetails.billing.state}, &nbsp;
                    {checkoutDetails.billing.country}, &nbsp;
                    {checkoutDetails.billing.poscode}
                  </Typography>
                </Box>
              )}
              {checkoutDetails.billing && checkoutDetails.billing.order_notes && (
                <Fragment>
                  <Box className="margin-bottom-2 margin-top-2">
                    <Divider />
                  </Box>
                  <Box component="div">
                    <Typography variant="h6" className="margin-bottom-1">
                      Order Notes
                    </Typography>
                    <Typography variant="body1">
                      {checkoutDetails.billing.order_notes}
                    </Typography>
                  </Box>
                </Fragment>
              )}
              <Box className="margin-bottom-2 margin-top-2">
                <Divider />
              </Box>
              {checkoutDetails.shippingAddress && (
                <Box component="div">
                  <Typography variant="h4" className="margin-bottom-2">
                    Shipping Address
                  </Typography>
                  <Typography variant="h5">
                    {checkoutDetails.shipping.shippingfirstname}{" "}
                    {checkoutDetails.shipping.shippinglastname}
                  </Typography>
                  <Typography variant="subtitle2">
                    {checkoutDetails.shipping.shippingemail}
                  </Typography>
                  <Typography variant="subtitle2">
                    {checkoutDetails.shipping.shippingphone}
                  </Typography>
                  <Typography variant="body1">
                    {checkoutDetails.shipping.shippingaddress_line_1},
                  </Typography>
                  <Typography variant="body1">
                    {checkoutDetails.shipping.shippingaddress_line_2},
                  </Typography>
                  <Typography variant="body1">
                    {checkoutDetails.shipping.shippingcity}, &nbsp;
                    {checkoutDetails.shipping.shippingstate}, &nbsp;
                    {checkoutDetails.shipping.shippingcountry}, &nbsp;
                    {checkoutDetails.shipping.shippingposcode}
                  </Typography>
                </Box>
              )}
            </Grid>

            {checkoutDetails.products && (
              <Grid item md={12} xs={12}>
                <Typography variant="h4" className="margin-bottom-2">
                  Order Details
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Products</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {checkoutDetails.products.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell className="text-right">
                            x{product.cartQty}
                          </TableCell>
                          <TableCell className="text-right">
                            $
                            {product.pricing.sellprice
                              ? product.pricing.sellprice.toFixed(2)
                              : product.pricing.price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            $
                            {product.pricing.sellprice
                              ? product.pricing.sellprice.toFixed(2) *
                                product.cartQty
                              : product.pricing.price.toFixed(2) *
                                product.cartQty}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={4} />
                        <TableCell rowSpan={4} />
                        <TableCell>
                          <Typography variant="h6">Subtotal</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6">
                            ${checkoutDetails.subtotal}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">Coupon</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6">
                            ${checkoutDetails.coupon}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">Shipping</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6">
                            {checkoutDetails.delievery === 0
                              ? "Free"
                              : "Flat Rate: $" + checkoutDetails.delievery}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h4">Total</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h4">
                            ${checkoutDetails.total}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}
          </Grid>
        </Container>
      ) : (
        <Grid container justify="center">
          <Grid
            item
            md={12}
            className="margin-top-3 margin-bottom-3 text-center"
          >
            <Typography variant="h3" className="margin-bottom-1">
              Your cart is currently empty.
            </Typography>
            <Link to="/shop">
              <Button variant="contained" color="primary">
                Shop Now
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  checkoutDetail: state.checkoutDetail,
});

export default connect(mapStateToProps)(Thankyou);
