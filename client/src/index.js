import React from 'react';
import {render} from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import reduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import {CookiesProvider} from 'react-cookie';

import App from './App';
import reducers from './reducers';

export const history = createHistory();

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(reduxThunk),
    process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

render(
  <CookiesProvider>
    <App store={store} history={history}/>
  </CookiesProvider>,
  document.getElementById('root'),
);