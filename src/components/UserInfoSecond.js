import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { browserHistory, Link } from 'react-router';

import { submitUserData, userStepOneSubmit } from '../actions/index';

import '../style/app.scss';

class UserInfoSecond extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      selectValue: 'Select Gender'
    }
  }

  onDataSubmit(props) {
    const data = {
      ...this.props.userData,
      ...props,
    }
    this.props.submitUserData(data);
    const formData = {
      userName: null,
      age: null
    }

    this.props.userStepOneSubmit(formData).then(resp => {
      console.log('resp in', resp);
      if(resp.status === 200) {
        browserHistory.push("/user-details");
      }
    });
  }

  /* gives selected gender */
  handleChange(e) {
    this.setState({
      selectValue: e.target.value
    });
  }


  render() {

    /* get redux form props */
    const {
      'fields': {
        dateOfBirth,
        gender
      },
      handleSubmit,
    } = this.props;

    return (
      <div className="container">
        <div className="wrapper">
          <h1>Step 2</h1>
          <form onSubmit={handleSubmit(this.onDataSubmit.bind(this))}>
            <div className={`form-group ${dateOfBirth.touched && dateOfBirth.invalid ? 'has-error' : '' }`}>
              <input type="date" className="form-control" placeholder="user name" {...dateOfBirth}/>
              <div className="error-text text-help error_data">
                {dateOfBirth.touched ? dateOfBirth.error : ''}
              </div>
            </div>
            <div className={`form-group ${gender.touched && gender.invalid ? 'has-error' : '' }`}>
              <select className="profile-select"
                value={this.state.selectValue}
                onChange={this.handleChange.bind(this)} { ...gender } >
                <option>Select Gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
              <div className="error-text text-help error_data">
                {gender.touched ? gender.error : ''}
              </div>
            </div>
            <div className="form-group">
              <button className="text-uppercase btn btn-block btn-responsive" type="submit">Submit</button>
            </div>
          </form>
          <div>
            <Link to="/">Go back to step 1</Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state',state);
  return {
    userData: state.userData.userInfo,
    userAllInfo: state.userData.userAllInfo
  }
}

const validate = values => {
  const error = {}

  if (!values.dateOfBirth) {
    error.dateOfBirth = 'Required'
  } else if (new Date(values.dateOfBirth) > new Date()) {
    error.dateOfBirth = 'Invalid date of birth'
  }

  if (!values.gender || values.gender === 'Select Gender') {
    error.gender = 'Required'
  }

  return error
}

export default reduxForm({
  'form': 'UserInfoSecond',
  'fields': [ 'dateOfBirth', 'gender' ],
  validate
}, mapStateToProps, {
  submitUserData,
  userStepOneSubmit
})(UserInfoSecond);