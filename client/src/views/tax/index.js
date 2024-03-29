import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { isEmpty } from "../../utils/helper";
import { Alert, Loading } from "../components";
import {
  globalTaxUpdateAction,
  optionTaxUpdateAction,
  taxClassAddAction,
  taxClassUpdateAction,
  taxClassDeleteAction,
  productsAction,
} from "../../store/action/";
import { useDispatch, useSelector } from "react-redux";
import TaxOptionsComponent from "./components/tax-options";
import GlobalTaxComponent from "./components/global-tax";
import AllTaxesComponent from "./components/all-taxes";
import TaxFormComponent from "./components/tax-form";
import viewStyles from "../viewStyles.js";
import theme from "../../theme";
import { taxAction } from "../../store/action/";
import { ThemeProvider } from "@mui/material/styles";
import { validate } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
var TaxObject = {
  name: "",
  percentage: "",
};

const TaxComponent = () => {
  const dispatch = useDispatch();
  const taxState = useSelector((state) => state.taxs);
  const classes = viewStyles();
  const [value, setValue] = useState(0);
  const [taxOption, settaxOption] = useState("");
  const [customTaxClass, setcustomTaxClass] = useState(TaxObject);
  const [editMode, setEditMode] = useState(false);
  const [taxGlobal, settaxGlobal] = useState({
    is_global: false,
    taxClass: "",
    overwrite: false,
  });

  useEffect(() => {
    if (isEmpty(taxState.tax.taxClass)) {
      dispatch(taxAction());
    }
  }, []);

  useEffect(() => {
    if (taxGlobal.overwrite) {
      dispatch(productsAction());
    }
    settaxOption(taxState.tax.is_inclusive ? "inclusive" : "exclusive");
    settaxGlobal({ ...taxGlobal, ...taxState.tax.global });
    setEditMode(false);
    setcustomTaxClass(TaxObject);
  }, [taxState.tax]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const saveOption = () => {
    dispatch(
      optionTaxUpdateAction({ is_inclusive: "inclusive" === taxOption })
    );
  };

  const saveGlobal = () => {
    dispatch(globalTaxUpdateAction({ global: taxGlobal }));
  };

  const addCustomTax = () => {
    let errors = validate(["percentage", "name"], customTaxClass);

    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }
    else {
      dispatch(taxClassAddAction({ taxClass: customTaxClass }));
    }

  };

  const editTax = (tax) => {

    let object = {
      _id: tax.id,
      name: tax.name,
      percentage: tax.percentage
    }
    setEditMode(true);
    setcustomTaxClass(object);
  };

  const updateCustomTax = () => {
    let errors = validate(["percentage", "name"], customTaxClass);

    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }
    else {
      dispatch(taxClassUpdateAction({ taxClass: customTaxClass }));
    }

  };

  const cancelTax = () => {
    setEditMode(false);
    setcustomTaxClass(TaxObject);
  };

  return (
    <div className={classes.root}>
      <Alert />
      {taxState.loading && <Loading />}
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item md={12} xs={12}>
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
                  <TaxOptionsComponent
                    saveOption={saveOption}
                    taxOptionState={taxOption}
                    onRadioChange={(val) => settaxOption(val)}
                  />
                </TabPanel>
                {/* ===================================Global Tax Tab=================================== */}
                <TabPanel value={value} index={1}>
                  <GlobalTaxComponent
                    taxGlobalState={taxGlobal}
                    changeGlobalState={(name, value) => {
                      settaxGlobal({
                        ...taxGlobal,
                        [name]: value,
                      });
                    }}
                    taxState={taxState}
                    saveGlobal={saveGlobal}
                  />
                </TabPanel>
                {/* ===================================Custom Tax Tab=================================== */}
                <TabPanel value={value} index={2}>
                  <Grid container spacing={2}>
                    <Grid item lg={6} xs={12}>
                      <AllTaxesComponent
                        taxState={taxState}
                        editTaxChange={(tax) => editTax(tax)}
                        deleteTaxChange={(id) => {

                          dispatch(
                            taxClassDeleteAction({
                              _id: id,
                            })
                          )
                        }
                        }
                      />
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <TaxFormComponent
                        formMode={editMode}
                        onInputChange={(name, value) => {

                          setcustomTaxClass({
                            ...customTaxClass,
                            [name]: value,
                          });
                        }}
                        addCustomTax={addCustomTax}
                        updateCustomTax={updateCustomTax}
                        cancelTaxForm={cancelTax}
                        customTaxClassState={customTaxClass}
                      />
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

const TabPanel = ({ children, value, index, ...other }) => {
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
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Tax = () => {
  return (
    <ThemeProvider theme={theme}>
      <TaxComponent />
    </ThemeProvider>
  );
};
export default Tax;
