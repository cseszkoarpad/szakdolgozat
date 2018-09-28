import React, {Component} from 'react';
import {styles} from '../components/Search';
import {withStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import axios from 'axios';
import Loader from '../components/Loader';

class ContactPage extends Component {
  state = {
    email: '',
    name: '',
    message: '',
    loading: false,
  };

  componentWillMount() {
    if (this.props.auth) {
      this.setState({email: this.props.auth.email, name: this.props.auth.name});
    }
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  //TODO MODAL HA SIKERES ÉS LEOKÉZÁS UTÁN TESZ A FŐOLDALRA VISSZA
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    const data = {
      email: this.state.email,
      name: this.state.name,
      message: this.state.message,
    };
    axios.post(`/api/messages`, {data})
    .then(response => {
      this.setState({loading: false}, () => {
        this.props.history.push('/');
      });
    });
  };

  render() {
    const {email, name, message, loading} = this.state;
    const {auth} = this.props;

    if (!loading) {
      return (
        <Paper>
          <form className="contact-page-wrapper" onSubmit={this.onSubmit}>
            <h1 className="contact-page-title">Vegye fel velünk a kapcsolatot</h1>
            <TextField
              style={{width: '600px', marginTop: '20px'}}
              autoFocus={!auth && true}
              required
              fullWidth
              name="email"
              label="Email cím"
              value={email}
              onChange={this.onChange}
            />

            <TextField
              style={{width: '600px', marginTop: '30px'}}
              fullWidth
              required
              name="name"
              label="Név"
              value={name}
              onChange={this.onChange}
            />

            <TextField
              style={{width: '600px', marginTop: '40px', marginBottom: '40px'}}
              fullWidth
              autoFocus={auth && true}
              required
              name="message"
              label="Üzenet"
              value={message}
              multiline
              onChange={this.onChange}
            />
            <button className="btn btn--primary" style={{marginBottom: '40px'}} type="submit">Küldés</button>
          </form>
        </Paper>
      );
    } else {
      return <Loader/>;
    }
  }
}

function mapStateToProps({auth}) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(ContactPage));