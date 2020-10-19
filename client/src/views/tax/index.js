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
  Checkbox,
  Select,
  MenuItem,
  Paper
} from "@material-ui/core";

import Alert from "../utils/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../viewStyles.js";
import Loading from "../utils/loading";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { isEmpty } from "../../utils/helper";
import {
  taxAction,
  globalTaxUpdateAction,
  optionTaxUpdateAction,
  taxClassAddAction,
  taxClassUpdateAction,
  taxClassDeleteAction,
  productsAction
} from "../../store/action/";
import { connect } from "react-redux";

var TaxObject = {
  name: "",
  percentage: ""
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
      {value === index && <Box p={3}>{children}</Box>}
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

const Tax = props => {
  const classes = viewStyles();
  const [value, setValue] = useState(0);
  const [taxOption, settaxOption] = useState("");
  const [customTaxClass, setcustomTaxClass] = useState(TaxObject);
  const [taxGlobal, settaxGlobal] = useState({
    is_global: false,
    tax_class: "",
    overwrite: false
  });

  const [editMode, setEditMode] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (isEmpty(props.taxState.tax.tax_class)) {
      props.taxAction();
    }
  }, []);

  useEffect(() => {
    if (taxGlobal.overwrite) {
      props.productsAction();
    }
    settaxOption(props.taxState.tax.is_inclusive ? "inclusive" : "exclusive");
    settaxGlobal({ ...taxGlobal, ...props.taxState.tax.global });
    setEditMode(false);
    setcustomTaxClass(TaxObject);
  }, [props.taxState.tax]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const saveOption = () => {
    props.optionTaxUpdateAction({ is_inclusive: "inclusive" === taxOption });
  };

  const saveGlobal = () => {
    props.globalTaxUpdateAction({ global: taxGlobal });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const addCustomTax = () => {
    props.taxClassAddAction({ tax_class: customTaxClass });
  };

  const editTax = tax => {
    setEditMode(true);
    setcustomTaxClass(tax);
  };

  const updateCustomTax = () => {
    //setEditMode(false);
    props.taxClassUpdateAction({ tax_class: customTaxClass });
  };

  const cancelTax = () => {
    setEditMode(false);
    setcustomTaxClass(TaxObject);
  };

  return (
    <div className={classes.root}>
      <Alert />

      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item md={12}>
          <Card>
            <CardHeader title="Tax" />
            <Divider />
            <CardContent>
              {/* ===================================Tab Navigation=================================== */}
              <Paper square>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Tax tab"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Tax Option" {...a11yProps(0)} />
                  <Tab label="Global Tax" {...a11yProps(1)} />
                  <Tab label="Custom Tax" {...a11yProps(2)} />
                </Tabs>
              </Paper>
              <Box className={classes.taxTabsWrapper}>
                {/* ===================================Tax Option Tab=================================== */}
                <TabPanel value={value} index={0}>
                  {props.taxState.loading && <Loading />}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    {/* <FormLabel component="legend">
                      Prices entered with tax
                    </FormLabel> */}
                    <Typography variant="h5" style={{ marginBottom: 10 }}>
                      Prices entered with tax
                    </Typography>
                    <RadioGroup
                      aria-label="taxOption"
                      value={taxOption}
                      onChange={e => settaxOption(e.target.value)}
                    >
                      <FormControlLabel
                        value="inclusive"
                        control={<Radio color="primary" />}
                        label="Yes, I will enter prices inclusive of tax"
                      />
                      <FormControlLabel
                        value="exclusive"
                        control={<Radio color="primary" />}
                        label="No, I will enter prices exclusive of tax"
                      />
                    </RadioGroup>
                  </FormControl>

                  <Button
                    size="small"
                    color="primary"
                    onClick={saveOption}
                    variant="contained"
                  >
                    Save Changes
                  </Button>
                </TabPanel>
                {/* ===================================Global Tax Tab=================================== */}
                <TabPanel value={value} index={1}>
                  {props.taxState.loading && <Loading />}

                  <Grid container spacing={2} className={classes.marginBottom}>
                    <Grid item md={6} sm={12} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={taxGlobal.is_global}
                                onChange={e =>
                                  settaxGlobal({
                                    ...taxGlobal,
                                    is_global: e.target.checked
                                  })
                                }
                              />
                            }
                            label="Global Tax"
                          />
                        </Grid>

                        <Grid item>
                          <FormControl
                            variant="outlined"
                            size="small"
                            style={{ minWidth: 300 }}
                          >
                            <Select
                              name="Tax-name"
                              value={taxGlobal.tax_class}
                              onChange={e =>
                                settaxGlobal({
                                  ...taxGlobal,
                                  tax_class: e.target.value
                                })
                              }
                            >
                              {props.taxState.tax.tax_class.map(
                                (tax, index) => {
                                  return (
                                    <MenuItem value={tax._id} key={index}>
                                      {tax.name}
                                    </MenuItem>
                                  );
                                }
                              )}
                            </Select>
                          </FormControl>
                        </Grid>

                        {taxGlobal.is_global && (
                          <Grid item md={12} sm={12} xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  color="primary"
                                  checked={taxGlobal.overwrite}
                                  onChange={e =>
                                    settaxGlobal({
                                      ...taxGlobal,
                                      overwrite: e.target.checked
                                    })
                                  }
                                />
                              }
                              label="Do you want to override the current tax class selection in the existing products?"
                            />
                          </Grid>
                        )}
                      </Grid>
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
                {/* ===================================Custom Tax Tab=================================== */}
                <TabPanel value={value} index={2}>
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <Card>
                        {props.taxState.loading && <Loading />}

                        <CardHeader title="All Taxes" />
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
                                  <TableCell>Percentage</TableCell>
                                  <TableCell>Actions</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {props.taxState.tax.tax_class &&
                                  props.taxState.tax.tax_class
                                    .slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage
                                    )
                                    .map(tax => (
                                      <TableRow key={tax._id} hover>
                                        <TableCell>{tax.name}</TableCell>
                                        <TableCell>{tax.percentage}</TableCell>
                                        <TableCell>
                                          <Tooltip
                                            title="Edit tax"
                                            aria-label="edit"
                                          >
                                            <IconButton
                                              aria-label="Edit"
                                              onClick={() => editTax(tax)}
                                            >
                                              <EditIcon />
                                            </IconButton>
                                          </Tooltip>

                                          {!tax.system && (
                                            <Tooltip
                                              title="Delete tax"
                                              aria-label="delete"
                                            >
                                              <IconButton
                                                aria-label="Delete"
                                                className={classes.deleteicon}
                                                onClick={e =>
                                                  props.taxClassDeleteAction({
                                                    _id: tax._id
                                                  })
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
                            count={props.taxState.tax.tax_class.length}
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
                              setcustomTaxClass({
                                ...customTaxClass,
                                name: e.target.value
                              })
                            }
                            value={customTaxClass.name}
                            className={clsx(
                              classes.marginBottom,
                              classes.width100
                            )}
                          />
                          <TextField
                            type="number"
                            label="Percentage"
                            name="percentage"
                            variant="outlined"
                            onChange={e =>
                              setcustomTaxClass({
                                ...customTaxClass,
                                percentage: e.target.value
                              })
                            }
                            value={customTaxClass.percentage}
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
                            onClick={editMode ? updateCustomTax : addCustomTax}
                            variant="contained"
                          >
                            {editMode ? "Update" : "Add"}
                          </Button>
                          <Button
                            size="small"
                            onClick={cancelTax}
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
  return { taxState: state.taxs };
};

const mapDispatchToProps = {
  taxAction,
  globalTaxUpdateAction,
  optionTaxUpdateAction,
  taxClassAddAction,
  taxClassUpdateAction,
  taxClassDeleteAction,
  productsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Tax);
