import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@material-ui/core";

const OrderDetails = props => {
  return (
    <Fragment>
      <Typography variant="h3" className="margin-bottom-2">
        Your Orders
      </Typography>

      <Grid container spacing={4}>
        <Grid item md={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.cart.products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>x1</TableCell>
                    <TableCell className="text-right">
                      ${product.price.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Table className="margin-top-3">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Subtotal</Typography>
                  </TableCell>
                  <TableCell className="text-right">$4500</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Shipping</Typography>
                  </TableCell>
                  <TableCell className="text-right">Flat Rate: $50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Discount</Typography>
                  </TableCell>
                  <TableCell className="text-right">Coupon: $150</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Total</Typography>
                  </TableCell>
                  <TableCell className="text-right">$4400</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item md={12}>
          <Box component="div" m={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                <Typography variant="h5">Payment Method</Typography>
              </FormLabel>
              <RadioGroup aria-label="payment-method" name="payment-method">
                <FormControlLabel
                  value="paypal"
                  control={<Radio color="default" />}
                  label="Paypal"
                />
                <FormControlLabel
                  value="cod"
                  control={<Radio color="default" />}
                  label="Cash on delievery"
                />
                <FormControlLabel
                  value="credit-card"
                  control={<Radio color="default" />}
                  label="Credit Card"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>

        <Grid item className="text-center" md={12}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
          >
            Proceed
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(OrderDetails);
