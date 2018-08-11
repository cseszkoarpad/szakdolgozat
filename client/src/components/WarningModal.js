import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

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
          <Button onClick={deleteCar} variant="contained" color="secondary">
            {submitButton}
          </Button>
          <Button onClick={cancelDelete} variant="contained">
            {cancelButton}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

WarningModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(WarningModal));