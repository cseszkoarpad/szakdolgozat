import React, {Component} from 'react';
import axios from 'axios';
import {withCookies} from 'react-cookie';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  paper: {
    maxWidth: '350px',
    background: 'white',
    borderRadius: '5px',
    padding: '30px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    outline: 'none',
  },
  desc: {
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '10px',
  },
};

class NewsLetter extends Component {
  state = {
    email: '',
    name: '',
    isModalOpen: null,
  };

  componentWillMount() {
    const {cookies} = this.props;
    if (cookies.get('subscribed')) {
      this.setState({isModalOpen: false});
    } else {
      this.setState({isModalOpen: true});
    }
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubscribe = (event) => {
    event.preventDefault();
    const {cookies} = this.props;
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let newYear = new Date(year + 1, month, day);
    cookies.set('subscribed', true, {path: '/', expires: newYear});
    const data = {
      email: this.state.email,
      name: this.state.name,
    };
    axios.post('/api/subscribe', {data});
    this.setState({isModalOpen: false});
  };

  render() {
    const {email, name, isModalOpen} = this.state;
    const {classes} = this.props;

    return (
      <Modal
        aria-labelledby="newsletter"
        aria-describedby="newsletter-subscribe-form"
        open={isModalOpen}
        //onClose={() => this.setState({isModalOpen: false})}
      >
        <div className={classes.paper}>
          <button onClick={() => this.setState({isModalOpen: false})} className="btn newsletter-close-button">
            X
          </button>
          <form onSubmit={this.handleSubscribe} className="user-profile-edit-form">
            <Typography variant="title">
              Üdvözlünk az oldalon!
            </Typography>
            <Typography className={classes.desc} variant="subheading">
              Mivel most indultunk, sajnos még nem áll rendelkezésre feltöltött jármű.
              Kérjük iratkozz fel, hogy értesíthessünk, mikor kezdhetsz el böngészni.
            </Typography>
            <div className="newsletter-input-wrapper">
              <TextField
                classes={{root: 'margin-medium--important'}}
                style={{width: '300px'}}
                autoFocus
                fullWidth
                required
                type="string"
                name="name"
                label="Keresztnév"
                value={name}
                onChange={this.onChange}
              />
              <TextField
                classes={{root: 'margin-medium--important'}}
                style={{width: '300px'}}
                fullWidth
                required
                type="email"
                name="email"
                label="Email cím"
                value={email}
                onChange={this.onChange}
              />
              <button type="submit" style={{marginTop: '20px'}} className="btn btn--primary">
                Mehet
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

NewsLetter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(withCookies(NewsLetter)));
