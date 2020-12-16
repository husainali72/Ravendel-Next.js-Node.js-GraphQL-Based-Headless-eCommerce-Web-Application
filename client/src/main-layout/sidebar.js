import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Drawer } from '@material-ui/core';
import MenuBar from './menubar';

const useStyles = makeStyles(theme => ({
    drawer: { 
      width: 175,
      [theme.breakpoints.up('lg')]: {
        marginTop: 50,
        height: 'calc(100% - 50px)'
      }
    },
    root: {
      backgroundColor: theme.palette.white,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: theme.spacing(1)
    }
}));

const SideBar = props => {
    const { open, variant, onClose, className, ...rest } = props;
    const classes = useStyles();
    return(
        <Drawer
            anchor="left"
            classes={{ paper: classes.drawer }}
            onClose={onClose}
            open={open}
            variant={variant}
        >
            <div
                {...rest}
                className={clsx(classes.root, className)}
            >
                <MenuBar />
            </div>
        </Drawer>
    )
}

export default SideBar;