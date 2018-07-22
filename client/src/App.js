import React, {Component} from 'react';
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
import './styles/main.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchCars();
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
            <Redirect to="/"/>
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, {fetchUser, fetchCars})(App);
