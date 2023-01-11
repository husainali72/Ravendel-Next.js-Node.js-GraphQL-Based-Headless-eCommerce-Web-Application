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
  Box
} from "@mui/material"; 
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Auth from "../utils/auth";
import palette from "../theme/palette";
import { Link, Route,Routes} from "react-router-dom";
import { insertToken } from "../store/action/loginAction";
import { connect } from "react-redux";
import {client_app_route_url} from '../utils/helper';
import { ThemeProvider,createTheme } from "@mui/material";

const Header = props => {
  const { onSidebarOpen } = props;
  const classes = useStyles();
  const [activeUser, setActiveUser] = useState({
    name: "",
    user_id: "",
    image: { thumbnail: "" }
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
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
    setActiveUser(props.login.user_token);
  }, [props.login.user_token]);

  return (
    <AppBar className={classes.header} >
      <Toolbar className={classes.header}>
        
        <Link to={`${client_app_route_url}dashboard`}>
          <Typography variant="h4" component="h4" className={classes.textWhite}>
            Ravendel
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
                <Link to={`${client_app_route_url}edit-user/${activeUser.user_id}`}>
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

const useStyles = makeStyles(theme => ({
  header: {
    "&&": {
    boxShadow: "none",
    minHeight: "50px !important",
    maxHeight: "50px !important",
  backgroundColor:palette.text.secondary,
    zIndex: 1100}
  },
  flexGrow: {
    "&&": {
    flexGrow: 1}
  },
  signOutButton: {
    "&&": {
    marginLeft: theme.spacing(1)}
  },
  textWhite: { "&&": {
    color: "#fff"}
  },
  logout: { "&&": {
    color: "#fff",
    marginLeft: "10px",
    paddingTop: "7px"}
  },
  userName: { "&&": {
    marginLeft: 10,
    color: palette.white,
    textTransform: "none"}
  },
  editProfile: { "&&": {
    color: palette.black}
  }
}));

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = {
  insertToken
};

  export default connect(mapStateToProps, mapDispatchToProps)(Header);

// const theme = createTheme(palette);
// export default function Header() {
//   return (
    
//     <ThemeProvider theme={theme}>
//       {connect(mapStateToProps, mapDispatchToProps)(Header);}
//       {/* < HeaderTheme /> */}
//     </ThemeProvider>
//   );
// }

