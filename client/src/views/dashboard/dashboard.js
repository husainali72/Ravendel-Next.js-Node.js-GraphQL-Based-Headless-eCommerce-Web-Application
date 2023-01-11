import React, { useEffect, useState } from "react";
import { Grid, Box, useMediaQuery } from"@mui/material";
import {  useTheme } from '@mui/styles';
import LatestOrder from "./components/latestOrder";
import LatestProducts from "./components/latestProduct";
import DashboardCard from './components/dashboardCard';
import { getDashboardData } from "../../utils/service";
import { useSelector, useDispatch } from 'react-redux';
import { ordersAction } from "../../store/action";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

const Dashboard = () => {
  
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const Orders = useSelector((state) => state.orders)
  const [dashBoardCount,setdashBoardCount] = useState({}); 
  const [loader,setLoader] = useState(true);  

  useEffect(()=>{
    async function fetchData() {
      setLoader(true);
      var data = {}
      try{
        data = await getDashboardData();
        setLoader(false);
        setdashBoardCount(data);
      }catch(error){
        setLoader(false);
        setdashBoardCount({});
      }
    }
    fetchData();    
    // dispatch(ordersAction())  
  }, []);

  return (
   
    <Box component="div" p={isSmall ? 1 : 4}>
      <Grid container spacing={isSmall ? 1 : 4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <DashboardCard 
            count={dashBoardCount.user_count}
            title={"TOTAL USERS"}
            Icon={({className}) => <PeopleAltOutlinedIcon className={className} />}
            loader={loader}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <DashboardCard 
            count={dashBoardCount.product_count}
            title={"TOTAL PRODUCTS"}
            Icon={({className}) => <StorefrontOutlinedIcon className={className} />}
            loader={loader}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <DashboardCard 
            count={dashBoardCount.customer_count}
            title={"TOTAL CUSTOMERS"}
            Icon={({className}) => <PeopleAltOutlinedIcon className={className} />}
            loader={loader}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <DashboardCard 
            count={"$23,000"}
            title={"TOTAL SALES"}
            Icon={({className}) => <AttachMoneyOutlinedIcon className={className} />}
            loader={loader}
          />
        </Grid>
        <Grid item lg={4} xl={3} md={12} xs={12}>
          <LatestProducts 
            products={dashBoardCount.latest_products} 
            loader={loader}
          />
        </Grid>
        <Grid item lg={8} xl={9} md={12} xs={12}>

          <LatestOrder ordersState={Orders} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
