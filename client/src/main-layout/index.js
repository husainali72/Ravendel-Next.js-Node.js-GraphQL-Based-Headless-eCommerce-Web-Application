import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { Route, Switch, Redirect } from "react-router-dom";
import clsx from 'clsx';
import Routes from '../routes/routes';
import Header from './header';
import SideBar from './sidebar';
import Footer from './footer';

const useStyles = makeStyles(theme => ({
    root: {
      paddingTop: 56,
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        paddingTop: 50
      }
    },
    shiftContent: {
      paddingLeft: 200
    },
    content: {
      height: '100%'
    }
}));

const MainLayout = props => {
    const { children } = props;

    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    }; 

    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return(
        <div
            className={clsx({
                [classes.root]: true,
                [classes.shiftContent]: isDesktop
            })}
        >
            <Header onSidebarOpen={handleSidebarOpen}/>
            <SideBar 
                onClose={handleSidebarClose}
                open={shouldOpenSidebar}
                variant={isDesktop ? 'persistent' : 'temporary'}
            />
            <main className={classes.content}>
                {children}       
                <Switch>
                    {Routes.map((route, index) => (
                        <Route key={index} exact={route.exact} path={route.path} name={route.name} component={route.component} />
                    ))}
                    <Redirect to="/dashboard" />
                </Switch>                
                <Footer />
            </main>
        </div>
    )
}

export default MainLayout;