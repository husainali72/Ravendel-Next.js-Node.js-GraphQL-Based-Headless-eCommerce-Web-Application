import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const DashboardStyles = makeStyles((theme) => ({
  dashboardcard: {
    height: "100%",
  },
  dashboardcardtitle: {
    "&&": {
      fontWeight: 700,
    },
  },
  dashboardcardavatar: {
    backgroundColor: `${theme.palette.success.main} !important`,
    height: "50px !important",
    width: "50px !important",
  },
  dashboardcardicon: {
    height: 30,
    width: 30,
  },
  noRecordFound: {
    "&&": {
      color: "red",
    },
  },
  content: {
    padding: 0,
  },
  productImage: {
    height: 60,
    width: 60,
    borderRadius: "100%",
    marginRight: 10,
  },
}));

// export default function DashboardStyles() {

//     return (
//       <ThemeProvider theme={theme}>
//         < DashboardTheme />
//       </ThemeProvider>
//     );
//   }
export default DashboardStyles;
