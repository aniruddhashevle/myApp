/* =============================================================================
   imports
============================================================================= */
/* npm */
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';

/* actions */
import { userStepOneSubmit } from '../actions/index';

/* =============================================================================
   UserInfoFirst component
============================================================================= */
class UserInfoFirst extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.fields.userName.initialValue ? props.fields.userName.initialValue : '',
      age: props.fields.age.initialValue ? props.fields.age.initialValue : '',
    }
  }

  /**
   * form submit after the successful validation
   *
   * @param  Object formData
   * @return void
   */
  onSubmit(formData) {
    this.props.userStepOneSubmit(formData);
    browserHistory.push("/sign-up");
  }

  /**
   * set the states on input change
   *
   * @param  Object event
   * @return void
   */
  onInputChange(e) {
    const fieldName = e.target.name;
    const value = e.target.value;

    if(fieldName === 'userName') {
      /* userName input change */
      this.setState({ username: value });
    } else {
      /* age input change */
      this.setState({ age: value });
    }
  }

  /**
   * render DOM
   *
   * @return Object
   */
  render() {

    /* get redux form props */
    const {
      'fields': {
        userName,
        age
      },
      handleSubmit,
    } = this.props;

    return (
      <div className="container">
        <div className="wrapper">
          <div className="col-xs-11 col-sm-5 align-center">
            <h1>Step 1</h1>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div className={`form-group ${userName.touched && userName.invalid ? 'has-error' : '' }`}>
                <input type="text" className="form-control" placeholder="Username" {...userName} value={this.state.username} onChange={this.onInputChange.bind(this)}/>
                <div className="error-text text-help error_data">
                  {userName.touched ? userName.error : ''}
                </div>
              </div>
              <div className={`form-group ${age.touched && age.invalid ? 'has-error' : '' }`}>
                <input type="number" className="form-control" placeholder="Age" {...age} value={this.state.age} onChange={this.onInputChange.bind(this)}/>
                <div className="error-text text-help error_data">
                  {age.touched ? age.error : ''}
                </div>
              </div>
              <div className="form-group form-btn">
                <button className="text-uppercase btn-common btn btn-primary btn-responsive" type="submit">Next</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * validate form
 *
 * @param  Object values
 * @return Object error
 */
const validate = (values) => {
  const error = {};

  /* Username validation */
	if (!values.userName) {
    error.userName = 'Username is required';
  }

  /* Age validation */
  if (!values.age) {
    error.age = 'Age is required';
  } else if ((values.age && isNaN(Number(values.age)))) {
    error.age = 'Age must be a number';
  } else if (Number(values.age) < 0 || Number(values.age) > 150) {
    error.age = 'Please enter a valid Age value';
  }

  return error;
}

/**
 * maps states from redux to props for this component
 *
 * @param  Object state 
 * @return Object initialValues
 */
function mapStateToProps(state) {
  return {
    'initialValues' : state.userData ? state.userData.userInfo : null,
  }
}

export default reduxForm({
  'form': 'UserInfoFirst',
  'fields': [ 'userName', 'age' ],
  validate
}, mapStateToProps, {
  userStepOneSubmit,
})(UserInfoFirst);
