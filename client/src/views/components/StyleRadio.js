import React from "react";
import {Radio} from "@material-ui/core";

const StyledRadio = (props) => {
  return (
    <Radio
      className='radioRoot'
      disableRipple
      color='default'
      checkedIcon={<span className='radioIcon radiocheckedIcon' />}
      icon={<span className='radioIcon' />}
      {...props}
    />
  );
};

export default StyledRadio;
