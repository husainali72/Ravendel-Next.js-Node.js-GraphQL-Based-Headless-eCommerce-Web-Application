import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
  Tooltip,
  TextField,
  CardActions,
  Tabs,
  Tab,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
  Select,
  MenuItem,
  Paper
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../viewStyles.js";
import Loading from "../utils/loading";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { isEmpty } from "../../utils/helper";
import {
  shippingAction,
  globalShippingUpdateAction,
  shippingClassAddAction,
  shippingClassUpdateAction,
  shippingClassDeleteAction,
  productsAction
} from "../../store/action/";
import { connect } from "react-redux";

var ShippingObject = {
  name: "",
  amount: ""
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

const Shipping = props => {
  const classes = viewStyles();
  const [value, setValue] = useState(0);
  const [customShippingClass, setcustomShippingClass] = useState(
    ShippingObject
  );
  const [shippingGlobal, setshippingGlobal] = useState({
    is_global: false,
    shipping_class: "",
    is_per_order: true,
    overwrite: false
  });

  const [editMode, setEditMode] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (isEmpty(props.shippingState.shipping.shipping_class)) {
      props.shippingAction();
    }
  }, []);

  useEffect(() => {
    if (shippingGlobal.overwrite) {
      //props.productsReset();
      props.productsAction();
    }
    setshippingGlobal({
      ...shippingGlobal,
      ...props.shippingState.shipping.global
    });
    setEditMode(false);
    setcustomShippingClass(ShippingObject);
  }, [props.shippingState.shipping]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const saveGlobal = () => {
    props.globalShippingUpdateAction({ global: shippingGlobal });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const addCustomShipping = () => {
    props.shippingClassAddAction({ shipping_class: customShippingClass });
  };

  const editShipping = shipping => {
    setEditMode(true);
    setcustomShippingClass(shipping);
  };

  const updateCustomShipping = () => {
    //setEditMode(false);
    props.shippingClassUpdateAction({ shipping_class: customShippingClass });
  };

  const cancelShipping = () => {
    setEditMode(false);
    setcustomShippingClass(ShippingObject);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item md={12} sm={12} xs={12}>
          <Card>
            <CardHeader title="Shipping" />
            <Divider />
            <CardContent>
              {/* ===================================Tab Navigation=================================== */}
              <Paper square>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Shipping Tab"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Global Shipping" {...a11yProps(0)} />
                  <Tab label="Custom Shipping" {...a11yProps(1)} />
                </Tabs>
              </Paper>
              <Box className={classes.taxTabsWrapper}>
                {/* ===================================Global Shipping=================================== */}
                <TabPanel value={value} index={0}>
                  {props.shippingState.loading && <Loading />}

                  <Grid container spacing={1} className={classes.marginBottom}>
                    <Grid item md={6} sm={12} xs={12}>
                      <Grid container spacing={1}>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={shippingGlobal.is_global}
                                onChange={e =>
                                  setshippingGlobal({
                                    ...shippingGlobal,
                                    is_global: e.target.checked
                                  })
                                }
                              />
                            }
                            label="Global Shipping"
                          />
                        </Grid>
                        <Grid item>
                          <FormControl
                            variant="outlined"
                            size="small"
                            style={{ minWidth: 300 }}
                          >
                            <Select
                              labelId="Shipping-name"
                              id="Shipping-name"
                              name="Shipping-name"
                              value={shippingGlobal.shipping_class}
                              onChange={e =>
                                setshippingGlobal({
                                  ...shippingGlobal,
                                  shipping_class: e.target.value
                                })
                              }
                            >
                              {props.shippingState.shipping.shipping_class.map(
                                (shipping, index) => {
                                  return (
                                    <MenuItem value={shipping._id} key={index}>
                                      {shipping.name}
                                    </MenuItem>
                                  );
                                }
                              )}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid item md={12} sm={12} xs={12}>
                        <RadioGroup
                          aria-label="taxOption"
                          value={
                            shippingGlobal.is_per_order
                              ? "per_order"
                              : "per_product"
                          }
                          onChange={e =>
                            setshippingGlobal({
                              ...shippingGlobal,
                              is_per_order: e.target.value === "per_order"
                            })
                          }
                        >
                          <FormControlLabel
                            value="per_order"
                            control={<Radio color="primary" />}
                            label="Per Order"
                          />
                          <FormControlLabel
                            value="per_product"
                            control={<Radio color="primary" />}
                            label="Per Product"
                          />
                        </RadioGroup>
                      </Grid>

                      {shippingGlobal.is_global && (
                        <Grid item md={12} sm={12} xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={shippingGlobal.overwrite}
                                onChange={e =>
                                  setshippingGlobal({
                                    ...shippingGlobal,
                                    overwrite: e.target.checked
                                  })
                                }
                              />
                            }
                            label="Do you want to override the current shipping class selection in the existing products?"
                          />
                        </Grid>
                      )}
                    </Grid>
                  </Grid>

                  <Button
                    size="small"
                    color="primary"
                    onClick={saveGlobal}
                    variant="contained"
                  >
                    Save Changes
                  </Button>
                </TabPanel>
                {/* ===================================Custom Shiping=================================== */}
                <TabPanel value={value} index={1}>
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <Card>
                        {props.shippingState.loading && <Loading />}

                        <CardHeader title="All Shippings" />
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
                                  <TableCell>Name</TableCell>
                                  <TableCell>Amount</TableCell>
                                  <TableCell>Actions</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {props.shippingState.shipping.shipping_class &&
                                  props.shippingState.shipping.shipping_class
                                    .slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage
                                    )
                                    .map(shipping => (
                                      <TableRow key={shipping._id} hover>
                                        <TableCell>{shipping.name}</TableCell>
                                        <TableCell>{shipping.amount}</TableCell>
                                        <TableCell>
                                          <Tooltip
                                            title="Edit shipping"
                                            aria-label="edit"
                                          >
                                            <IconButton
                                              aria-label="Edit"
                                              onClick={() =>
                                                editShipping(shipping)
                                              }
                                            >
                                              <EditIcon />
                                            </IconButton>
                                          </Tooltip>
                                          {!shipping.system && (
                                            <Tooltip
                                              title="Delete shipping"
                                              aria-label="delete"
                                            >
                                              <IconButton
                                                aria-label="Delete"
                                                className={classes.deleteicon}
                                                onClick={e =>
                                                  props.shippingClassDeleteAction(
                                                    {
                                                      _id: shipping._id
                                                    }
                                                  )
                                                }
                                              >
                                                <DeleteIcon />
                                              </IconButton>
                                            </Tooltip>
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 20]}
                            component="div"
                            count={
                              props.shippingState.shipping.shipping_class.length
                            }
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                          />
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item md={6}>
                      <Card>
                        <CardHeader
                          title={`${editMode ? "Edit" : "Add"} Tax`}
                        />
                        <Divider />
                        <CardContent>
                          <TextField
                            type="text"
                            label="Name"
                            name="name"
                            variant="outlined"
                            onChange={e =>
                              setcustomShippingClass({
                                ...customShippingClass,
                                name: e.target.value
                              })
                            }
                            value={customShippingClass.name}
                            className={clsx(
                              classes.marginBottom,
                              classes.width100
                            )}
                          />
                          <TextField
                            type="number"
                            label="Amount"
                            name="amount"
                            variant="outlined"
                            onChange={e =>
                              setcustomShippingClass({
                                ...customShippingClass,
                                amount: e.target.value
                              })
                            }
                            value={customShippingClass.amount}
                            className={clsx(
                              classes.marginBottom,
                              classes.width100
                            )}
                          />
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            color="primary"
                            onClick={
                              editMode
                                ? updateCustomShipping
                                : addCustomShipping
                            }
                            variant="contained"
                          >
                            {editMode ? "Update" : "Add"}
                          </Button>
                          <Button
                            size="small"
                            onClick={cancelShipping}
                            variant="contained"
                            className={classes.cancelBtn}
                          >
                            Cancel
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return { shippingState: state.shippings };
};

const mapDispatchToProps = {
  shippingAction,
  globalShippingUpdateAction,
  shippingClassAddAction,
  shippingClassUpdateAction,
  shippingClassDeleteAction,
  productsAction,
  productsReset: () => dispatch => {
    dispatch({
      type: "PRODUCT_RESET",
      payload: []
    });
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
