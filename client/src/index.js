import React from 'react';
import {render} from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import reduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import {CookiesProvider} from 'react-cookie';

import App from './App';
import reducers from './reducers';

export const history = createHistory();

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(
  reducers,
  {},
  composeSetup(
    applyMiddleware(reduxThunk),
  ),
);

render(
  <CookiesProvider>
    <App store={store} history={history}/>
  </CookiesProvider>,
  document.getElementById('root'),
);