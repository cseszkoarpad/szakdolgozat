import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => (
  <div className="full-page">
    <CircularProgress className="loader" classes={{root: 'loader-circle'}} size={50}/>
  </div>
);

export default Loader;