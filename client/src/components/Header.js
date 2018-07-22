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

class Header extends Component {
  renderMenu = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Button href="/auth/google">Bejelentkezés</Button>;
      default:
        return [
          <Button key="1" href="/upload/new">Feltöltés</Button>,
          <Button key="5" href={`/my-cars/${this.props.auth._id}`}>Autóim</Button>,
          <Payments key="2"/>,
          <Typography key="3" color="inherit">Creditek: {this.props.auth.credits}</Typography>,
          <Button key="4" href="/api/logout">Kijelentkezés</Button>
        ];
    }
  };

  render() {
    return (
      <AppBar className="add-margin-bottom" position="static" color="default">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon/>
          </IconButton>
          <Button className="flex-grow" component={Link} to="/">Premium autó portál</Button>
          {this.renderMenu()}
        </Toolbar>
      </AppBar>
    );
  }
}

function mapStateToProps({auth}) {
  return {
    auth
  };
}

export default connect(mapStateToProps)(Header);
