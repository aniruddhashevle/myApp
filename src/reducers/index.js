/* =============================================================================
   imports
============================================================================= */
/* npm */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

/* reducers */
import ReducerUserInfo from './reducer-user-info';

/* =============================================================================
   Root Reducer Object
============================================================================= */
const rootReducer = combineReducers({
  form: formReducer,
  userData: ReducerUserInfo
});

export default rootReducer;
