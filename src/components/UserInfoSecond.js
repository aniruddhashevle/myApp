/* =============================================================================
   imports
============================================================================= */
/* npm */
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { browserHistory, Link } from 'react-router';

/* actions */
import { submitUserData, userStepOneSubmit } from '../actions/index';

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
          <div className="col-xs-11 col-sm-5 align-center">
            <h1>Step 2</h1>
            {
              !this.state.isUserFirstInfoFilled ?
              <p>Please fill previous info</p>
              : null
            }
            <form onSubmit={handleSubmit(this.onDataSubmit.bind(this))}>
              <div className={`form-group ${dateOfBirth.touched && dateOfBirth.invalid ? 'has-error' : '' }`}>
                <input type="date" className="form-control" {...dateOfBirth} placeholder="Date Of Birth" />
                <div className="error-text text-help error_data">
                  {dateOfBirth.touched ? dateOfBirth.error : ''}
                </div>
              </div>
              <div className={`form-group gender-select-arrow ${gender.touched && gender.invalid ? 'has-error' : '' }`}>
                <select className="selectpicker gender-select form-control"
                  value={this.state.selectValue}
                  onChange={this.handleChange.bind(this)}
                  { ...gender } >
                  <option>Select Gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
                <div className="error-text text-help error_data">
                  {gender.touched ? gender.error : ''}
                </div>
              </div>
              <div className="form-group form-btn">
                <button className="text-uppercase btn-common btn btn-primary btn-responsive" type="submit">Submit</button>
              </div>
            </form>
            <div className="horizontal-center">
              <Link to="/" className="link-step-one">Go back to the "step 1"</Link>
            </div>
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
const validate = (values, state) => {
  const error = {};
  /* get full Date */
  const currentDate = new Date();
  const userDateOfBirth = new Date(values.dateOfBirth);
  /* get years */
  const currentDateYear = currentDate.getFullYear();
  const userDateOfBirthYear = userDateOfBirth.getFullYear();
  /* get dates */
  const currentDateOfMonth = currentDate.getDate();
  const userDateOfBirthOfMonth = userDateOfBirth.getDate();
  /* get months */
  const currentDateMonth = currentDate.getMonth();
  const userDateOfBirthMonth = userDateOfBirth.getMonth();
  /* user filled age */
  const userAge = state.userData.age;
  const yearDiff = currentDateYear - userDateOfBirthYear;

  /* Date Of Birth validation with respect to age */
  if(!values.dateOfBirth) {
    error.dateOfBirth = 'Date Of Birth is required';
  } else if(currentDate < userDateOfBirth) {
    error.dateOfBirth = 'Invalid Date Of Birth';
  } else if(yearDiff !== userAge) {
    error.dateOfBirth = 'Does not match the Year with your Age';
  } else if(currentDateMonth < userDateOfBirthMonth) {
    error.dateOfBirth = 'Does not match the Month with your Age';
  } else if(currentDateOfMonth < userDateOfBirthOfMonth) {
    error.dateOfBirth = 'Does not match the Date with your Age';
  }

  /* Gender validation */
  if(!values.gender || values.gender === 'Select Gender') {
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