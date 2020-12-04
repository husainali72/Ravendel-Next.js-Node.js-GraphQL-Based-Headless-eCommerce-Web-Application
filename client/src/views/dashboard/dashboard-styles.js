import { makeStyles } from "@material-ui/styles";

const DashboardStyles = makeStyles((theme) => ({
  dashboardcard: {
    height: "100%",
  },
  dashboardcardtitle: {
    fontWeight: 700,
  },
  dashboardcardavatar: {
    backgroundColor: `${theme.palette.success.main} !important`,
    height: "56px !important",
    width: "56px !important",
  },
  dashboardcardicon: {
    height: 32,
    width: 32,
  },
  noRecordFound: {
    color: "red",
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

export default DashboardStyles;
