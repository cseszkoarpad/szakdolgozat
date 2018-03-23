import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchUser, fetchAutos } from '../actions';

import NewAutoPage from './NewAutoPage'
import Main from './Main'
import Header from './Header'
import Footer from './Footer'
import AutoDetailsPage from './AutoDetailsPage'
import AutoEditPage from './AutoEditPage'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
		this.props.fetchAutos()    
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <Header />
          </header>
          <main>
            <Route exact path="/" component={Main} />
            <Route exact path="/upload/new" component={NewAutoPage} />
            <Route exact path="/autos/:id" component={AutoDetailsPage} />
            <Route exact path="/autos/:id/edit" component={AutoEditPage} />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, { fetchUser, fetchAutos })(App);
