import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  Typography,
  Button,
  MenuItem,
  Menu,
  Avatar,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Auth from "../utils/auth";
import palette from "../theme/palette";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { bucketBaseURL, client_app_route_url } from "../utils/helper";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";
import RavendelLogo from "../assets/images/RavendelLogo.png"
import "../App.css"
import { get, isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { getSettings } from "../store/action";
const HeaderComponenet = () => {
  const classes = useStyles();
  const login = useSelector((state) => state.login);
  const logoState = useSelector((state) => state.settings)
  const [logo, setlogo] = useState('')
  const dispatch = useDispatch()
  const { onSidebarOpen } = login;
  const [activeUser, setActiveUser] = useState({
    name: "",
    userId: "",
    image: { thumbnail: "" },
  });
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    if (!isEmpty(get(logoState.settings, 'appearance'))) {
      setlogo(get(logoState.settings.appearance.theme, 'logo'))
    }
  }, [get(logoState, 'settings')])
  useEffect(() => {
    dispatch(getSettings())
  }, [])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    setAnchorEl(null);
    Auth.logout();
  };

  useEffect(() => {
    setActiveUser(login.user_token);
  }, [login.user_token]);
  const imageOnError = (event) => {
    event.target.src = RavendelLogo
  }

  return (
    <AppBar className={classes.header} >
      <Toolbar className={classes.header}>
        <Link to={`${client_app_route_url}dashboard`}>
          <Typography variant="h6" component="h1" className={classes.textWhite}>
            <img src={bucketBaseURL + logo} onError={imageOnError} className="ravendelLogo" alt="Ravendel"></img>
          </Typography>
        </Link>

        <div className={classes.flexGrow} />
        {activeUser && (
          <Hidden mdDown>
            <Button
              aria-controls="logoutButton"
              aria-haspopup="true"
              onClick={handleClick}
              className={classes.signOutButton}
            >
              <Box display="flex" alignItems="center">
                <Avatar
                  alt="user-thumbnail"
                  src={activeUser.image && activeUser.image.thumbnail}
                />
                <span className={classes.userName}>{activeUser.name}</span>
              </Box>
            </Button>
            <Menu
              id="logoutButton"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  to={`${client_app_route_url}edit-user/${activeUser.userId}`}
                >
                  <span className={classes.editProfile}>Edit Profile</span>
                </Link>
              </MenuItem>
              <MenuItem onClick={logoutUser}>Logout</MenuItem>
            </Menu>
          </Hidden>
        )}
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    "&&": {
      boxShadow: "none",
      minHeight: "50px !important",
      maxHeight: "50px !important",
      backgroundColor: palette.primary.dark,
      zIndex: 1100,
    },
  },
  flexGrow: {
    "&&": {
      flexGrow: 1,
    },
  },
  signOutButton: {
    "&&": {
      marginLeft: theme.spacing(1),
    },
  },
  textWhite: {
    "&&": {
      color: "#fff",
    },
  },
  logout: {
    "&&": {
      color: "#fff",
      marginLeft: "10px",
      paddingTop: "7px",
    },
  },
  userName: {
    "&&": {
      marginLeft: 10,
      color: palette.white,
      textTransform: "none",
    },
  },
  editProfile: {
    "&&": {
      color: palette.black,
    },
  },
}));

export default function Header() {
  return (
    <ThemeProvider theme={theme}>
      <HeaderComponenet />
    </ThemeProvider>
  );
}
