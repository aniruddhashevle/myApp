/* =============================================================================
   imports
============================================================================= */
/* npm */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {render} from 'react-dom';
import { Router, browserHistory } from 'react-router';

/* middleware */
import ReduxThunk from 'redux-thunk';

/* routes */
import routes from './routes/routes';

/* reducers */
import reducers from './reducers/';

/* styles */
import './style/app.scss';

/* =============================================================================
   render DOM
============================================================================= */
const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
