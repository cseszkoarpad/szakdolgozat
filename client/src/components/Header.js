import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {setAuthToNull} from '../actions/user';
import {withStyles} from '@material-ui/core';
import {history} from '../index';
import userAvatar from '../resources/default_user_avatar.png';

const styles = {
  header: {
    marginBottom: '10px',
  },
  spaceFiller: {
    flexGrow: 1,
  },
  profile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    textDecoration: 'none',
    marginRight: '10px',
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
    const {auth} = this.props;

    if (!auth) {
      return <Button href="/auth/google">Bejelentkezés</Button>;
    }
    else {
      return [
        <Typography className="no-mobile" key="1" classes={{subheading: classes.name}} component={Link}
                    to={`/users/${auth.userId}`}
                    variant='subheading' color="inherit">{auth.name}</Typography>,
        <Avatar key="2" classes={{root: 'header-user-logo'}} component={Link} to={`/users/${auth.userId}`}
                alt={'user-avatar'}
                src={auth.profilePic ? auth.profilePic : userAvatar}/>,
        <IconButton key="3"
                    aria-owns={anchorEl ? 'menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    color="inherit" aria-label="Menu">
          <MenuIcon/>
        </IconButton>,
        <Menu
          key="4"
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onKeyDown={this.handleClose}
        >
          <MenuItem component={Link} to="/upload/new">
            Feltöltés
          </MenuItem>
          <MenuItem component={Link} to={`/my-cars/${auth.userId}`}>
            Autóim
          </MenuItem>
          {/*<MenuItem component={Link} to={`/cars/suggested`}>
            Nekem ajánlott
          </MenuItem>*/}
          <MenuItem component={Link} to={`/users/${auth.userId}`}>
            Profilom
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
          <Link className="flex vertical--center text-decoration--none" to={'/'}>
            <img
              className="header-logo"
              src="http://www.pngpix.com/wp-content/uploads/2016/06/PNGPIX-COM-Yellow-Ferrari-F12tdf-Car-Front-PNG-Image.png"
              alt="auto-portal-logo"/>
            <h1 className="header-title">Személygépjármű Portál</h1>
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
