import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
const Loading = () => {
  return (
    <Backdrop className='backdrop' open={true}>
      <div className='backdropInnerWrapper'>
        <CircularProgress color="inherit" />
      </div>
    </Backdrop>
  );
};

export default Loading;
