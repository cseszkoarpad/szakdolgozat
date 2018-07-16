import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderMenu = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li key="5"><a href="/auth/google">Bejelentkezés</a></li>;
      default:
        return [
          <li key="4"><Link to="/upload/new">Feltöltés</Link></li>,
          <li key="1"><Payments/></li>,
          <li key="3" style={{margin: '0 10px'}}>
            Creditek: {this.props.auth.credits}
          </li>,
          <li key="2"><a href="/api/logout">Kijelentkezés</a></li>
        ];
    }
  };

  render() {
    return (
      <header>
        <nav>
          <div className="nav-wrapper" style={{background: 'black'}}>
            <Link
              to='/'
              className="left brand-logo"
              style={{marginLeft: '20px'}}
            >
              AutoReact
            </Link>
            <ul className="right">
              {this.renderMenu()}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

function mapStateToProps({auth}) {
  return {
    auth
  };
}

export default connect(mapStateToProps)(Header);
