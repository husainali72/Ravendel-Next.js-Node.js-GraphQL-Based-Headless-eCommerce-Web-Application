import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import DashboardStyles from "../../dashboard-styles";

const DashboardCard = ({ count, title, Icon, loader }) => {
  const classes = DashboardStyles();

  return (
    <Card className={classes.dashboardcardroot}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
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
              <Typography variant="h3">{count}</Typography>
            )}
          </Grid>
          <Grid item>
            <Avatar className={classes.dashboardcardavatar}>
              <Icon className={classes.dashboardcardicon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
