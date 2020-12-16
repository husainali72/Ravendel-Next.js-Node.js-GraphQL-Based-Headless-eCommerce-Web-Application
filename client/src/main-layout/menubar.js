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
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";

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
                  {menu.icon && <Icon fontSize="small">{menu.icon}</Icon>}
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
                {menu.icon && <Icon fontSize="small">{menu.icon}</Icon>}
              </ListItemIcon>
              <ListItemText className={classes.itemtext} primary={menu.name} />
              {menuName === menu.name ? <ExpandLess  fontSize="small"/> : <ExpandMore  fontSize="small"/>}
            </Button>
          </ListItem>
          <Collapse
            in={menuName === menu.name ? true : false}
            timeout="auto"
            unmountOnExit
            className={clsx(classes.collapse, "menu-collapse")}
          >
            {menuListing(menu.children)}
          </Collapse>
        </div>
      );
    });
  };

  return <List component="nav">{menuListing(menuItems.menu)}</List>;
};

const useStyles = makeStyles(theme => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: "4px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  icons: {
    minWidth: "30px !important"
  },
  itemtext: {
    textAlign: "left !important",
    fontSize: 10
  },
  collapse: {
    backgroundColor: "#f5f5f5",
    padding: "0px 10px",
    paddingLeft: 25
  }
}));

export default MenuBar;
