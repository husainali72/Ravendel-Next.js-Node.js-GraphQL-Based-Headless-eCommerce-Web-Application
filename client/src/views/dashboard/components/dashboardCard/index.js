import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  CircularProgress,
} from"@mui/material";
import DashboardStyles from "../../dashboard-styles";

const DashboardCard = ({ count, title, Icon, loader }) => {
  const classes = DashboardStyles();

  return (
    <Card className={classes.dashboardcardroot}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item style={{width: "150px"}} >
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
          <Grid item style={{marginLeft: "160px"}}>
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
