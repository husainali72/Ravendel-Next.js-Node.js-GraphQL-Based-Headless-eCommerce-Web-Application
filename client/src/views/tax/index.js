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
  taxAction,
  globalTaxUpdateAction,
  optionTaxUpdateAction,
  taxClassAddAction,
  taxClassUpdateAction,
  taxClassDeleteAction
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
  //const classes = useStyles();
  const classes = viewStyles();
  const [value, setValue] = useState(0);
  const [taxOption, settaxOption] = useState("");
  const [customTaxClass, setcustomTaxClass] = useState(TaxObject);
  const [taxGlobal, settaxGlobal] = useState({
    is_global: false,
    name: "",
    percentage: ""
  });

  const [editMode, setEditMode] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    props.taxAction();
    settaxOption(props.taxState.tax.is_inclusive ? "inclusive" : "exclusive");
    settaxGlobal({ ...props.taxState.tax.global });
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
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Tax Option" {...a11yProps(0)} />
        <Tab label="Global Tax" {...a11yProps(1)} />
        <Tab label="Custom Tax" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        {props.taxState.loading && <Loading />}
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Prices entered with tax</FormLabel>
          <RadioGroup
            aria-label="taxOption"
            value={taxOption}
            onChange={e => settaxOption(e.target.value)}
          >
            <FormControlLabel
              value="inclusive"
              control={<Radio />}
              label="Yes, I will enter prices inclusive of tax"
            />
            <FormControlLabel
              value="exclusive"
              control={<Radio />}
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

      <TabPanel value={value} index={1}>
        {props.taxState.loading && <Loading />}
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={taxGlobal.is_global}
                onChange={e =>
                  settaxGlobal({ ...taxGlobal, is_global: e.target.checked })
                }
              />
            }
            label="Global Tax"
          />

          <TextField
            id="outlined-secondary"
            label="Tax Name"
            variant="outlined"
            color="secondary"
            value={taxGlobal.name}
            onChange={e => settaxGlobal({ ...taxGlobal, name: e.target.value })}
          />

          <TextField
            type="number"
            id="outlined-secondary"
            label="Percentage"
            variant="outlined"
            color="secondary"
            value={taxGlobal.percentage}
            onChange={e =>
              settaxGlobal({ ...taxGlobal, percentage: e.target.value })
            }
          />

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

      <TabPanel value={value} index={2}>
        <Grid container spacing={4} className={classes.mainrow}>
          <Grid item lg={6}>
            <Card>
              {props.taxState.loading && <Loading />}

              <CardHeader title="All Taxs" />
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
                                <Tooltip title="Edit tax" aria-label="edit">
                                  <IconButton
                                    aria-label="Edit"
                                    onClick={() => editTax(tax)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete tax" aria-label="delete">
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
              <CardHeader title={`${editMode ? "Edit" : "Add"} Tax`} />
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
                  className={clsx(classes.marginBottom, classes.width100)}
                />
                <TextField
                  type="number"
                  label="Amount"
                  name="amount"
                  variant="outlined"
                  onChange={e =>
                    setcustomTaxClass({
                      ...customTaxClass,
                      percentage: e.target.value
                    })
                  }
                  value={customTaxClass.percentage}
                  className={clsx(classes.marginBottom, classes.width100)}
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
  taxClassDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Tax);
