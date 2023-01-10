import { makeStyles, ThemeProvider } from"@mui/styles";
import { createTheme } from "@mui/material"; 
const DashboardStyles = makeStyles((theme) => ({
  dashboardcard: {
    

    height: "100%",
  },
  dashboardcardtitle: {
    "&&":{
     
    fontWeight: 700,}
  },
  dashboardcardavatar: {
     backgroundColor: `${theme.palette.success.main} !important`,
   marginLeft: "160px",
    height: "50px !important",
    width: "50px !important",
  },
  dashboardcardicon: {
    
    height: 32,
    width: 32,
   
  },
  noRecordFound: {

    "&&":{
    color: "red",}
  },
  content: {
   
  
    padding: 0,
  },
  productImage: {
    
    
    height: 60,
    width: 60,
    borderRadius: '100%',
    marginRight: 10,
  },
}));
const theme = createTheme();

// export default function DashboardStyles() {
   
//     return (
//       <ThemeProvider theme={theme}>
//         < DashboardTheme />
//       </ThemeProvider>
//     );
//   }
 export default DashboardStyles;