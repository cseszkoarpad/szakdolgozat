import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

const styles = {
  paper: {
    background: 'white',
    borderRadius: '5px',
    padding: '50px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
  },
  desc: {
    marginTop: '10px',
  },
  buttonWrapper: {
    display: 'flex',
    marginTop: '15px',
    justifyContent: 'space-around',
  },
};

const WarningModal = ({classes, title, desc, submitButton, cancelButton, isOpen, deleteCar, cancelDelete}) => {
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isOpen}
    >
      <div className={classes.paper}>
        <Typography variant="title">
          {title}
        </Typography>
        <Typography className={classes.desc} variant="subheading">
          {desc}
        </Typography>
        <div className={classes.buttonWrapper}>
          <button onClick={deleteCar} className="btn btn--danger">
            {submitButton}
          </button>
          <button onClick={cancelDelete} className="btn">
            {cancelButton}
          </button>
        </div>
      </div>
    </Modal>
  );
};

WarningModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(WarningModal));