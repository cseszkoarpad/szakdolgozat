import React, {Component} from 'react';
import {styles} from '../components/Search';
import {withStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';

class ContactPage extends Component {
  state = {
    email: '',
    name: '',
    message: '',
  };

  componentWillMount() {
    if (this.props.auth) {
      this.setState({email: this.props.auth.email, name: this.props.auth.name});
    }
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = (e) => {
    e.preventDefault();

  };

  render() {
    const {email, name, message} = this.state;

    return (
      <Paper>
        <form className="contact-page-wrapper" onSubmit={this.onSubmit}>
          <h1 className="contact-page-title">Vegye fel velünk a kapcsolatot</h1>
          <TextField
            style={{width: '600px', marginTop: '50px'}}
            autoFocus
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
  }
}

function mapStateToProps({auth}) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(ContactPage));