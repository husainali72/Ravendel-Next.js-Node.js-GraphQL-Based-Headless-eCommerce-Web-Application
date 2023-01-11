import React, { Fragment, useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import { connect } from "react-redux";

function CustomAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

const Alerts = props => {
  const [isOpen, setisOpen] = useState(false);
  useEffect(() => {
    if (props.alert.success) {
      setisOpen(true);
      window.setTimeout(() => {
        setisOpen(false);
        props.dispatch({
          type: "ALERT_SUCCESS",
          payload: { boolean: false, message: "", error: false }
        });
      }, 3000);
    }
  }, [props.alert.success]);

  return (
    <>
      <Snackbar
        autoHideDuration={3000}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <CustomAlert severity={props.alert.error ? "error" : "success"}>
          {props.alert.message}
        </CustomAlert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = state => {
  return { alert: state.alert };
};

//const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps)(Alerts);
