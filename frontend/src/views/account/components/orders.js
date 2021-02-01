import React, { Fragment } from "react";
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Grid,
  Button,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Box
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import palette from "../../../theme/palette";

const Orders = () => {
  return (
    <Fragment>
      <Grid container>
        <Grid item md={12} xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <Grid container>
                <Grid item md={4} sm={4} xs={12}>
                  <Typography variant="h6">Order #1224554</Typography>
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                  <Typography variant="subtitle2">
                    3 product totaling $4500.00
                  </Typography>
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                  <Typography variant="button">Shipped</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Grid container spacing={4} className="margin-top-2">
                <Grid item lg={6} xs={12}>
                  <Typography
                    variant="h5"
                    className="margin-bottom-2"
                    style={{ color: palette.primary.dark }}
                  >
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
                    <Typography
                      variant="h5"
                      className="margin-bottom-2"
                      style={{ color: palette.primary.dark }}
                    >
                      Billing Address
                    </Typography>
                    <Typography variant="h6">Firstname lastname</Typography>
                    <Typography variant="subtitle2">Email@email.com</Typography>
                    <Typography variant="subtitle2">9997774441</Typography>
                    <Typography variant="body1">
                      Address Line First, Address Line Second,
                    </Typography>
                    <Typography variant="body1">
                      City, State, Country
                    </Typography>
                  </Box>
                  <Box className="margin-bottom-2 margin-top-2">
                    <Divider />
                  </Box>
                  <Box component="div">
                    <Typography
                      variant="h5"
                      className="margin-bottom-2"
                      style={{ color: palette.primary.dark }}
                    >
                      Shipping Address
                    </Typography>
                    <Typography variant="h6">Firstname lastname</Typography>
                    <Typography variant="subtitle2">Email@email.com</Typography>
                    <Typography variant="subtitle2">9997774441</Typography>
                    <Typography variant="body1">
                      Address Line First, Address Line Second,
                    </Typography>
                    <Typography variant="body1">
                      City, State, Country
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Typography
                    variant="h5"
                    className="margin-bottom-2"
                    style={{ color: palette.primary.dark }}
                  >
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
                            <Typography
                              variant="h5"
                              style={{ color: palette.primary.dark }}
                            >
                              Total
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              variant="h5"
                              style={{ color: palette.primary.dark }}
                            >
                              $4570
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Button size="small">Reorder</Button>
              <Button size="small" color="primary">
                Print Invoices
              </Button>
            </AccordionActions>
          </Accordion>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Orders;
