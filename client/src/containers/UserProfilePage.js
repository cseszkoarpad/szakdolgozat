import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import {updateUser} from '../actions/user';

class UserProfilePage extends Component {
  state = {
    name: '',
    profilePic: '',
    location: '',
    phone: '',
  };

  componentWillMount() {
    this.setState({...this.props.auth});
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleGoBack = (e) => {
    e.preventDefault();
    this.props.history.goBack();
  };

  handleSubmitUser = (event) => {
    event.preventDefault();
    const {userId, name, profilePic, location, phone} = this.state;
    const data = {userId, name, profilePic, location, phone};
    this.props.updateUser(data);
    this.props.history.push('/');
  };

  render() {
    const {name, profilePic, location, phone} = this.state;

    return (
      <Paper>
        <form onSubmit={this.handleSubmitUser} className="user-profile-edit-form">
          <TextField
            classes={{root: 'margin-medium--important'}}
            style={{width: '400px'}}
            autoFocus
            fullWidth
            required
            type="string"
            name="name"
            label="Név"
            value={name}
            onChange={this.onChange}
          />
          <div className="user-profile-avatar-wrapper">
            <TextField
              classes={{root: 'margin-medium--important'}}
              style={{width: '330px', marginRight: '20px'}}
              fullWidth
              type="string"
              name="profilePic"
              label="Profilkép"
              value={profilePic}
              onChange={this.onChange}
            />
            <img className="user-profile-avatar" src={`${profilePic}`} alt="user-profile-avatar"/>
          </div>
          <TextField
            classes={{root: 'margin-medium--important'}}
            style={{width: '400px'}}
            fullWidth
            type="string"
            name="location"
            label="Város"
            value={location}
            onChange={this.onChange}
          />
          <TextField
            classes={{root: 'margin-medium--important'}}
            style={{width: '400px'}}
            fullWidth
            type="phone"
            name="phone"
            label="Telefonszám"
            value={phone}
            onChange={this.onChange}
          />
          <div className="user-profile-buttons-wrapper">
            <button type="submit" className="btn btn--primary">Mentés</button>
            <button onClick={this.handleGoBack} style={{marginRight: '20px'}} className="btn btn--secondary">Mégse
            </button>
          </div>
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

export default connect(mapStateToProps, {updateUser})(UserProfilePage);