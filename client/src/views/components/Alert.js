import React, { Fragment, useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";

function CustomAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alert);
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    if (alert.success) {
      setisOpen(true);
      window.setTimeout(() => {
        setisOpen(false);
        dispatch({
          type: "ALERT_SUCCESS",
          payload: { boolean: false, message: "", error: false }
        });
      }, 3000);
    }
  }, [alert.success]);

  return (
    <Fragment>
      
        <Snackbar
        autoHideDuration={3000}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        {
        isOpen ?
        <CustomAlert severity={alert.error ? "error" : "success"}>
          {alert.message}
        </CustomAlert>
         :null
        }
      </Snackbar>
       
    </Fragment>
  );
};

export default Alert;
