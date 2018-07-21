import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser} from './actions/user';
import {fetchAutos} from './actions/auto';
import Main from './containers/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import AutoDetailsPage from './containers/AutoDetailsPage';
import AutoEditPage from './containers/AutoEditPage';

import './styles/main.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchAutos();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/autos/:id" component={AutoDetailsPage}/>
            <Route exact path="/autos/:id/edit" component={AutoEditPage}/>
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, {fetchUser, fetchAutos})(App);
