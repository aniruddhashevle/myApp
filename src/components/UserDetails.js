/* =============================================================================
   imports
============================================================================= */
/* npm */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/* =============================================================================
   UserDetails component
============================================================================= */
class UserDetails extends Component {

  constructor(props) {
    super(props);
    this.userData = this.props.userAllInfo;
  }

  /**
   * before component is loaded
   *
   * @return void
   */
  componentWillMount() {
    if(!this.userData || !this.userData.userName || !this.userData.age || !this.userData.dateOfBirth || !this.userData.gender) {
      browserHistory.push("/");
    }
  }

  /**
   * When a component is being removed from the DOM
   *
   * @return void
   */
  componentWillUnmount() {
    this.userData = null;
    browserHistory.push("/");
  }

  /**
   * render DOM
   *
   * @return Object
   */
  render() {
    return (
      <div className="container">
        <div className="wrapper">
          <div className="col-xs-11 col-sm-5 align-center horizontal-center">
            <h1>User:</h1>
            <ul className="user-details-list">
              <li className="user-list-item"><span className="user-fields">Username:</span> {this.userData ? this.userData.userName : null}</li>
              <li className="user-list-item"><span className="user-fields">Age:</span> {this.userData ? this.userData.age : null}</li>
              <li className="user-list-item"><span className="user-fields">Date Of Birth:</span> {this.userData ? this.userData.dateOfBirth : null}</li>
              <li className="user-list-item"><span className="user-fields">Gender:</span> {this.userData ? this.userData.gender : null}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * maps states from redux to props for this component
 *
 * @param  Object state
 * @return Object userAllInfo
 */
function mapStateToProps(state) {
	return {
		userAllInfo: state.userData.userAllInfo ? state.userData.userAllInfo : null
	}
}

export default connect(
	mapStateToProps,{
})(UserDetails);
