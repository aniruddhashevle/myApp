/* =============================================================================
   imports
============================================================================= */
/* npm */
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { browserHistory, Link } from 'react-router';

/* actions */
import { submitUserData, userStepOneSubmit } from '../actions/index';

/* styles */
import '../style/app.scss';

/* =============================================================================
   UserInfoSecond component
============================================================================= */
class UserInfoSecond extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      selectValue: 'Select Gender',
      isUserFirstInfoFilled: true
    }
    this.userFirstInfo = this.props.userData;
  }

  /**
   * before component is loaded
   *
   * @return void
   */
  componentWillMount() {
    /* if user step 1 form is not submited redirect to user step 1 */
    if(!this.userFirstInfo.userNameme && !this.userFirstInfo.age) {
      browserHistory.push("/");
    }
  }

  /**
   * form submit after the successful validation
   *
   * @param  Object props
   * @return void
   */
  onDataSubmit(props) {

    /* if user step 1 form is not submited set state to show error msg */
    if(!this.userFirstInfo.userNameme && !this.userFirstInfo.age) {
      this.setState({
        isUserFirstInfoFilled: false
      });
      return false;
    }

    const data = {
      ...this.userFirstInfo,
      ...props,
    }

    /* call action to submit user data */
    this.props.submitUserData(data).then(resp => {
      const formData = {
        userName: null,
        age: null
      }

      /* set an empty data for the User Step 1 form in the reducer */
      this.props.userStepOneSubmit(formData);

      if(resp.status === 200) {
        browserHistory.push("/user-details");
      }
    });
  }

  /**
   * sets selected gender
   *
   * @param  Object event
   * @return void
   */
  handleChange(e) {
    this.setState({
      selectValue: e.target.value
    });
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
        dateOfBirth,
        gender
      },
      handleSubmit,
    } = this.props;

    return (
      <div className="container">
        <div className="wrapper">
          <h1>Step 2</h1>
          {
            !this.state.isUserFirstInfoFilled ?
            <p>Please fill previous info</p>
            : null
          }
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

/**
 * validate form
 *
 * @param  Object values
 * @return Object error
 */
const validate = values => {
  const error = {};

  /* Date Of Birth validation */
  if (!values.dateOfBirth) {
    error.dateOfBirth = 'Date Of Birth is required';
  } else if (new Date(values.dateOfBirth) > new Date()) {
    error.dateOfBirth = 'Invalid Date Of Birth';
  }

  /* Gender validation */
  if (!values.gender || values.gender === 'Select Gender') {
    error.gender = 'Gender is required';
  }

  return error;
}

/**
 * maps states from redux to props for this component
 *
 * @param  Object state
 * @return Object userData, Object userAllInfo
 */
function mapStateToProps(state) {
  return {
    userData: state.userData.userInfo,
    userAllInfo: state.userData.userAllInfo
  }
}

export default reduxForm({
  'form': 'UserInfoSecond',
  'fields': [ 'dateOfBirth', 'gender' ],
  validate
}, mapStateToProps, {
  submitUserData,
  userStepOneSubmit
})(UserInfoSecond);