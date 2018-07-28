import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/es/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {setAuthToNull} from '../actions/user';
import {history} from '../index';
import {withStyles} from '@material-ui/core';

const styles = {
  header: {
    marginBottom: '10px',
  },
  icon: {
    width: '100px',
  },
  spaceFiller: {
    flexGrow: 1,
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    textDecoration: 'none',
    marginRight: '10px',
  },
  img: {
    marginRight: '15px',
  },
};

class Header extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  handleLogout = () => {
    this.props.setAuthToNull();
    history.push('/');
  };

  renderMenu = (classes) => {
    const {anchorEl} = this.state;

    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Button href="/auth/google">Bejelentkezés</Button>;
      default:
        return [
          <Typography key="1" classes={{subheading: classes.name}} component={Link} to={'/'} variant='subheading'
                      color="inherit">{this.props.auth.name}</Typography>,
          <Avatar key="2" classes={{root: classes.img}} component={Link} to={'/'}
                  alt={`${this.props.auth.name}-profile-picture`}
                  src={this.props.auth.profilePic}/>,
          <IconButton key="3"
                      aria-owns={anchorEl ? 'simple-menu' : null}
                      aria-haspopup="true"
                      onClick={this.handleClick}
                      color="inherit" aria-label="Menu">
            <MenuIcon/>
          </IconButton>,
          <Menu
            key="4"
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            onKeyDown={this.handleClose}
          >
            <MenuItem component={Link} to="/upload/new">
              Feltöltés
            </MenuItem>
            <MenuItem component={Link} to={`/my-cars/${this.props.auth._id}`}>
              Autóim
            </MenuItem>
            <MenuItem>
              <Payments/>
            </MenuItem>
            <MenuItem onClick={this.handleLogout}>
              Kijelentkezés
            </MenuItem>
          </Menu>,
        ];
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <AppBar className={classes.header} position="static" color="default">
        <Toolbar>
          <Link to={'/'}>
            <img
              className={classes.icon}
              src="http://www.pngpix.com/wp-content/uploads/2016/06/PNGPIX-COM-Yellow-Ferrari-F12tdf-Car-Front-PNG-Image.png"
              alt="auto-portal-icon"/>
          </Link>
          <Typography className={classes.spaceFiller}/>
          {this.renderMenu(classes)}
        </Toolbar>
      </AppBar>
    );
  }
}

function mapStateToProps({auth}) {
  return {
    auth,
  };
}

export default connect(mapStateToProps, {setAuthToNull})(withStyles(styles)(Header));
