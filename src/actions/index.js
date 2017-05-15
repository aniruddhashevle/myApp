/* =============================================================================
   imports
============================================================================= */
/* npm */
import axios from 'axios';

/* common functions */
import { timeout } from '../utils/common';

/* Common action and reducer variables */
import {
	ROOT_URL,
  REQ_TIMEOUT,
  USER_INFO_STEP_ONE,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_REQ
} from './action-types';

/**
 * user step 1 form submit
 *
 * @return Object
 */
export function userStepOneSubmit(data) {
	return {
	  type: USER_INFO_STEP_ONE,
	  payload: data
	}
}

/**
 * user request when user step 2 form submit
 *
 * @return Object
 */
export function reqSignUp() {
	return {
		type: SIGN_UP_REQ,
		isFetching: true		
	}
}

/**
 * successful response after user step 2 form submit
 *
 * @return Object
 */
export function successSignUp(responseData) {
	return {
		type: SIGN_UP_SUCCESS,
		payload: responseData,
		isFetching: false
	}
}

/**
 * error response after user step 2 form submit
 *
 * @return Object
 */
export function errorSignUp(message) {
	return {
		type: SIGN_UP_ERROR,
		isFetching: false,
		message
	}
}

/**
 * submit user step 2 form through API request
 *
 * @return Object
 */
export function submitUserData(userInfo) {
	return dispatch => {
		/* Dispatch before sign up request */
		dispatch(reqSignUp());
		return timeout(REQ_TIMEOUT, axios.post(`${ROOT_URL}/sign-up`, userInfo)).then((response) => {
		    if(response.status === 200) {
		      /* Dispatch the success action */
		      dispatch(successSignUp(response.data));

		      return response;
		    }
		  }).catch(err => {
		    /* If there was a problem, dispatch the error condition */
		    if(err.data && (err.status >= 400 && err.status <= 600)) {
		      dispatch(errorSignUp(err.data));
		    }

		    return err;
		 });
	};
}