import React from 'react';
import {render} from 'react-dom';
import './style/app.scss';
import routes from './routes/routes';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { Router, browserHistory } from 'react-router';

// Reducers
import reducers from './reducers/';

// Middleware
import ReduxThunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
