import React from 'react';
import {withCookies} from 'react-cookie';
import {Checkbox, FormControlLabel} from '@material-ui/core';

class CookieWarning extends React.Component {
  constructor() {
    super();
    this.state = {
      isAccepted: false,
      useStatistics: true,
    };
  }

  componentWillMount() {
    const {cookies} = this.props;
    if (cookies.get('accepted-cookies') && !cookies.get('use-statistics')) {
      this.setState({isAccepted: false});
    } else {
      this.setState({isAccepted: cookies.get('accepted-cookies') || false});
    }
  }

  acceptCookies = () => {
    const {cookies} = this.props;
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let newYear = new Date(year + 1, month, day);
    cookies.set('accepted-cookies', true, {path: '/', expires: newYear});
    cookies.set('use-statistics', this.state.useStatistics, {path: '/', expires: newYear});
    this.setState({isAccepted: true});
  };

  render() {
    if (!this.state.isAccepted) {
      return (
        <div className="cookie-wrapper">
          <p>
            Oldalunk cookie-kat használ a felhasználói élmény növelése érdekében. A “Rendben” gomb megnyomásával
            elfogadod.{' '}
            <a className="cookie-more-info" rel="noopener noreferrer" target="_blank" href="./adatvedelmi-tajekoztato">
              További információk
            </a>
          </p>
          <div className="cookie-body-wrapper">
            <FormControlLabel control={
              <Checkbox checked={this.state.useStatistics} onChange={(e) => {
                this.setState({useStatistics: e.target.checked});
              }} classes={{root: 'cookie-checkbox'}}
              />
            }
                              classes={{label: 'cookie-checkbox-label'}}
                              label={'Engedélyezem, hogy az oldal anonim módon statisztikai adatokat gyűjtsön tevékenységemről.'}
            />
            <button className="btn btn--primary" onClick={this.acceptCookies}>Rendben</button>
          </div>
        </div>
      );
    } else {
      return null
    }
  }
}

export default withCookies(CookieWarning);