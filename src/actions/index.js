import axios from 'axios';

import { timeout } from '../utils/common';

import {
	ROOT_URL,
  REQ_TIMEOUT,
  USER_INFO_STEP_ONE,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_REQ
} from './action-types';

export function userStepOneSubmit(data) {
	return {
	  type: USER_INFO_STEP_ONE,
	  payload: data
	}
}

export function reqSignUp() {
	return {
		type: SIGN_UP_REQ,
		isFetching: true		
	}
}

export function successSignUp(responseData) {
	return {
		type: SIGN_UP_SUCCESS,
		payload: responseData,
		isFetching: false
	}
}

export function errorSignUp(message) {
	return {
		type: SIGN_UP_ERROR,
		isFetching: false,
		message
	}
}

export function submitUserData(userInfo) {
	return dispatch => {
		dispatch(reqSignUp());
		return timeout(REQ_TIMEOUT, axios.post(`${ROOT_URL}/sign-up`, userInfo)).then((response) => {
		    if(response.status === 200) {
		      // Dispatch the success action
		      dispatch(successSignUp(response.data));

		      return response;
		    }
		  }).catch(err => {
		    // If there was a problem, we want to
		    // dispatch the error condition
		    if(err.data && (err.status >= 400 && err.status <= 600)) {
		      dispatch(errorSignUp(err.data));
		    }

		    return err;
		 });
	};
}