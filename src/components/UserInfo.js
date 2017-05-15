import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';

//actions
import { userStepOneSubmit } from '../actions/index'

import '../style/app.scss';

class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.fields.userName.initialValue ? props.fields.userName.initialValue : '',
      age: props.fields.age.initialValue ? props.fields.age.initialValue : '',
    }
  }

  onSubmit(formData) {
    this.props.userStepOneSubmit(formData);
    browserHistory.push("/personal");
  }

  onInputChange(e) {
    const fieldName = e.target.name;
    const value = e.target.value;
    if(fieldName === 'userName') {
      this.setState({ username: value });
    } else {
      this.setState({ age: value });
    }
  }

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
          <h1>Step 1</h1>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className={`form-group ${userName.touched && userName.invalid ? 'has-error' : '' }`}>
              <input type="text" className="form-control" placeholder="user name" {...userName} value={this.state.username} onChange={this.onInputChange.bind(this)}/>
              <div className="error-text text-help error_data">
                {userName.touched ? userName.error : ''}
              </div>
            </div>
            <div className={`form-group ${age.touched && age.invalid ? 'has-error' : '' }`}>
              <input type="number" className="form-control" placeholder="age" {...age} value={this.state.age} onChange={this.onInputChange.bind(this)}/>
              <div className="error-text text-help error_data">
                {age.touched ? age.error : ''}
              </div>
            </div>
            <div className="form-group">
              <button className="text-uppercase btn btn-block btn-responsive" type="submit">Next</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

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
    error.age = 'Sorry, invalid Age value';
  }

  return error;
}

function mapStateToProps(state, ownProps) {
  return {
    'initialValues' : state.userData ? state.userData.userInfo : null,
  }
}

export default reduxForm({
  'form': 'UserInfo',
  'fields': [ 'userName', 'age' ],
  validate
}, mapStateToProps, {
  userStepOneSubmit,
})(UserInfo);
