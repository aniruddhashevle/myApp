
import {
  USER_INFO_STEP_ONE,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_REQ
} from '../actions/action-types';

const INITIAL_STATE = {
	userInfo: {
		userName: null,
		age: null
	},
	errorMsg: '',
	userAllInfo: null,
	isFetching: false,
}

export default function(state=INITIAL_STATE, action) {
	switch(action.type) {
		case USER_INFO_STEP_ONE: 
			return { ...state,  userInfo: action.payload }

		case SIGN_UP_SUCCESS:
			return { ...state,  userAllInfo: action.payload, isFetching: action.isFetching }		  

		case SIGN_UP_ERROR:
			return { ...state,  errorMsg: action.message, isFetching: action.isFetching }

		case SIGN_UP_REQ:
			return { ...state,  isFetching: action.isFetching }

		default:
	    return state;
	}
}