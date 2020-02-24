import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(4)
    }
}));
  

const Footer = () => {
    const classes = useStyles();
    
    return(
        <div className={classes.root}>
            <Typography variant="body1">
            &copy;{' '}
                Ravendal
            . 2019
            </Typography>
            <Typography variant="caption">
            Lorem Ipsum
            </Typography>
        </div>
    )
}

export default Footer;