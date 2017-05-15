import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ReducerUserInfo from './reducer-user-info';


const rootReducer = combineReducers({
  form: formReducer,
  userData: ReducerUserInfo
});

export default rootReducer;
