import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => (
  <div className="full-page">
    <CircularProgress className="loader" size={50}/>
  </div>
);

export default Loader;