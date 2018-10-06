import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Router, Redirect, Route, Switch} from 'react-router-dom';
import {connect, Provider} from 'react-redux';
import {fetchUser} from './actions/user';
import {fetchCars} from './actions/car';
import Main from './containers/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import CarDetailsPage from './containers/CarDetailsPage';
import CarEditPage from './containers/CarEditPage';
import CarListPage from './containers/CarListPage';
import CarUploadPage from './containers/CarUploadPage';
import ContactPage from './containers/ContactPage';
import PrivacyPage from './containers/PrivacyPage';
import AszfPage from './containers/AszfPage';
import './styles/main.css';
import UserProfilePage from './containers/UserProfilePage';
import * as ReactGA from 'react-ga';
import {Cookies, withCookies} from 'react-cookie';
import CookieWarning from './components/CookieWarning';
import PropTypes, {instanceOf} from 'prop-types';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {cookies, history} = this.props;

    this.props.fetchUser();

    if ((process.env.NODE_ENV === 'production') && (cookies.get('use-statistics') === 'true')) {
      ReactGA.initialize('UA-115438886-2', {
        debug: process.env.NODE_ENV !== 'production',
      });
      history.listen((location, action) => {
        ReactGA.set({page: location.pathname});
        ReactGA.pageview(location.pathname);
      });
    }
  }

  renderPublicRoutes() {
    return (
      <Switch>
        <Route exact path="/cars/:id/edit" component={CarEditPage}/>
        <Route exact path="/" component={Main}/>
        <Route exact path="/cars/:id" component={CarDetailsPage}/>
        <Route exact path="/kapcsolat" component={ContactPage}/>
        <Route exact path="/adatvedelmi-tajekoztato" component={PrivacyPage}/>
        <Route exact path="/aszf-jogi-nyilatkozat" component={AszfPage}/>
        <Redirect to="/"/>
      </Switch>
    );
  };

  renderPrivateRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/my-cars/:id" component={CarListPage}/>
        <Route exact path="/cars/suggested" component={Main}/>
        <Route exact path="/cars/:id" component={CarDetailsPage}/>
        <Route exact path="/cars/:id/edit" component={CarEditPage}/>
        <Route exact path="/upload/new" component={CarUploadPage}/>
        <Route exact path="/users/:id" component={UserProfilePage}/>
        <Route exact path="/kapcsolat" component={ContactPage}/>
        <Route exact path="/adatvedelmi-tajekoztato" component={PrivacyPage}/>
        <Route exact path="/aszf-jogi-nyilatkozat" component={AszfPage}/>
        <Redirect to="/"/>
      </Switch>
    );
  };

  render() {
    const {store, history} = this.props;

    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Header/>
            {this.props.auth ? this.renderPrivateRoutes() : this.renderPublicRoutes()}
            <Footer/>
            <CookieWarning/>
          </div>
        </Router>
      </Provider>
    );
  }
}

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps, {fetchUser, fetchCars})(hot(module)(withCookies(App)));