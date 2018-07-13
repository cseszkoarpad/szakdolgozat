import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser} from '../actions/user';
import {fetchAutos} from '../actions/auto';

import NewAutoPage from './NewAutoPage';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import AutoDetailsPage from './AutoDetailsPage';
import AutoEditPage from './AutoEditPage';

import '../styles/index.css';

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
          <main>
            <Route exact path="/" component={Main}/>
            <Route exact path="/upload/new" component={NewAutoPage}/>
            <Route exact path="/autos/:id" component={AutoDetailsPage}/>
            <Route exact path="/autos/:id/edit" component={AutoEditPage}/>
          </main>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, {fetchUser, fetchAutos})(App);
