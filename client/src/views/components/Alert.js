import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alerts = () => {
  const [isOpen, setisOpen] = useState(false);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert.success) {
      setisOpen(true);
      window.setTimeout(() => {
        setisOpen(false);
        dispatch({
          type: "ALERT_SUCCESS",
          payload: { boolean: false, message: "", error: false },
        });
      }, 3000);
    }
  }, [alert.success]);

  useEffect(() => {
    if (alert.error) {
      setisOpen(true);
      window.setTimeout(() => {
        setisOpen(false);
        dispatch({
          type: "ALERT_SUCCESS",
          payload: { boolean: false, message: "", error: false },
        });
      }, 3000);
    }
  }, [alert.error]);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{ mt: "100px" }}
    >
      {(alert.error || alert.success) && alert.message ? (
        <Alert
          severity={alert.success ? "success" : "error"}
          sx={{ width: "100%" ,textTransform:"capitalize"}}
        >
          {alert.message}
        </Alert>
      ) : null}
    </Snackbar>
  );
};

export default Alerts;
