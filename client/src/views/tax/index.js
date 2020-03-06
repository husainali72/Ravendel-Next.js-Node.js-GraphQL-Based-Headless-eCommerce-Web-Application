import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [taxOption, settaxOption] = React.useState("inclusive");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const saveOption = () => {
    console.log({ is_inclusive: "inclusive" === taxOption });
  };

  /* const getOption = (obj, e) => {
    settaxOption(e.target.value);
    console.log(obj);
  }; */

  return (
    <div className={classes.root}>
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
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Prices entered with tax</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
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
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
