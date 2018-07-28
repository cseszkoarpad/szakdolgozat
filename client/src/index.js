import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import reduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import App from './App';
import reducers from './reducers';

export const history = createHistory();

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(reduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'),
);