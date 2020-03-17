import React, { Fragment } from "react";
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
  TableHead
} from "@material-ui/core";
import PageTitle from "../components/pageTitle";

const Thankyou = props => {
  return (
    <Fragment>
      <PageTitle title="Thankyou" />
      <Container className="margin-top-3 margin-bottom-3">
        <Grid container spacing={4}>
          <Grid item xs={12} className="text-center margin-bottom-3">
            <Typography variant="h2">Your order has been received.</Typography>
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
                    <TableCell>12 Oct 2020</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Total</Typography>
                    </TableCell>
                    <TableCell>$ 4200.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Payment Method</Typography>
                    </TableCell>
                    <TableCell>Cash on Delievery</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Box component="div">
              <Typography variant="h4" className="margin-bottom-2">
                Billing Address
              </Typography>
              <Typography variant="h5">Firstname lastname</Typography>
              <Typography variant="subtitle2">Email@email.com</Typography>
              <Typography variant="subtitle2">9997774441</Typography>
              <Typography variant="body1">
                Address Line First, Address Line Second,
              </Typography>
              <Typography variant="body1">City, State, Country</Typography>
            </Box>
            <Box className="margin-bottom-2 margin-top-2">
              <Divider />
            </Box>
            <Box component="div">
              <Typography variant="h4" className="margin-bottom-2">
                Shipping Address
              </Typography>
              <Typography variant="h5">Firstname lastname</Typography>
              <Typography variant="subtitle2">Email@email.com</Typography>
              <Typography variant="subtitle2">9997774441</Typography>
              <Typography variant="body1">
                Address Line First, Address Line Second,
              </Typography>
              <Typography variant="body1">City, State, Country</Typography>
            </Box>
          </Grid>

          <Grid item md={12} xs={12}>
            <Typography variant="h4" className="margin-bottom-2">
              Order Details
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Products</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Product First</Typography>
                    </TableCell>
                    <TableCell>x 1</TableCell>
                    <TableCell align="right">$ 450</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Product Second</Typography>
                    </TableCell>
                    <TableCell>x 2</TableCell>
                    <TableCell align="right">$ 350</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Product Third</Typography>
                    </TableCell>
                    <TableCell>x 1</TableCell>
                    <TableCell align="right">$ 250</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={4} />
                    <TableCell>
                      <Typography variant="h6">Subtotal</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">$ 4520</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Tax</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">$ 50</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Shipping</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">$ 20</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h4">Total</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h4">$4570</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Thankyou);
