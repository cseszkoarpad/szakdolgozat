import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser} from './actions/user';
import {fetchCars} from './actions/car';
import Main from './containers/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import CarDetailsPage from './containers/CarDetailsPage';
import CarEditPage from './containers/CarEditPage';
import CarListPage from './containers/CarListPage';
import CarUploadPage from './containers/CarUploadPage';
import './styles/main.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/my-cars/:id" component={CarListPage}/>
            <Route exact path="/cars/:id" component={CarDetailsPage}/>
            <Route exact path="/cars/:id/edit" component={CarEditPage}/>
            <Route exact path="/upload/new" component={CarUploadPage}/>
            <Redirect to="/"/>
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, {fetchUser, fetchCars})(hot(module)(App));