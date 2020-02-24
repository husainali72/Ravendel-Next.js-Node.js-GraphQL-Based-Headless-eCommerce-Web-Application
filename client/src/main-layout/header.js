import React from 'react';
import { AppBar, Toolbar, Hidden, IconButton, Typography  } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(theme => ({
    header: {
      boxShadow: 'none',
      minHeight: '50px !important',
      maxHeight: '50px !important',
    },
    flexGrow: {
      flexGrow: 1
    },
    signOutButton: {
      marginLeft: theme.spacing(1)
    },
    textWhite:{
      color: '#fff'
    },
    logout:{
        color: '#fff',
        marginLeft: '10px',
        paddingTop: '7px'
    }
}));

  
const Header = props => {
    const { onSidebarOpen } = props;
    const classes = useStyles();
    return(
        <AppBar className={classes.header} >
        <Toolbar className={classes.header}>
          <RouterLink to="/dashboard">
            <Typography variant="h4" component="h4" className={classes.textWhite}>
                Ravendal
            </Typography>
          </RouterLink>
          <div className={classes.flexGrow} />
          <Hidden mdDown>
            <IconButton
              className={classes.signOutButton}
              color="inherit"
            >
            <InputIcon />  
            <Typography variant="subtitle2" display="block" gutterBottom className={classes.logout}>
              Log Out
            </Typography>
            </IconButton>
          </Hidden>
          <Hidden lgUp>
            <IconButton
              color="inherit"
              onClick={onSidebarOpen}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    )
}

export default Header;