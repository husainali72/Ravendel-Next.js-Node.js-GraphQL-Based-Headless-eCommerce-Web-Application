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
  Checkbox
} from "@material-ui/core";

import Alert from "../utils/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../viewStyles.js";
import Loading from "../utils/loading";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import {
  shippingAction,
  globalShippingUpdateAction,
  shippingClassAddAction,
  shippingClassUpdateAction,
  shippingClassDeleteAction
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
  //const classes = useStyles();
  const classes = viewStyles();
  const [value, setValue] = useState(0);
  const [customShippingClass, setcustomShippingClass] = useState(
    ShippingObject
  );
  const [shippingGlobal, setshippingGlobal] = useState({
    is_global: false,
    name: "",
    amount: "",
    is_per_order: true
  });

  const [editMode, setEditMode] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    props.shippingAction();
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
      <Alert />
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Global Shipping" {...a11yProps(0)} />
        <Tab label="Custom Shipping" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        {props.shippingState.loading && <Loading />}
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
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

          <TextField
            id="outlined-secondary"
            label="Shipping Name"
            variant="outlined"
            color="secondary"
            value={shippingGlobal.name}
            onChange={e =>
              setshippingGlobal({ ...shippingGlobal, name: e.target.value })
            }
          />

          <TextField
            type="number"
            id="outlined-secondary"
            label="Amount"
            variant="outlined"
            color="secondary"
            value={shippingGlobal.amount}
            onChange={e =>
              setshippingGlobal({ ...shippingGlobal, amount: e.target.value })
            }
          />

          <RadioGroup
            aria-label="taxOption"
            value={shippingGlobal.is_per_order ? "per_order" : "per_product"}
            onChange={e =>
              setshippingGlobal({
                ...shippingGlobal,
                is_per_order: e.target.value === "per_order"
              })
            }
          >
            <FormControlLabel
              value="per_order"
              control={<Radio />}
              label="Per Order"
            />
            <FormControlLabel
              value="per_product"
              control={<Radio />}
              label="Per Product"
            />
          </RadioGroup>

          <Button
            size="small"
            color="primary"
            onClick={saveGlobal}
            variant="contained"
          >
            Save Changes
          </Button>
        </FormGroup>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container spacing={4} className={classes.mainrow}>
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
                                    onClick={() => editShipping(shipping)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip
                                  title="Delete shipping"
                                  aria-label="delete"
                                >
                                  <IconButton
                                    aria-label="Delete"
                                    className={classes.deleteicon}
                                    onClick={e =>
                                      props.shippingClassDeleteAction({
                                        _id: shipping._id
                                      })
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
                  count={props.shippingState.shipping.shipping_class.length}
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
              <CardHeader title={`${editMode ? "Edit" : "Add"} Tax`} />
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
                  className={clsx(classes.marginBottom, classes.width100)}
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
                  className={clsx(classes.marginBottom, classes.width100)}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={editMode ? updateCustomShipping : addCustomShipping}
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
  shippingClassDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
