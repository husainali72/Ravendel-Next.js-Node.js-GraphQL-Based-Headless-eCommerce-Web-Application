import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Drawer } from '@mui/material';
import MenuTheme from './Menubar';
import { createTheme } from "@mui/material/styles"
import {  ThemeProvider, useTheme } from '@mui/styles';
import palette from '../theme/palette';
const useStyles = makeStyles(theme => ({
    drawer: { 
        "&&": {
      width: 200,
     
      [theme.breakpoints.up('lg')]: {
        marginTop: 50,
        height: 'calc(100% - 50px)',
      
      }}
    },
    root: {
        "&&": {
      backgroundColor: theme.palette.white,
    
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: theme.spacing(-2),
      width: '175px',}
      
    }
}));

const SideBarTheme = props => {

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
                <MenuTheme />
            </div>
        </Drawer>
    )
}

// const theme = createTheme();

// export default function SideBarTheme() {
 
//     return (
//       <ThemeProvider theme={theme}>
//         < SideBar />
//       </ThemeProvider>
//     );
//   }

export default SideBarTheme;