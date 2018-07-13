import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser} from './actions/user';
import {fetchAutos} from './actions/auto';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import AutoDetailsPage from './components/AutoDetailsPage';
import AutoEditPage from './components/AutoEditPage';

import './styles/index.css';

class Index extends Component {
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
            <Route exact path="/autos/:id" component={AutoDetailsPage}/>
            <Route exact path="/autos/:id/edit" component={AutoEditPage}/>
          </main>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, {fetchUser, fetchAutos})(Index);
