import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  ListItem,
  List,
  Collapse,
  colors,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import menuItems from "../routes/nav.json";
import StarIcon from "@material-ui/icons/Star";
import DashboardIcon from "@material-ui/icons/Dashboard";

const useStyles = makeStyles(theme => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium
  },
  icons: {
    minWidth: "40px !important"
  },
  itemtext: {
    textAlign: "left !important"
  },
  collapse: {
    backgroundColor: "#fafafa",
    padding: "0px 10px"
  }
}));

const MenuBar = () => {
  const classes = useStyles();

  const [menuName, setMenuName] = useState("");

  const handleClick = name => {
    if (name === menuName) {
      setMenuName("");
    } else {
      setMenuName(name);
    }
  };

  const menuListing = menus => {
    return menus.map(menu => {
      if (!menu.children) {
        return (
          <Link to={menu.url} key={menu.name}>
            <ListItem className={classes.item} disableGutters>
              <Button className={classes.button}>
                <ListItemIcon className={classes.icons}>
                  {menu.icon ? <DashboardIcon /> : <StarIcon />}
                </ListItemIcon>
                <ListItemText
                  className={classes.itemtext}
                  primary={menu.name}
                  
                />
              </Button>
            </ListItem>
          </Link>
        );
      }
      return (
        <div key={menu.name}>
          <ListItem
            onClick={() => handleClick(menu.name)}
            className={classes.item}
            disableGutters
          >
            <Button className={classes.button}>
              <ListItemIcon className={classes.icons}>
                {menu.icon ? <DashboardIcon /> : <StarIcon />}
              </ListItemIcon>
              <ListItemText className={classes.itemtext} primary={menu.name} />
              {menuName === menu.name ? <ExpandLess /> : <ExpandMore />}
            </Button>
          </ListItem>
          <Collapse
            in={menuName === menu.name ? true : false}
            timeout="auto"
            unmountOnExit
            className={classes.collapse}
          >
            {menuListing(menu.children)}
          </Collapse>
        </div>
      );
    });
  };

  return <List component="nav">{menuListing(menuItems.menu)}</List>;
};

export default MenuBar;
