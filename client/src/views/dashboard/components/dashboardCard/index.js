import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  CircularProgress,
  Button,
} from "@mui/material";
import DashboardStyles from "../../dashboard-styles";
import theme from "../../../../theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const DashboardCardComponent = ({ count, title, Icon, loader }) => {
  const classes = DashboardStyles();

  return (
    <Card className={classes.dashboardcardroot}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item style={{ width: "150px" }}>
            <Typography
              className={classes.dashboardcardtitle}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              {title}
            </Typography>
            {loader ? (
              <CircularProgress size={20} />
            ) : !count ? (
              <Typography className={classes.noRecordFound} variant="caption">
                No records found
              </Typography>
            ) : (
              <Typography variant="h5">{count}</Typography>
            )}
          </Grid>
          <Grid item style={{ marginLeft: "160px" }}>
            <Avatar className={classes.dashboardcardavatar}>
              <Icon className={classes.dashboardcardicon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default function DashboardCard({ count, title, Icon, loader }) {
  return (
    <ThemeProvider theme={theme}>
      <DashboardCardComponent
        count={count}
        title={title}
        Icon={Icon}
        loader={loader}
      />
    </ThemeProvider>
  );
}
